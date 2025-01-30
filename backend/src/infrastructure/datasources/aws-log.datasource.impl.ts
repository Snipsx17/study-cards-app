import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { LogDatasource } from "../../domain/datasource/Log.datasource";
import { LogEntity, LogLevel, logType } from "../../domain/entities/Log.entity";
import { logDB } from "../services/aws.service";
import { v4 } from "uuid";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDB = DynamoDBDocumentClient.from(logDB);

export class AwsLogDatasource implements LogDatasource {
  private tableName = "study-cards-app";

  async saveLog(log: LogEntity): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        LogID: v4(),
        created: log.created,
        data: {
          level: log.level,
          type: log.type,
          message: log.message,
        },
      },
    };

    try {
      await dynamoDB.send(new PutCommand(params));
    } catch (err) {
      console.error(`Error saving log:, ${err}`);
    }
  }

  async getLogByLevel(level: LogLevel): Promise<LogEntity[] | undefined> {
    const params = {
      TableName: this.tableName,
      FilterExpression: "#data.#level = :level",
      ExpressionAttributeNames: {
        "#data": "data",
        "#level": "level",
      },
      ExpressionAttributeValues: {
        ":level": level,
      },
    };

    try {
      const logsData = await dynamoDB.send(new ScanCommand(params));
      if (!logsData.Items) {
        return [];
      }
      const logs = logsData.Items.map((item) =>
        LogEntity.parseFromJson(item.data),
      );
      return logs;
    } catch (error) {
      console.error("Error getting logs:", error);
    }
  }
  async getLogByType(type: logType): Promise<LogEntity[] | undefined> {
    const params = {
      TableName: this.tableName,
      FilterExpression: "#data.#type = :type",
      ExpressionAttributeNames: {
        "#data": "data",
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":type": type,
      },
    };

    try {
      const logsData = await dynamoDB.send(new ScanCommand(params));
      if (!logsData.Items) {
        return [];
      }
      const logs = logsData.Items.map((item) =>
        LogEntity.parseFromJson(item.data),
      );
      return logs;
    } catch (error) {
      console.error("Error getting logs:", error);
    }
  }
}
