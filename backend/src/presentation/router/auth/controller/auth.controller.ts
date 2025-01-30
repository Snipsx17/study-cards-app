import { Password } from "@/config/bcrypt.plugin";
import { UserEntity } from "@/domain/entities/User.entity";
import { UserRepository } from "@/domain/repositories/User.repository";
import { RequestWithUserData } from "@/presentation/middlewares/request-validator.middleware";
import { NextFunction, Response } from "express";

export class AuthController {
  // !! create todo repository
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logRepository?: any,
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
        res.status(400);
        throw new Error("User already exists");
      }

      const userCreated = await this.userRepository.createUser(user);

      if (!userCreated) {
        res.status(500);
        throw new Error("Failed to create user");
      }

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
}
