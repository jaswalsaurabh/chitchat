import { CALL_KIND } from "../enum/constants";
import { sendMessageToClient } from "./sendMessage";

export const callValidator = async (
  callDataObj,
  apigatewaymanagementapi,
  userConnxnId,
  callback
) => {
  if (!callDataObj.kind) {
    await sendMessageToClient(
      userConnxnId,
      {
        data: [],
        message: "Kind not supported !",
        error: true,
        route: "call",
      },
      apigatewaymanagementapi
    );
    callback(null, {
      statusCode: 200,
    });
  } else if (!callDataObj.receiver) {
    await sendMessageToClient(
      userConnxnId,
      {
        data: [],
        message: "Receiver details missing!",
        error: true,
        route: "call",
      },
      apigatewaymanagementapi
    );
    callback(null, {
      statusCode: 200,
    });
  } else if (!callDataObj.sender) {
    await sendMessageToClient(
      userConnxnId,
      {
        data: [],
        message: "Sender details missing!",
        error: true,
        route: "call",
      },
      apigatewaymanagementapi
    );
    callback(null, {
      statusCode: 200,
    });
  } else if (!callDataObj.chatId) {
    await sendMessageToClient(
      userConnxnId,
      {
        data: [],
        message: "Chat Id missing!",
        error: true,
        route: "call",
      },
      apigatewaymanagementapi
    );
    callback(null, {
      statusCode: 200,
    });
  } else if (callDataObj.kind !== CALL_KIND.INITIATE && !callDataObj.callId) {
    await sendMessageToClient(
      userConnxnId,
      {
        data: [],
        message: "Call Id & kind is missing!",
        error: true,
        route: "call",
      },
      apigatewaymanagementapi
    );
  } else return true;
};
