import { GroupEntity } from "../entities/Group.entity";
import { UserEntity } from "../entities/User.entity";

export abstract class GroupRepository {
  abstract create(group: GroupEntity): Promise<GroupEntity | undefined>;
  abstract getAll(userID: number): Promise<GroupEntity[] | undefined>;
  abstract getById(id: number): Promise<GroupEntity | undefined>;
  abstract update(group: GroupEntity): Promise<GroupEntity | undefined>;
  abstract delete(id: number): Promise<boolean>;
}
