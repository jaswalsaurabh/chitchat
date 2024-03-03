exports.handler = (event, context, callback) => {
  try {
    console.log("this is event in nessage %j", event);
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
