exports.handler = (event, context, callback) => {
  try {
    console.log("this is event in keepAlive %j", event);
    callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    console.log("error in keepAlive event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
