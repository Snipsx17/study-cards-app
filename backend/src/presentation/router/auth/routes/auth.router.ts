import { LoginUserSchema, UserSchema } from "@/domain/schemas/user.schema";
import { CreateRequestValidator } from "@/presentation/middlewares/request-validator.middleware";
import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { UserDatasourceImpl } from "@/infrastructure/datasources/aws-user.datasource.impl";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";
import { AwsLogDatasource } from "@/infrastructure/datasources/aws-log.datasource.impl";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository.impl";

export class authRouter {
  private router = Router();

  public get routes(): Router {
    const requestValidator = new CreateRequestValidator();

    const userRepository = new UserRepositoryImpl(new UserDatasourceImpl());
    const logRepository = new LogRepositoryImpl(new AwsLogDatasource());
    const authController = new AuthController(userRepository, logRepository);

    this.router.post(
      "/user-register",
      requestValidator.validate(UserSchema),
      authController.registerUser,
    );

    this.router.post(
      "/login",
      requestValidator.validate(LoginUserSchema),
      authController.loginUser,
    );

    this.router.get("/logout", authController.logoutUser);

    return this.router;
  }
}
