import { UserSchema } from "@/domain/schemas/user.schema";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export interface RequestWithUserData extends Request {
  userData?: z.infer<typeof UserSchema>;
}

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
          const e = userData.error.errors.map((err) => err.message);
          throw new Error(String(e));
        }

        req.userData = req.body;
        next();
      } catch (error) {
        if (error instanceof Error) next(error);
      }
    };
  }
}
