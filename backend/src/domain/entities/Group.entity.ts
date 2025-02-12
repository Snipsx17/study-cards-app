interface IGroupEntity {
  id?: number;
  name: string;
  ownerId: number;
}

export class GroupEntity {
  public id?: number;
  public name: string;
  public ownerId: number;
  constructor(group: IGroupEntity) {
    this.id = group.id || 0;
    this.name = group.name;
    this.ownerId = group.ownerId;
  }
}
