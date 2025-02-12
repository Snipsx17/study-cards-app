import { tokenJwt } from "@/config/jwt.plugin";
import { GroupEntity } from "@/domain/entities/Group.entity";
import { GroupRepository } from "@/domain/repositories/Group.repository";
import { LogRepository } from "@/domain/repositories/Log.repository";
import { NextFunction, Request, Response } from "express";

export class GroupController {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly logRepository?: LogRepository,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const { groupName } = req.body; // received from middleware

      if (!token) {
        res.status(401);
        throw new Error("Not token provided");
      }

      const tokenIsValid = tokenJwt.validateToken(token);
      if (!tokenIsValid) {
        res.status(401);
        throw new Error("Invalid token");
      }
      const { userId } = tokenIsValid;

      const newGroup = await this.groupRepository.create(
        new GroupEntity({
          name: groupName,
          ownerId: userId,
        }),
      );

      res.status(201).json(newGroup);
    } catch (error) {
      next(error);
    }
  }
}
