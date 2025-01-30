import bcrypt from "bcrypt";
import { envs } from "./envs.plugin";

export class Password {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, envs.SALT_ROUND || 10);
  }

  static async validate(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
