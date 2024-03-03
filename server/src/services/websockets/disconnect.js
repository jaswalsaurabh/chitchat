const { updatePresence, getUserWithConnection } = require("../../dbCrud/connectCrud");
const { USER_PRESENCE_STATUS } = require("../../enum/constants");
const { extractEvent } = require("../../helpers/extractEvent");

exports.handler = async (event, context, callback) => {
  console.log("this is event in disconnect %j", event);
  try {
    const { userConnxnId } = extractEvent(event);
    const user = await getUserWithConnection(userConnxnId);
    const userId = user?.Items[0]?.userId;
    const userType = user?.Items[0]?.userType;
    if (userId && userType) {
      await updatePresence({
        userId,
        status: USER_PRESENCE_STATUS.OFFLINE,
        userType,
      });
    }
    callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    console.log("error in disconnect event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
