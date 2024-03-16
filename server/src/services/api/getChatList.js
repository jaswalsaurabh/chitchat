const { getAllChats } = require("../../dbCrud/chatCrud");
const { formatAPIData } = require("../../helpers/formatResponse");

exports.handler = async (event, context, callback) => {
  console.log("this is event in listusers %j", event);
  try {
    const body = JSON.parse(event.body);
    const chatList = await getAllChats(body.userId);
    const formattedChats = formatAPIData(chatList, "chat list", false);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formattedChats),
    });
  } catch (error) {
    console.log("error in fetching chat list handler %j", error);
    const errorMessage = formatAPIData(
      error,
      "error in fetching chat list ",
      false
    );
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(errorMessage),
    });
  }
};
