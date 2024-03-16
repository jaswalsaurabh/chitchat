import { dbClient } from "../helpers/dynamoDbClient";

const TableName = process.env.DYNAMODB_TABLE;

export const getChatHistory = async (chatId) => {
  const TableParam = {
    TableName,
    IndexName: "LSI1",
    KeyConditionExpression: "pk = :pkey",
    ExpressionAttributeValues: {
      ":pkey": `CHT#${chatId}`,
    },
    Limit: 30,
  };
  try {
    const data = await dbClient.query(TableParam);
    return data.Items;
  } catch (error) {
    console.log("error in listing all users >> %j", error);
  }
};

export const getAllChats = async (userId) => {
    const TableParam = {
      TableName,
      IndexName: "LSI1",
      KeyConditionExpression: "pk = :pkey",
      ExpressionAttributeValues: {
        ":pkey": `USR#${userId}`,
      },
      Limit: 30,
    };
    try {
      const data = await dbClient.query(TableParam);
      return data.Items;
    } catch (error) {
      console.log("error in listing all users >> %j", error);
    }
  };
