const { getAllUsers } = require("../../dbCrud/connectCrud");
const {
  formatResponse,
  formatAPIPaginationData,
} = require("../../helpers/formatResponse");

exports.handler = async (event, context, callback) => {
  console.log("this is event in listusers %j", event);
  try {
    const usersList = await getAllUsers();
    const formattedUsers = formatAPIPaginationData(
      usersList,
      "user list",
      false
    );
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formattedUsers),
    });
  } catch (error) {
    console.log("error in listusers event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
