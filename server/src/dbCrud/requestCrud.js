import { ENTRY_TYPE, REQUEST_STATUS } from "../enum/constants";
import { dbClient } from "../helpers/dynamoDbClient";
const TableName = process.env.DYNAMODB_TABLE;

export const requestEntry = async (receiver, sender, id) => {
  const TableParam = {
    TableName,
    Item: {
      pk: `RUSR#${receiver.userId}`,
      sk: `RQST#${id}`,
      sk1: Date.now().toString(), //updatedAt
      gsi1Pk: `RUSR#${sender.userId}`,
      gsi1Sk: Date.now().toString(), //updatedAt
      type: ENTRY_TYPE.REQUEST_ENTRY,
      sender,
      id,
      status: REQUEST_STATUS.SENT,
      receiver,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
  };
  try {
    await dbClient.putItem(TableParam);
    return { ...TableParam.Item };
  } catch (error) {
    console.log("error in requestEntry %j >>", error);
  }
};

export const getAllRequests = async (userId) => {
  const TableParam = {
    TableName,
    IndexName: "LSI1",
    KeyConditionExpression: "pk = :pkey",
    ExpressionAttributeValues: {
      ":pkey": `RUSR#${userId}`,
    },
    Limit: 30,
  };
  try {
    const data = await dbClient.query(TableParam);
    return data.Items;
  } catch (error) {
    console.log("error in fetch requests crud >> %j", error);
  }
};
