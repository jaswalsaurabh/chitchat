const { callValidator } = require("../../helpers/callValidator");
const { extractEvent } = require("../../helpers/extractEvent");

exports.handler = async (event, context, callback) => {
  console.log("this is event in nessage %j", event);
  try {
    const { apigatewaymanagementapi, body, userConnxnId } = extractEvent(event);
    const isValid = await callValidator(
      body,
      apigatewaymanagementapi,
      userConnxnId
    );
    if (isValid) {
      callback(null, {
        statusCode: 200,
      });
    }
  } catch (error) {
    console.log("error in message event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
