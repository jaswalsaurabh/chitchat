"use client";
import socketConnection from "@/app/_lib/socket";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const usePeerHook = () => {
  let [peerConn, setPeerConn] = useState<RTCPeerConnection | null>(null);
  //   const peerConn = useRef<RTCPeerConnection | null>(null);
  const [receiver, setReceiver] = useState<string>("");
  const callSlice = useSelector((state: any) => state.CallSlice);
  const toRef = useRef<string>("");

  const createNewPeerConnection = () => {
    console.log("created peer");
    let connection = new RTCPeerConnection();
    setPeerConn(connection);
    return connection;
  };

  const usePeerConnection = () => {
    const peerConnection = useMemo(() => {
      console.log("created peer");
      return new RTCPeerConnection();
    }, []); // Empty dependency array ensures that the connection is created only once

    return peerConnection;
  };

  useEffect(() => {
    toRef.current = callSlice.callObj;
  }, [callSlice.callObj]);

  const saveRecipient = (arg: string) => {
    setReceiver(arg);
  };

  const saveOfferSendAnswer = useCallback(
    async (data: any) => {
      console.log("my Data in hook send answer", data);
      //   console.log("peerConn in hook", peerConn);

      try {
        if (peerConn) {
          if (!peerConn.remoteDescription) {
            peerConn.setRemoteDescription(
              new RTCSessionDescription(data.payload)
            );
            const answer = await peerConn.createAnswer();
            peerConn.setLocalDescription(answer);
            socketConnection.emit("answer", { payload: answer, to: toRef });
            // peerConn.createAnswer(
            //   (answer) => {
            //     peerConn?.setLocalDescription(
            //       new RTCSessionDescription(answer)
            //     );
            //     socketConnection.emit("call", {
            //       call: [
            //         {
            //           sender: data.sender,
            //           receiver: data.receiver,
            //           kind: "CALL_ANSWER",
            //           callBody: answer,
            //           chatId: data.chatId,
            //           callId: data.callId,
            //           callType: data.callType,
            //           sessionId: data.sessionId,
            //           callerId: data.callerId,
            //           status: "CONNECTED",
            //           msgStatus: "CONNECTED",
            //         },
            //       ],
            //     });
            //     if (data.localCandidates.length) {
            //       data.localCandidates.map(
            //         ({ val, i }: { val: any; i: any }) => {
            //           socketConnection.emit("call", {
            //             call: [
            //               {
            //                 sender: data.sender,
            //                 receiver: data.receiver,
            //                 kind: "CANDIDATE",
            //                 callBody: val,
            //                 chatId: data.chatId,
            //                 callId: data.callId,
            //                 callType: data.callType,
            //                 sessionId: data.sessionId,
            //                 status:
            //                   i === data.localCandidates.length - 1
            //                     ? "CONNECTED"
            //                     : "CONNECTING",
            //                 msgStatus:
            //                   i === data.localCandidates.length - 1
            //                     ? "CONNECTED"
            //                     : "CONNECTING",
            //               },
            //             ],
            //           });
            //         }
            //       );
            //     }
            //   },
            //   (error) => {
            //     console.error(
            //       "Something went wrong when creating answer !!",
            //       error
            //     );
            //   }
            // );
          }
        }
      } catch (error) {
        console.error("error in save offer and send answer function !!", error);
      }
    },
    [peerConn]
  );

  const saveAnswerSendCandidate = useCallback(
    (data: any) => {
      try {
        if (peerConn) {
          peerConn.setRemoteDescription(new RTCSessionDescription(data.answer));
          if (data.localCandidates.length) {
            data.localCandidates.map(({ val, i }: { val: any; i: any }) => {
              socketConnection.emit("call", {
                call: [
                  {
                    sender: data.sender,
                    receiver: data.receiver,
                    kind: "CANDIDATE",
                    chatId: data.chatId,
                    callId: data.callId,
                    callType: data.callType,
                    callBody: val,
                    sessionId: data.sessionId,
                    status:
                      i === data.localCandidates.length - 1
                        ? "CONNECTED"
                        : "CONNECTING",
                    msgStatus:
                      i === data.localCandidates.length - 1
                        ? "CONNECTED"
                        : "CONNECTING",
                  },
                ],
              });
            });
          }
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return error;
      }
    },
    [peerConn]
  );

  const closePeerConnection = () => {
    if (peerConn) {
      peerConn.close();
      setPeerConn(null);
      return;
    }
  };

  useEffect(() => {
    if (!peerConn) {
      createNewPeerConnection();
    }

    return () => {
      if (peerConn) {
        peerConn.close();
      }
    };
  }, [peerConn]);

  return {
    peer: peerConn,
    receiver,
    saveRecipient,
    closePeerConnection,
    saveOfferSendAnswer,
    saveAnswerSendCandidate,
  };
};
