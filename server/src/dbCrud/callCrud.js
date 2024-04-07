import { CALL_KIND, ENTRY_TYPE } from "../enum/constants";
import { dbClient } from "../helpers/dynamoDbClient";

const TableName = process.env.DYNAMODB_TABLE;

export const callEntry = async (params) => {
  const {
    caller,
    callId,
    chatId,
    callerDetails,
    receiverDetails,
    callType,
    kind,
  } = params;
  const TableParam = {
    TableName,
    Item: {
      pk: `CLLUSR#${caller}`,
      sk: `CLL#${callId}`,
      id: callId,
      sk1: Date.now().toString(),
      sk2: CALL_KIND.INITIATE,
      gsi1Pk: `CHT#${chatId}`,
      gsi1Sk: Date.now().toString(), //updatedAt
      type: ENTRY_TYPE.CALL_ENTRY,
      chatId,
      sender: callerDetails,
      receiver: receiverDetails,
      kind,
      callType,
      status: CALL_KIND.INITIATE,
      participants: [callerDetails, receiverDetails],
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    },
  };
  try {
    await dbClient.putItem(TableParam);
    return { ...TableParam.Item };
  } catch (error) {
    console.log("error in chatEntry %j >>", error);
  }
};

export const getChatHistory = async (chatId) => {
  const TableParam = {
    TableName,
    IndexName: "LSI1",
    KeyConditionExpression: "pk = :pkey",
    ExpressionAttributeValues: {
      ":pkey": `CHT#${chatId}`,
    },
  };
  try {
    const data = await dbClient.query(TableParam);
    return data.Items;
  } catch (error) {
    console.log("error in listing all users >> %j", error);
  }
};
