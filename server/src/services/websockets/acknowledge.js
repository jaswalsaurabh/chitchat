const {
  getUserDetails,
  updateMessageStatus,
  updateUnreadMessage,
} = require("../../dbCrud/messageCrud");
const { extractEvent } = require("../../helpers/extractEvent");
const { sendMessageToClient } = require("../../helpers/sendMessage");

exports.handler = async (event, context, callback) => {
  console.log("this is event in acknowledge %j", event);
  try {
    const { apigatewaymanagementapi, body } = extractEvent(event);
    await updateMessageStatus(body.chatId, body.messageId, body.msgStatus);
    const receiver = await getUserDetails(body.receiver.userId);
    if (body.unreadCount) {
      await updateUnreadMessage(body.sender, body.receiver, 0);
    }
    if (receiver.connectionId) {
      sendMessageToClient(receiver.connectionId, body, apigatewaymanagementapi);
    }
    callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    console.log("error in acknowledge event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
