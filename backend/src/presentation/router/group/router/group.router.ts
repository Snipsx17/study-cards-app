import { GroupSchema } from "@/domain/schemas";
import { GroupDatasourceImpl } from "@/infrastructure/datasources/aws-group.datasource.impl";
import { GroupRepositoryImpl } from "@/infrastructure/repositories/group.repository.impl";
import { CreateRequestValidator } from "@/presentation/middlewares/request-validator.middleware";
import { Router } from "express";
import { GroupController } from "../controller/group.controller";

export class GroupRouter {
  private router = Router();

  public get routes(): Router {
    const requestValidator = new CreateRequestValidator();

    const groupRepository = new GroupRepositoryImpl(new GroupDatasourceImpl());
    const groupController = new GroupController(groupRepository);

    this.router.post(
      "/new",
      requestValidator.validate(GroupSchema),
      groupController.create,
    );
    return this.router;
  }
}
