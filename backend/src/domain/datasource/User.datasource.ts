import { UserEntity } from "../entities/User.entity";

export abstract class UserDatasource {
  abstract getUserById(id: number): Promise<UserEntity | undefined>;
  abstract getUserByUsername(username: string): Promise<UserEntity | undefined>;
  abstract createUser(user: UserEntity): Promise<UserEntity | undefined>;
  abstract updateUser(user: UserEntity): Promise<UserEntity | undefined>;
  abstract deleteUser(id: number): Promise<boolean>;
}
