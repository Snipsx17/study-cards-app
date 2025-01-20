export enum logType {
  ERROR = "ERROR",
  AUTH = "AUTH",
  ACCESS = "ACCESS",
}

export enum LogLevel {
  LOW = "LOW",
  HIGH = "HIGH",
}

export class LogEntity {
  constructor(
    public type: logType,
    public level: LogLevel,
    public message: string,
    public created: string = new Date().toLocaleDateString(),
  ) {}

  static parseFromJson(json: any): LogEntity {
    return new LogEntity(json.type, json.level, json.message, json.created);
  }
}
