const { presenceEntry } = require("../../dbCrud/connectCrud");
const { USER_PRESENCE_STATUS } = require("../../enum/constants");
const { extractEvent } = require("../../helpers/extractEvent");
const { verifyToken } = require("../../middleware/verifyToken");

exports.handler = async (event, context, callback) => {
  console.log("this is event in connect %j", event);
  try {
    const { userConnxnId: connectionId } = extractEvent(event);

    const user = await verifyToken(event);

    const userDetails = { profileImage: "" };
    userDetails.userName = user.Username;
    user.UserAttributes.forEach((element) => {
      if (element.Name === "name") {
        userDetails.name = element.Value;
      } else if (element.Name === "sub") {
        userDetails.userId = element.Value;
      } else if (element.Name === "email") {
        userDetails.email = element.Value;
      }
    });

    const body = {
      userId: userDetails.userId,
      connectionId,
      user,
      userDetails,
      status: USER_PRESENCE_STATUS.ONLINE,
    };

    await presenceEntry(body);

    callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    console.log("error in connect event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
