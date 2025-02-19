import { GroupDatasource } from "@/domain/datasource/Group.datasource";
import { GroupEntity } from "@/domain/entities/Group.entity";
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
  async getAll(userID: number): Promise<GroupEntity[] | undefined> {
    try {
      const groups = await prisma.group.findMany({
        where: {
          ownerId: userID,
        },
      });

      return groups;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  async getById(id: number): Promise<GroupEntity | undefined> {
    try {
      const group = await prisma.group.findFirst({
        where: {
          id: id,
        },
      });

      if (!group) throw new Error("Group not found");

      return new GroupEntity({
        id: group?.id,
        name: group?.name!,
        ownerId: group?.ownerId!,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  update(group: GroupEntity): Promise<GroupEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<boolean> {
    try {
      const groupDeleted = await prisma.group.delete({
        where: {
          id: id,
        },
      });
      return !!groupDeleted;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      return false;
    }
  }
}
