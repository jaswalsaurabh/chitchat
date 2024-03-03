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
          gsi1Pk: `${user.userType}#${USER_PRESENCE_STATUS.ONLINE}`,
          gsi1Sk: "0",
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
    userType,
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
      "set #status = :status, #updatedAt = :updatedAt, #sk3 = :sk3, #sk4 = :sk4, #gsi1Pk = :gsi1Pk, #state = :state, #connectionId = :connectionId, #userType = :userType",
    ExpressionAttributeNames: {
      "#status": "presenceStatus",
      "#updatedAt": "updatedAt",
      "#state": "sk2",
      "#connectionId": "connectionId",
      "#sk3": "sk3",
      "#sk4": "sk4",
      "#gsi1Pk": "gsi1Pk",
      "#userType": "userType",
    },
    ExpressionAttributeValues: {
      ":status": status,
      ":state": status,
      ":updatedAt": Date.now().toString(),
      ":connectionId": connectionId,
      ":sk3": `CONN#${connectionId}`,
      ":sk4": `UTYP#${userType}`,
      ":gsi1Pk": `${userType}#${status}`,
      ":userType": userType,
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
