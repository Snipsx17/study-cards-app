import { LogEntity, LogLevel, logType } from "@/domain/entities/Log.entity";
import { UserSchema } from "@/domain/schemas/user.schema";
import { AwsLogDatasource } from "@/infrastructure/datasources/aws-log.datasource.impl";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository.impl";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export interface RequestWithUserData extends Request {
  userData?: z.infer<typeof UserSchema>;
}

const errorLog = new LogRepositoryImpl(new AwsLogDatasource());

export class CreateRequestValidator {
  validate(schema: ZodSchema<any>) {
    return (
      req: RequestWithUserData,
      res: Response,
      next: NextFunction,
    ): void => {
      try {
        const userData = schema.safeParse(req.body);

        if (userData.error) {
          const e = userData.error.errors.map(
            (err) => `${err.path} ${err.message}`,
          );
          throw new Error(String(e));
        }

        req.userData = req.body;
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
}
