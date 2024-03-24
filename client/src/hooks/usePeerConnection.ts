"use client";
import socketConnection from "@/app/_lib/socket";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const usePeerHook = () => {
  let [peerConn, setPeerConn] = useState<RTCPeerConnection | null>(null);
    const peerC = useRef<RTCPeerConnection | null>(null);
  const [receiver, setReceiver] = useState<string>("");
  const callSlice = useSelector((state: any) => state.CallSlice);
  const toRef = useRef<string>("");

  const createPeer = () => {
    console.log("created peer");
    let connection = new RTCPeerConnection(
      {
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }
    );
    setPeerConn(connection);
    return connection;
  };

  const getOffer = async () => {
    if (peerConn) {
      const offer = await peerConn.createOffer();
      await peerConn.setLocalDescription(offer);
      return offer;
    }
  }

  const getAnswer = async (offer: RTCSessionDescriptionInit) => {
    if (peerConn) {
      await peerConn.setRemoteDescription(new RTCSessionDescription(offer));
      const ans = await peerConn.createAnswer();
      await peerConn.setLocalDescription(ans);
      return ans;
    }
  }


  // useEffect(() => {
  //   toRef.current = callSlice.callObj;
  // }, [callSlice.callObj]);

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
      createPeer();
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
    getOffer,
    createPeer,
    getAnswer,
    saveRecipient,
    closePeerConnection,
    saveOfferSendAnswer,
    saveAnswerSendCandidate,
  };
};
