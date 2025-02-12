import { GroupDatasource } from "@/domain/datasource/Group.datasource";
import { GroupEntity } from "@/domain/entities/Group.entity";
import { UserEntity } from "@/domain/entities/User.entity";
import { prisma } from "../../data/postgres";

export class GroupDatasourceImpl implements GroupDatasource {
  async create(group: GroupEntity): Promise<GroupEntity | undefined> {
    try {
      const newGroup = await prisma.group.create({
        data: {
          name: group.name,
          ownerId: group.ownerId,
        },
      });

      return newGroup;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  getAll(user: UserEntity): Promise<GroupEntity[] | undefined> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<GroupEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  update(group: GroupEntity): Promise<GroupEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
