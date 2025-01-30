export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public username: string,
    public password: string,
    public avatarUrl?: string,
  ) {}
}
