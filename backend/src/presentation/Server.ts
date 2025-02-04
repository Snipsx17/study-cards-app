import express, {
  ErrorRequestHandler,
  json,
  NextFunction,
  Router,
  urlencoded,
} from "express";
import cors from "cors";
import { morganLogger } from "../config/morgan.plugin";

export class Server {
  private app = express();

  constructor(
    private readonly port: number,
    private readonly router: Router,
    private readonly publicFolder = "public",
    private readonly errorHandler: ErrorRequestHandler,
    private logger?: any,
  ) {}

  start() {
    //middleware
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(morganLogger("dev"));
    this.app.use(
      cors({
        origin: "*",
      }),
    );

    //public folder
    this.app.use(express.static(this.publicFolder));

    //routes
    this.app.use(this.router);

    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      const error = new Error("not found!");
      next(error);
    });

    //error handlers
    this.app.use(this.errorHandler);

    //start server
    this.app.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`);
    });
  }
}
