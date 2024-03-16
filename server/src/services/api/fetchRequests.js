const { getAllRequests } = require("../../dbCrud/requestCrud");
const { formatAPIData } = require("../../helpers/formatResponse");

exports.handler = async (event, context, callback) => {
  console.log("this is event in listrequests %j", event);
  try {
    const body = JSON.parse(event.body);
    const requests = await getAllRequests(body.userId);
    const formattedRqstsData = formatAPIData(requests, "request list", false);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formattedRqstsData),
    });
  } catch (error) {
    console.log("error in listrequests handler %j", error);
    const errorMessage = formatAPIData(error, "error in listrequests", false);
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(errorMessage),
    });
  }
};
