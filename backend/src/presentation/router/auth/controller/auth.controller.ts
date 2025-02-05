import { Password } from "@/config/bcrypt.plugin";
import { envs } from "@/config/envs.plugin";
import { tokenJwt } from "@/config/jwt.plugin";
import { LogEntity, LogLevel, logType } from "@/domain/entities/Log.entity";
import { UserEntity } from "@/domain/entities/User.entity";
import { LogRepository } from "@/domain/repositories/Log.repository";
import { UserRepository } from "@/domain/repositories/User.repository";
import { RequestWithUserData } from "@/presentation/middlewares/request-validator.middleware";
import { NextFunction, Response } from "express";

export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logRepository?: LogRepository,
  ) {
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async registerUser(
    req: RequestWithUserData,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { userData } = req;
    const { name, email, username, password } = userData!;
    const passwordHashed = await Password.hash(password!);

    const user = new UserEntity({
      name,
      email,
      username,
      password: passwordHashed,
    });

    // check if user is already registered
    try {
      const userExists = await this.userRepository.userExists(user);
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }
    } catch (error) {
      await this.logRepository?.saveLog(
        new LogEntity(
          logType.AUTH,
          LogLevel.LOW,
          `An error occurred while trying to register user: ${error}`,
        ),
      );
      next(error);
      return;
    }

    // create user in the database
    try {
      const userCreated = await this.userRepository.createUser(user);

      if (!userCreated) {
        res.status(500);
        throw new Error("Failed to create user");
      }

      await this.logRepository?.saveLog(
        new LogEntity(
          logType.AUTH,
          LogLevel.LOW,
          `User created successfully: ${JSON.stringify(userData)}`,
        ),
      );
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        await this.logRepository?.saveLog(
          new LogEntity(
            logType.AUTH,
            LogLevel.LOW,
            `An error occurred while trying to register user: ${error}`,
          ),
        );
        next(error);
      }
    }
  }

  async loginUser(req: RequestWithUserData, res: Response, next: NextFunction) {
    const { userData } = req;
    const { username, password } = userData!;

    try {
      const user = await this.userRepository.getUserByUsername(username);
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      const passwordMatch = await Password.validate(password!, user.password);
      if (!passwordMatch) {
        res.status(401);
        throw new Error("Invalid credentials");
      }

      const refreshToken = tokenJwt.createRefreshToken({
        userId: user.id,
        user: user.username,
        email: user.email,
      });

      // set cookie
      res.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), //15d
        httpOnly: true,
        secure: envs.ENVIRONMENT === "production",
      });

      res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
      await this.logRepository?.saveLog(
        new LogEntity(logType.AUTH, LogLevel.HIGH, `Fail login: ${error}`),
      );
      next(error);
    }
  }
}
