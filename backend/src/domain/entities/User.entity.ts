import { envs } from "@/config/envs.plugin";

interface IUserEntity {
  id?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
}

export class UserEntity {
  public id?: number;
  public name: string;
  public email: string;
  public username: string;
  public password: string;
  public avatarUrl? = envs.DEFAULT_AVATAR_IMG;

  constructor(user: IUserEntity) {
    this.id = user.id || 0;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.avatarUrl = user.avatarUrl;
  }
}
