import { ENTRY_TYPE } from "../enum/constants";
import { dbClient } from "../helpers/dynamoDbClient";
const TableName = process.env.DYNAMODB_TABLE;

export const getUserDetails = async (userId) => {
  try {
    const TableParams = {
      TableName,
      KeyConditionExpression: "pk = :pkey and sk = :userId",
      ScanIndexForward: true,
      ExpressionAttributeValues: {
        ":pkey": "USRPR#usr",
        ":userId": `USR#${userId}`,
      },
    };
    console.log("Table params for fetching user details :: %j", TableParams);
    const data = await dbClient.query(TableParams);
    console.log("data from crud user details %j", data);
    return data.Items[0];
  } catch (error) {
    console.error("error when fetching user details %j", error);
    return error;
  }
};

export const getChat = async (user1, user2) => {
  const TableParam = {
    TableName,
    KeyConditionExpression: "pk = :pkey and sk = :skey",
    ExpressionAttributeValues: {
      ":pkey": `USR#${user1}`,
      ":skey": `USR#${user2}`,
    },
  };
  try {
    const res = await dbClient.query(TableParam);
    return res.Items[0];
  } catch (error) {
    console.log("error in getting session %j", error);
  }
};

export const chatEntry = async (user1, user2, chatId, chatType) => {
  const TableParam = {
    TableName,
    Item: {
      pk: `USR#${user1.userId}`,
      sk: `USR#${user2.userId}`,
      sk1: Date.now().toString(), //updatedAt
      gsi1Pk: `CHT#${chatId}`,
      gsi1Sk: Date.now().toString(), //updatedAt
      type: ENTRY_TYPE.CHAT_ENTRY,
      chatId,
      chatDetail: user2,
      chatType,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      participant: [{ user1, user2 }],
    },
  };
  try {
    await dbClient.putItem(TableParam);
    return { ...TableParam.Item };
  } catch (error) {
    console.log("error in chatEntry %j >>", error);
  }
};

export const messageEntry = async (msg) => {
  // check message length if it is only one message , then use put method
  const TableParam = {
    TableName,
    Item: {
      pk: `CHT#${msg?.chatId}`,
      sk: `MSG#${msg?.id}`,
      sk1: msg?.createdAt,
      sk2: msg.msgStatus,
      gsi1Pk: `USR#${msg.receiver.userId}`,
      gsi1Sk: msg?.createdAt,
      sender: msg?.sender,
      receiver: msg?.receiver,
      chatId: msg?.chatId,
      id: msg?.id,
      msgStatus: msg.msgStatus,
      kind: msg?.kind,
      type: ENTRY_TYPE.MESSAGE_ENTRY,
      chatType: msg?.chatType,
      body: msg?.body,
      expireAt: msg.expireAt,
      updatedAt: msg?.createdAt,
      createdAt: msg?.createdAt,
      isDeleted: false,
      isEdited: false,
    },
  };
  try {
    await dbClient.putItem(TableParam);
    console.log("success in messageEntry");
  } catch (error) {
    console.log("error in messageEntry : %j " + error);
  }
};

export const updateMessageStatus = async (chatId, messageId, status) => {
  const TableParam = {
    TableName,
    Key: { pk: `CHT#${chatId}`, sk: `MSG#${messageId}` },
    UpdateExpression:
      "set #gsi1Sk = :gsi1Sk, #msgStatus = :msgStatus, #updatedAt = :updatedAt, #sk2 = :sk2",
    ExpressionAttributeNames: {
      "#msgStatus": "msgStatus",
      "#gsi1Sk": "gsi1Sk",
      "#updatedAt": "updatedAt",
      "#sk2": "sk2",
    },
    ExpressionAttributeValues: {
      ":gsi1Sk": Date.now().toString(),
      ":msgStatus": status,
      ":sk2": status,
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

export const updateUnreadMessage = async (owner, otherUser, count) => {
  const TableParam = {
    TableName,
    Key: { pk: `USR#${owner.userId}`, sk: `USR#${otherUser.userId}` },
    UpdateExpression:
      "set #gsi1Sk = :gsi1Sk, #sk1 = :sk1, #updatedAt = :updatedAt, #unreadCount = :unreadCount",
    ExpressionAttributeNames: {
      "#sk1": "sk1",
      "#gsi1Sk": "gsi1Sk",
      "#updatedAt": "updatedAt",
      "#unreadCount": "unreadCount",
    },
    ExpressionAttributeValues: {
      ":gsi1Sk": Date.now().toString(),
      ":sk1": Date.now().toString(),
      ":unreadCount": count,
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
