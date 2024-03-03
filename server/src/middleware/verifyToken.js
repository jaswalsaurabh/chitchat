const {
  CognitoIdentityProviderClient,
  GetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
/**
 * Verifies the access token provided in the event.
 * @param {Object} event - The event object containing the request data.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the user data if the token is valid, or false if there's an error.
 */

export const verifyToken = async (event) => {
//   console.log("request %j", event);
  try {
    const accessToken = {
      AccessToken:
        event?.headers?.Authorization || event?.queryStringParameters?.token,
    };
    const client = new CognitoIdentityProviderClient();
    const command = new GetUserCommand(accessToken);
    const data = await client.send(command);
    console.log("this is jwt data %j", data);
    return data;
  } catch (error) {
    console.log("error in authorizer middleware %j", error);
    return false;
  }
};
