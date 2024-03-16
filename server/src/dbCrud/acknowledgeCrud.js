import { dbClient } from "../helpers/dynamoDbClient";
const TableName = process.env.DYNAMODB_TABLE;

export const updateMessageStatus = async (chatId, messageId, msgStatus) => {
  const TableParam = {
    TableName,
    Key: { pk: `CHT#${chatId}`, sk: `MSG#${messageId}` },
    UpdateExpression:
      "set #updatedAt = :updatedAt, #sk2 = :sk2, msgStatus = :msgStatus",
    ExpressionAttributeNames: {
      "#sk2": "sk2",
      "#updatedAt": "updatedAt",
      "#msgStatus": "msgStatus",
    },
    ExpressionAttributeValues: {
      ":sk2": msgStatus,
      ":msgStatus": msgStatus,
      ":updatedAt": Date.now().toString(),
    },
  };
  try {
    await dbClient.updateItem(TableParam);
    console.log("success in updateMessageStatus");
  } catch (error) {
    console.log("error in updateMessageStatus %j", error);
    return error;
  }
};
