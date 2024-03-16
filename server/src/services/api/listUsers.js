const { getAllUsers } = require("../../dbCrud/connectCrud");
const { formatAPIData } = require("../../helpers/formatResponse");

exports.handler = async (event, context, callback) => {
  console.log("this is event in listusers %j", event);
  try {
    const usersList = await getAllUsers();
    const formattedUsers = formatAPIData(usersList, "user list", false);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formattedUsers),
    });
  } catch (error) {
    console.log("error in list all users handler %j", error);
    const errorMessage = formatAPIData(
      error,
      "error in list all users ",
      false
    );
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(errorMessage),
    });
  }
};
