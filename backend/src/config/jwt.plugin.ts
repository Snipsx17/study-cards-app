import { config } from "dotenv";
config();
import jwt, { JwtPayload } from "jsonwebtoken";
import { envs } from "./envs.plugin";

export class tokenJwt {
  static createToken = (data: any): string => {
    const jwtSecret = envs.JWT_TOKEN_SECRET || "secret";
    const tokenExpiration = envs.JWT_TOKEN_EXPIRATION || "1m";
    const token = jwt.sign(
      {
        data,
      },
      jwtSecret,
      { expiresIn: tokenExpiration } as jwt.SignOptions,
    );
    return token;
  };

  static validateToken = (token: string) => {
    const secret = envs.JWT_TOKEN_SECRET || "secret";
    try {
      const { data } = jwt.verify(token, secret) as JwtPayload;

      return data;
    } catch (error) {
      throw new Error("Invalid Token");
    }
  };

  static createRefreshToken = (data: any): string => {
    const refreshTokenSecret = envs.JWT_REFRESH_TOKEN_SECRET;
    const tokenExpiration = envs.JWT_REFRESH_TOKEN_EXPIRATION || "15d";
    const token = jwt.sign(
      {
        data,
      },
      refreshTokenSecret,
      { expiresIn: tokenExpiration } as jwt.SignOptions,
    );
    return token;
  };

  static validateRefreshToken = (token: string) => {
    const secret = envs.JWT_REFRESH_TOKEN_SECRET || "secret";
    try {
      const { data } = jwt.verify(token, secret) as JwtPayload;

      return data;
    } catch (error) {
      return null;
    }
  };
}
