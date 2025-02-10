import { config } from "dotenv";
config();
import jwt, { JwtPayload } from "jsonwebtoken";
import { envs } from "./envs.plugin";

export class tokenJwt {
  //   createToken = ({ data, exp }: TokenParams): string => {
  //     const jwtSecret = process.env.JWT_TOKEN_SECRET || "secret";
  //     const token = jwt.sign(
  //       {
  //         data,
  //       },
  //       jwtSecret,
  //       { expiresIn: exp },
  //     );
  //     return token;
  //   };

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

  static validateToken = (token: string) => {
    const secret = envs.JWT_REFRESH_TOKEN_SECRET || "secret";
    try {
      const { data } = jwt.verify(token, secret) as JwtPayload;

      return data;
    } catch (error) {
      throw new Error("Invalid Token");
    }
  };

  validateRefreshToken = (token: string) => {
    const secret = process.env.REFRESH_JWT_TOKEN_SECRET || "secret";
    try {
      const { user, iat, exp } = jwt.verify(token, secret) as JwtPayload;

      const userData = {
        user,
        iat,
        exp,
      };

      return userData;
    } catch (error) {
      return null;
    }
  };
}
