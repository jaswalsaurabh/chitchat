const { getUserDetails } = require("../../dbCrud/messageCrud");

exports.handler = async (event, context, callback) => {
  console.log("this is event in acknowledge %j", event);
  try {
    const { apigatewaymanagementapi, body } = extractEvent(event);
    const receiver = await getUserDetails(body.receiver.userId);
    
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
