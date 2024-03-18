import { USER_PRESENCE_STATUS } from "../enum/constants";
import { dbClient } from "../helpers/dynamoDbClient";
const TableName = process.env.DYNAMODB_TABLE;

export const presenceEntry = async (user) => {
  console.log("inside presence entry >>", user);
  try {
    const QueryTableParam = {
      TableName,
      KeyConditionExpression: "pk = :pkey and sk = :userId",
      ExpressionAttributeValues: {
        ":pkey": `USRPR#usr`,
        ":userId": `USR#${user?.userId}`,
      },
    };
    const presenceRes = await dbClient.query(QueryTableParam);
    if (presenceRes?.Items?.length > 0) {
      await updatePresence(user);
    } else {
      const TableParam = {
        TableName,
        Item: {
          pk: `USRPR#usr`,
          sk: `USR#${user.userId}`,
          sk1: Date.now().toString(),
          sk2: USER_PRESENCE_STATUS.ONLINE,
          sk3: `CONN#${user.connectionId}`,
          sk4: `UTYP#${user.userType}`,
          userId: user.userId,
          presenceStatus: USER_PRESENCE_STATUS.ONLINE,
          userType: user.userType,
          cognitoDetails: user.user,
          userDetails: user.userDetails,
          type: "USER PRESENCE ENTRY",
          updatedAt: Date.now().toString(),
          createdAt: Date.now().toString(),
          connectionId: user.connectionId,
        },
      };
      console.log("TableParam in entry %j", TableParam);
      await dbClient.putItem(TableParam);
    }
  } catch (error) {
    console.log("error in presence entry =>", error);
  }
};

export const updatePresence = async (user) => {
  let {
    userId,
    status,
    connectionId = null,
    userDetails = null,
    user: cognitoDetails = null,
  } = user;
  if (status === USER_PRESENCE_STATUS.OFFLINE) {
    connectionId = null;
  }
  const TableParam = {
    TableName,
    Key: { pk: "USRPR#usr", sk: `USR#${userId}` },
    UpdateExpression:
      "set #status = :status, #updatedAt = :updatedAt, #sk3 = :sk3, #state = :state, #connectionId = :connectionId",
    ExpressionAttributeNames: {
      "#status": "presenceStatus",
      "#updatedAt": "updatedAt",
      "#state": "sk2",
      "#connectionId": "connectionId",
      "#sk3": "sk3",
    },
    ExpressionAttributeValues: {
      ":status": status,
      ":state": status,
      ":updatedAt": Date.now().toString(),
      ":connectionId": connectionId,
      ":sk3": `CONN#${connectionId}`,
    },
  };

  if (userDetails) {
    TableParam["UpdateExpression"] += ", userDetails = :userDetails";
    TableParam["ExpressionAttributeValues"][":userDetails"] = userDetails;
  }

  if (cognitoDetails) {
    TableParam["UpdateExpression"] += ", cognitoDetails = :cognitoDetails";
    TableParam["ExpressionAttributeValues"][":cognitoDetails"] = cognitoDetails;
  }

  console.log("table Param in updating presence %j", TableParam);
  try {
    await dbClient.updateItem(TableParam);
  } catch (error) {
    console.log("error in updaing presence %j >>", error);
  }
};

export const getUserWithConnection = async (CONN_ID) => {
  const TableParam = {
    TableName,
    IndexName: "LSI3",
    KeyConditionExpression: "pk = :pkey and sk3 = :connId", //and sk <= :timestamp
    ExpressionAttributeValues: {
      ":pkey": `USRPR#usr`,
      ":connId": `CONN#${CONN_ID}`,
    },
  };
  try {
    const data = await dbClient.query(TableParam);
    return data;
  } catch (error) {
    console.log("error %j >>", error);
  }
};

export const getAllUsers = async () => {
  const TableParam = {
    TableName,
    KeyConditionExpression: "pk = :pkey",
    ExpressionAttributeValues: {
      ":pkey": "USRPR#usr",
    },
    ExpressionAttributeNames: {
      "#userId": "userId",
      "#userDetails": "userDetails",
      "#presenceStatus": "presenceStatus",
      "#createdAt": "createdAt",
      "#updatedAt": "updatedAt",
    },
    ProjectionExpression:
      "#userDetails, #userId, #presenceStatus, #createdAt, #updatedAt",
  };
  try {
    const data = await dbClient.query(TableParam);
    return data.Items;
  } catch (error) {
    console.log("error in listing all users >> %j", error);
  }
};
