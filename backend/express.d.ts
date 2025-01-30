declare namespace Express {
  export interface Request {
    userData?: z.infer<typeof UserSchema>;
  }
}
