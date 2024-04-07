const { callEntry } = require("../../dbCrud/callCrud");
const { getUserDetails } = require("../../dbCrud/messageCrud");
const { CALL_KIND, SOCKET_ROUTE } = require("../../enum/constants");
const { callValidator } = require("../../helpers/callValidator");
const { extractEvent } = require("../../helpers/extractEvent");
const { sendMessageToClient } = require("../../helpers/sendMessage");
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event, context, callback) => {
  console.log("this is event in nessage %j", event);
  try {
    const { apigatewaymanagementapi, body, userConnxnId } = extractEvent(event);
    const isValid = await callValidator(
      body,
      apigatewaymanagementapi,
      userConnxnId,
      callback
    );
    const receiverDetails = await getUserDetails(body.receiver.userId);
    if (isValid) {
      if (receiverDetails) {
        const receiverConnectionId = receiverDetails.connectionId;
        switch (body.kind) {
          case CALL_KIND.INITIATE:
            const newCallId = uuidv4();
            const callDataObj = await callEntry({
              caller: body.sender.userId,
              callId: newCallId,
              chatId: body.chatId,
              callerDetails: body.sender,
              receiverDetails: body.receiver,
              callType: body.callType,
              kind: body.kind,
            });
            await sendMessageToClient(
              receiverConnectionId,
              {
                data: {
                  ...callDataObj,
                  kind: CALL_KIND.INITIATE,
                  callId: newCallId,
                  createdAt: Date.now().toString(),
                  updatedAt: Date.now().toString(),
                },
                route: SOCKET_ROUTE.CALL_INITIATED,
                message: "Call initiated",
                error: false,
              },
              apigatewaymanagementapi
            );
            await sendMessageToClient(
              userConnxnId,
              {
                data: {
                  ...callDataObj,
                  kind: CALL_KIND.INITIATE,
                  callId: newCallId,
                  createdAt: Date.now().toString(),
                  updatedAt: Date.now().toString(),
                },
                route: SOCKET_ROUTE.CALL_INITIATED_SUCCESS,
                message: "Call initiated",
                error: false,
              },
              apigatewaymanagementapi
            );
            callback(null, {
              statusCode: 200,
            });
            break;

          default:
            break;
        }
      } else {
      }
      await sendMessageToClient(
        userConnxnId,
        {
          data: [],
          message: "Inside isvalid",
          error: false,
          route: "call",
        },
        apigatewaymanagementapi
      );
      // {id,sender,receiver,lastSender,lastReceiver,duration,status,callEndTime}
      // switch (body.kind) {
      //     break;

      //   default:
      //     break;
      // }
      callback(null, {
        statusCode: 200,
      });
    }
  } catch (error) {
    console.log("error in message event handler %j", error);
    callback(null, {
      statusCode: 400,
    });
  }
};
