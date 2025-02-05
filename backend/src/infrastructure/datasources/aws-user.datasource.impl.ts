import { UserDatasource } from "@/domain/datasource/User.datasource";
import { UserEntity } from "@/domain/entities/User.entity";
import { prisma } from "../../data/postgres";
import { envs } from "@/config/envs.plugin";

export class UserDatasourceImpl extends UserDatasource {
  async userExists(user: UserEntity): Promise<boolean | undefined> {
    try {
      const userExists = await prisma.user.findFirst({
        where: {
          OR: [{ username: user.username }, { email: user.email }],
        },
      });

      if (!userExists) {
        return false;
      }

      return !!userExists;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  getUserById(id: number): Promise<UserEntity | undefined> {
    throw new Error("Method not implemented.");
  }

  async getUserByUsername(username: string): Promise<UserEntity | undefined> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      if (!user) {
        return undefined;
      }

      return new UserEntity(new UserEntity(user));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  async createUser(user: UserEntity): Promise<UserEntity | undefined> {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: user.password,
          avatar_url: user.avatarUrl || envs.DEFAULT_AVATAR_IMG,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  updateUser(user: UserEntity): Promise<UserEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
