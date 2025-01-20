require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

export const logDB = new DynamoDBClient();
