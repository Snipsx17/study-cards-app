import { UserSchema } from "@/domain/schemas/user.schema";
import { CreateRequestValidator } from "@/presentation/middlewares/request-validator.middleware";
import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { UserDatasourceImpl } from "@/infrastructure/datasources/aws-user.datasource.impl";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";

export class authRouter {
  private router = Router();

  public get routes(): Router {
    const requestValidator = new CreateRequestValidator();
    const userRepository = new UserRepositoryImpl(new UserDatasourceImpl());
    const authController = new AuthController(userRepository);

    this.router.post(
      "/user-register",
      requestValidator.validate(UserSchema),
      authController.registerUser,
    );

    return this.router;
  }
}
