import { UserDatasource } from "@/domain/datasource/User.datasource";
import { UserEntity } from "@/domain/entities/User.entity";
import { UserRepository } from "@/domain/repositories/User.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  async userExists(user: UserEntity): Promise<boolean | undefined> {
    return await this.userDatasource.userExists(user);
  }

  async getUserById(id: number): Promise<UserEntity | undefined> {
    return await this.userDatasource.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userDatasource.getUserByEmail(email);
  }

  async createUser(user: UserEntity): Promise<UserEntity | undefined> {
    return await this.userDatasource.createUser(user);
  }

  async updateUser(user: UserEntity): Promise<UserEntity | undefined> {
    return await this.userDatasource.updateUser(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userDatasource.deleteUser(id);
  }
}
