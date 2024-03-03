/**
 * Function to send message to user, provided connection ID
 * @param  { string } connectionId - connection ID of the user whom data is to be sent
 * @param  { string } payload - data to be sent
 * @param  { object } apigatewaymanagementapi - Object of class ApiGatewayManagementApi
 */

export const sendMessageToClient = (
  connectionId,
  payload,
  apigatewaymanagementapi
) => {
  console.log("posting to ", connectionId, " recieved  ", payload);
  return new Promise((resolve, reject) => {
    if (connectionId) {
      let postOptions = {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(payload),
      };
      apigatewaymanagementapi
        .postToConnection(postOptions)
        .then((data) => {
          console.log("successfully posted, response >> %j", data);
          resolve(data);
        })
        .catch((err) => {
          console.log("err in posting message in handler %j", err);
          reject(err);
        });
    } else {
      resolve(true);
    }
  });
};
