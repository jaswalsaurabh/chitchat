const { getChatHistory } = require("../../dbCrud/chatCrud");
const { formatAPIData } = require("../../helpers/formatResponse");

exports.handler = async (event, context, callback) => {
  console.log("this is event in listusers %j", event);
  try {
    const body = JSON.parse(event.body);
    const chatMessages = await getChatHistory(body.chatId);
    const formattedChatMessage = formatAPIData(
      chatMessages,
      "chat history",
      false
    );
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formattedChatMessage),
    });
  } catch (error) {
    console.log("error in fetching chat history handler %j", error);
    const errorMessage = formatAPIData(
      error,
      "error in fetching chat history ",
      false
    );
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(errorMessage),
    });
  }
};
