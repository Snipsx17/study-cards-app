import { LogEntity, LogLevel, logType } from "../../domain/entities/Log.entity";
import { LogRepository } from "../../domain/repositories/Log.repository";
import { AwsLogDatasource } from "../datasources/aws-log.datasource";

export class LogRepositoryImplementation implements LogRepository {
  constructor(private readonly logDataSource: AwsLogDatasource) {}
  async getLogByLevel(level: LogLevel): Promise<LogEntity[] | undefined> {
    return await this.logDataSource.getLogByLevel(level);
  }
  async getLogByType(type: logType): Promise<LogEntity[] | undefined> {
    return await this.logDataSource.getLogByType(type);
  }
  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }
}
