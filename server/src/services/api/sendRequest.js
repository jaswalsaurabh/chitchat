const { requestEntry } = require("../../dbCrud/requestCrud");
const { formatAPIData } = require("../../helpers/formatResponse");
const { v4: uuid } = require("uuid");

exports.handler = async (event, context, callback) => {
  console.log("this is event in creating request %j", event);
  try {
    const body = JSON.parse(event.body);
    const request = await requestEntry(body.receiver, body.sender, uuid());
    const formattedRqst = formatAPIData(
      request,
      "reuest sent successfully",
      false
    );
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formattedRqst),
    });
  } catch (error) {
    console.log("error in creating request handler %j", error);
    const errorMessage = formatAPIData(
      error,
      "error in creating request",
      false
    );
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(errorMessage),
    });
  }
};
