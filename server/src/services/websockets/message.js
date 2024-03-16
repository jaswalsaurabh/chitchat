const {
  messageEntry,
  chatEntry,
  getChat,
  getUserDetails,
} = require("../../dbCrud/messageCrud");
const { MESSAGE_STATUS } = require("../../enum/constants");
const { extractEvent } = require("../../helpers/extractEvent");
const { v4: uuidv4 } = require("uuid");
const { sendMessageToClient } = require("../../helpers/sendMessage");
const { formatResponse } = require("../../helpers/formatResponse");

exports.handler = async (event, context, callback) => {
  console.log("this is event in nessage %j", event);
  try {
    const { apigatewaymanagementapi, body, userConnxnId } = extractEvent(event);

    // body = {
    //   body: "",
    //   chatId: "",
    //   chatType: "GROUP/SINGLE",
    //   kind: "",
    //   sender: {},
    //   receiver: {},
    // };

    if (!body.chatId) {
      const fetchChat = await getChat(body.receiver.userId, body.sender.userId);
      if (fetchChat) {
        body.chatId = fetchChat.chatId;
      }
      if (!fetchChat) {
        body.chatId = uuidv4();
        await chatEntry(body.receiver, body.sender, body.chatId, body.chatType);
        await chatEntry(body.sender, body.receiver, body.chatId, body.chatType);
      }
    }

    const messageBody = {
      ...body,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      id: body.id || uuidv4(),
      msgStatus: MESSAGE_STATUS.SENT,
    };

    await messageEntry(messageBody);

    const acknowledgement = formatResponse(
      messageBody,
      "sent",
      "message sent successfully",
      false
    );

    await sendMessageToClient(
      userConnxnId,
      acknowledgement,
      apigatewaymanagementapi
    );

    const receiver = await getUserDetails(body.receiver.userId);

    if (receiver) {
      const messageToSend = formatResponse(
        messageBody,
        "received",
        "message received successfully",
        false
      );
      sendMessageToClient(
        receiver.connectionId,
        messageToSend,
        apigatewaymanagementapi
      );
    }
    if (!receiver) {
      // update the count of unread message in chat for receiver
      
    }

    callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    console.log("error in message event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
