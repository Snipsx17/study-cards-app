import { tokenJwt } from "@/config/jwt.plugin";
import { LogEntity, LogLevel, logType } from "@/domain/entities/Log.entity";
import { AwsLogDatasource } from "@/infrastructure/datasources/aws-log.datasource.impl";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository.impl";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const errorLog = new LogRepositoryImpl(new AwsLogDatasource());

export class CreateRequestValidator {
  validate(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const data = schema.safeParse(req.body);

        if (data.error) {
          const e = data.error.errors.map(
            (err) => `${err.path} ${err.message}`,
          );
          throw new Error(String(e));
        }

        next();
      } catch (error) {
        if (error instanceof Error) {
          errorLog.saveLog(
            new LogEntity(
              logType.AUTH,
              LogLevel.LOW,
              `User data not valid: ${JSON.stringify(error)}`,
            ),
          );

          next(error);
        }
      }
    };
  }

  validateRefreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      res.status(401);
      throw new Error("Not refresh token provided");
    }

    try {
      const tokenData = tokenJwt.validateRefreshToken(refreshToken);
      res.locals.userData = tokenData;
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }

  validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      if (!token) {
        res.status(401);
        throw new Error("Not token provided");
      }

      const tokenIsValid = tokenJwt.validateToken(token);
      if (!tokenIsValid) {
        res.status(401);
        throw new Error("Invalid token");
      }

      res.locals.userData = tokenIsValid;
      next();
    } catch (error) {
      res.status(401);
      if (error instanceof Error) {
        next(error);
      }
    }
  }
}
