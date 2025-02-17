import { tokenJwt } from "@/config/jwt.plugin";
import { GroupEntity } from "@/domain/entities/Group.entity";
import { UserEntity } from "@/domain/entities/User.entity";
import { GroupRepository } from "@/domain/repositories/Group.repository";
import { LogRepository } from "@/domain/repositories/Log.repository";
import { NextFunction, Request, Response } from "express";

export class GroupController {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly logRepository?: LogRepository,
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { groupName } = req.body;
      const { userId } = res.locals.userData; // received from middleware

      const newGroup = await this.groupRepository.create(
        new GroupEntity({
          name: groupName,
          ownerId: userId,
        }),
      );

      const allGroups = await this.groupRepository.getAll(userId);

      res.status(201).json(allGroups);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = res.locals.userData;

      const groups = await this.groupRepository.getAll(userId);

      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }
}
