const {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} = require("@aws-sdk/client-apigatewaymanagementapi");

/**
 * Class for initializing an instance of Api gateway management api client.
 * Constructor will take 2 arguments.
 * @param  { string } stage - stage of the api gateway
 * @param  { string } domain - domain of the api gateway
 * @returns { instance } - returns instance of Api gateway management api client
 */
export class ApiGatewayManagementApi {
  client;

  constructor(stage, domain) {
    const apiVersion = "2018-11-29";
    this.client = new ApiGatewayManagementApiClient({
      apiVersion,
      endpoint: `https://${domain}/${stage}`,
    });
  }

  postToConnection(postOptions) {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        return reject(new Error("Client not instantiated"));
      }
      this.client
        .send(new PostToConnectionCommand(postOptions))
        .then((data) => resolve(data))
        .catch((err) => {
          console.log("err in api gateway config", err);
          reject(err);
        });
    });
  }
}
