/**
 * @typedef {object} EventUtilities
 * @property {ApiGatewayManagementApi} apigatewaymanagementapi - AWS api gateway management object
 * @property {string} userConnxnId - Connection ID of user
 * @property {object} body - Request body
 */

import { ApiGatewayManagementApi } from "./apigatewayConfig";

/**
 * Extracts event properties and returns an object containing `apigatewaymanagementapi`, `userConnxnId`, and `body`.
 *
 * @param {object} event - The event object containing request context and body.
 * @returns {EventUtilities} - An object containing the following properties:
 *   - apigatewaymanagementapi: An instance of ApiGatewayManagementApi.
 *   - userConnxnId: The connection ID from the request context.
 *   - body: The parsed JSON object from the event body.
 * @throws {Error} - If an error occurs during the extraction process.
 */

export const extractEvent = (event) => {
  try {
    const stage = event.requestContext.stage;
    const domain = event.requestContext.domainName;
    const userConnxnId = event.requestContext.connectionId;
    const apigatewaymanagementapi = new ApiGatewayManagementApi(stage, domain);
    const body = JSON.parse(event.body || null);
    return { apigatewaymanagementapi, userConnxnId, body };
  } catch (error) {
    console.log("error in extracting event %j", error);
    console.log("error in extracting event raw", error);
    return error;
  }
};
