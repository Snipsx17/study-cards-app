import { GroupDatasource } from "@/domain/datasource/Group.datasource";
import { GroupEntity } from "@/domain/entities/Group.entity";
import { UserEntity } from "@/domain/entities/User.entity";
import { GroupRepository } from "@/domain/repositories/Group.repository";

export class GroupRepositoryImpl implements GroupRepository {
  constructor(private readonly groupDatasource: GroupDatasource) {}

  create(group: GroupEntity): Promise<GroupEntity | undefined> {
    return this.groupDatasource.create(group);
  }
  getAll(user: UserEntity): Promise<GroupEntity[] | undefined> {
    return this.groupDatasource.getAll(user);
  }
  getById(id: number): Promise<GroupEntity | undefined> {
    return this.groupDatasource.getById(id);
  }
  update(group: GroupEntity): Promise<GroupEntity | undefined> {
    return this.groupDatasource.update(group);
  }
  delete(id: number): Promise<boolean> {
    return this.groupDatasource.delete(id);
  }
}
