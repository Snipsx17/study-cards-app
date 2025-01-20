import { LogEntity, LogLevel, logType } from "../entities/Log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogByLevel(level: LogLevel): Promise<LogEntity[] | undefined>;
  abstract getLogByType(type: logType): Promise<LogEntity[] | undefined>;
}
