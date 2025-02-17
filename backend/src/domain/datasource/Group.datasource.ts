import { GroupEntity } from "../entities/Group.entity";

export abstract class GroupDatasource {
  abstract create(group: GroupEntity): Promise<GroupEntity | undefined>;
  abstract getAll(userID: number): Promise<GroupEntity[] | undefined>;
  abstract getById(id: number): Promise<GroupEntity | undefined>;
  abstract update(group: GroupEntity): Promise<GroupEntity | undefined>;
  abstract delete(id: number): Promise<boolean>;
}
