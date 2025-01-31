import { Password } from "@/config/bcrypt.plugin";
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
  }

  async registerUser(
    req: RequestWithUserData,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { userData } = req;
    const { name, email, username, password, avatarUrl } = userData!;
    const passwordHashed = await Password.hash(password!);

    const user = new UserEntity({
      name,
      email,
      username,
      password: passwordHashed,
      avatarUrl,
    });

    try {
      const userExists = await this.userRepository.userExists(user);
      if (userExists) {
        await this.logRepository?.saveLog(
          new LogEntity(
            logType.AUTH,
            LogLevel.LOW,
            `User Registration failed, User already exists: ${JSON.stringify(
              userData,
            )}`,
          ),
        );

        res.status(400);
        throw new Error("User already exists");
      }

      const userCreated = await this.userRepository.createUser(user);

      if (!userCreated) {
        await this.logRepository?.saveLog(
          new LogEntity(
            logType.AUTH,
            LogLevel.LOW,
            `User Registration failed, due DB error: ${JSON.stringify(
              userData,
            )}`,
          ),
        );
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
        next(error);
      }
    }
  }
}
