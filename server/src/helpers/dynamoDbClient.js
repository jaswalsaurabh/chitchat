const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  BatchWriteCommand,
  BatchExecuteStatementCommand,
  BatchGetCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  apiVersion: "2012-08-10",
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const docClient = DynamoDBDocumentClient.from(client, translateConfig);

export const dbClient = {
  putItem: (params) => docClient.send(new PutCommand(params)),
  query: (params) => docClient.send(new QueryCommand(params)),
  updateItem: (params) => docClient.send(new UpdateCommand(params)),
  batchWrite: (params) => docClient.send(new BatchWriteCommand(params)),
  batchGet: (params) => docClient.send(new BatchGetCommand(params)),
  batchExecute: (params) =>
    docClient.send(new BatchExecuteStatementCommand(params)),
};
