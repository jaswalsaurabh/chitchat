/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ChatInfo from "@/app/Component/ChatInfo";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import AddUser from "../../assets/add-user.svg";
import Friends from "../../assets/friends.svg";
import AddPeople from "../../assets/addpeople.svg";
import Notification from "../../assets/notify.svg";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketConnection from "../_lib/socket";
import { User, fetchChatList } from "@/store/chatSlice";
import { AppDispatch, ReduxState } from "@/store/store";
import { UserEntry, fetchUserList, updateState } from "@/store/requestSlice";
import { updateCallState } from "@/store/callSlice";
import { usePeerHook } from "@/hooks/usePeerConnection";
import DropdownComponent from "../Component/Modal";
import Tooltip from "../Component/ToolTip";
import axios from "axios";
import { CALL_KIND, CALL_MODE, SOCKET_ROUTE } from "../enum";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  type RTCSessionDescriptionInit = {
    type: RTCSdpType;
    sdp: string;
  };
  const pathname = usePathname();
  console.log("this is path", pathname);

  const pathLength = pathname.split("/");
  // peerHook
  const { peer, getOffer, getAnswer, closePeerConnection } = usePeerHook();
  //
  const AuthSlice = useSelector((state: ReduxState) => state.AuthSlice);
  const CallSlice = useSelector((state: ReduxState) => state.CallSlice);
  const ChatSlice = useSelector((state: ReduxState) => state.ChatSlice);
  const RequestSlice = useSelector((state: ReduxState) => state.RequestSlice);
  // AuthSlice
  // local
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  // remote
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const initiateCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      // audio: true,
      video: true,
    });

    if (peer) {
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });

      const offer = await getOffer();
      socketConnection.emit(CALL_KIND.INITIATE, {
        sender: ChatSlice.sender,
        receiver: ChatSlice.receiver,
        offer,
        kind: CALL_KIND.INITIATE,
        chatId: ChatSlice.currChatId,
        route: SOCKET_ROUTE.CALL,
        callType: CALL_MODE.AUDIO,
      });
    }
    setLocalStream(stream);
    // setPeer(peer);
    if (localVideoRef.current && !localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject = stream;
    }
  };

  const handleIncommingCall = useCallback(
    async ({ to, offer }: { to: string; offer: RTCSessionDescriptionInit }) => {
      if (offer) {
        dispatch(updateCallState({ callScreen: true, answered: true }));
        const stream = await navigator.mediaDevices.getUserMedia({
          // audio: true,
          video: true,
        });
        if (peer) {
          stream.getTracks().forEach(async (track) => {
            peer.addTrack(track, stream);
            const ans = await getAnswer(offer);
            socketConnection.emit("call:accepted", {
              to: ChatSlice.receiver?.name,
              ans,
            });
          });
        }
        // setPeer(peer);
        setLocalStream(stream);
        if (localVideoRef.current && !localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject = stream;
        }
      } else {
        console.log("no offer");
      }
    },
    [socketConnection, peer, ChatSlice]
  );

  // console.log("this is redux currentSTate", store.getState());

  const handleCallAccepted = useCallback(
    ({ to, ans }: { to: string; ans: RTCSessionDescriptionInit }) => {
      if (peer) {
        peer.setRemoteDescription(new RTCSessionDescription(ans));
        console.log("Call Accepted!");
      }
    },
    [peer]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await getOffer();
    socketConnection.emit("peer:nego:needed", {
      offer,
      to: ChatSlice.receiver?.name,
    });
  }, [socketConnection, peer, ChatSlice]);

  useEffect(() => {
    if (peer) {
      peer.addEventListener("negotiationneeded", handleNegoNeeded);
      return () => {
        peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      };
    }
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      const ans = await getAnswer(offer);
      socketConnection.emit("peer:nego:final", {
        to: ChatSlice.receiver?.name,
        ans,
      });
    },
    [socketConnection, peer, ChatSlice]
  );

  const handleIceCandidate = async (data: { payload: RTCIceCandidate }) => {
    if (data.payload) {
      if (peer) {
        setTimeout(async () => {
          await peer.addIceCandidate(new RTCIceCandidate(data.payload));
        }, 2000);
      }
    }
  };

  const handleNegoNeedFinal = useCallback(
    async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
      if (peer) {
        await peer.setLocalDescription(ans);
      }
    },
    [peer]
  );

  useEffect(() => {
    if (peer) {
      peer.onicecandidate = (data) => {
        if (data.candidate) {
          socketConnection.emit("onicecandidate", {
            payload: data.candidate,
            to: ChatSlice.receiver?.name,
          });
        }
      };

      peer.ontrack = (event) => {
        const stream = event.streams[0];
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
        setRemoteStream(stream);
      };
    }
  }, [peer, ChatSlice.receiver]);

  useEffect(() => {
    if (CallSlice.isCalling) {
      initiateCall();
    }
  }, [CallSlice]);

  function getUserSuggestion() {
    dispatch(fetchUserList());
  }

  function handleAddUser(receiver: User) {
    interface body {
      sender: User | null;
      receiver: User;
    }
    const reqstBody: body = {
      sender: ChatSlice.sender,
      receiver,
    };
    axios
      .post(API_ENDPOINT + "/send-request", { ...reqstBody })
      .then((res) => {
        console.log("request res", res.data);
      })
      .catch((err) => {
        console.log("err in sending request", err);
      });
  }

  useEffect(() => {
    const userId = AuthSlice.authObj?.sub;
    if (userId) {
      dispatch(fetchChatList(userId));
    }
  }, []);

  function handleMessage() {
    dispatch(updateState({ key: "showUserList", value: false }));
  }

  function handleEndCall() {
    if (localVideoRef.current) {
      socketConnection.emit("callended", { to: ChatSlice.receiver?.name });

      localStream?.getTracks().forEach((track) => track.stop());
      remoteStream?.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
      // remoteVideoRef.current.srcObject = null;
      if (peer) {
        closePeerConnection();
      }
      dispatch(
        updateCallState({ isCalling: false, callScreen: false, callObj: null })
      );
    }
  }

  function endCallEvent() {
    if (localVideoRef.current) {
      localStream?.getTracks().forEach((track, index) => {
        track.stop();
      });
      remoteStream?.getTracks().forEach((track, index) => {
        track.stop();
      });
      if (peer) {
        closePeerConnection();
      }
      localVideoRef.current.srcObject = null;
      dispatch(
        updateCallState({ isCalling: false, callScreen: false, callObj: null })
      );
    }
  }

  const handleAcknowledgement = (data: any) => {
    // socketConnection.emit("acknowledge", {
    //   chatId: chatState.currChatId,
    //   messageId: data.data.id,
    //   msgStatus: MESSAGE.DELIVERED,
    // });
    console.log("this is data acknowledge", data);

    // dispatch(addChatMessage(data.data));
  };

  useEffect(() => {
    // socketConnection.on("user:joined", handleUserJoined);
    socketConnection.on("callended", endCallEvent);
    socketConnection.on("onicecandidate", handleIceCandidate);
    socketConnection.on("incomming:call", handleIncommingCall);
    socketConnection.on("call:accepted", handleCallAccepted);
    socketConnection.on("peer:nego:needed", handleNegoNeedIncomming);
    socketConnection.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      // socketConnection.off("user:joined", handleUserJoined);
      socketConnection.on("onicecandidate", handleIceCandidate);
      socketConnection.off("incomming:call", handleIncommingCall);
      socketConnection.off("call:accepted", handleCallAccepted);
      socketConnection.off("peer:nego:needed", handleNegoNeedIncomming);
      socketConnection.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    // handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const chatList = ChatSlice.chatList.data;

  if (!CallSlice.callScreen) {
    return (
      <div className="flex flex-col">
        <div className="flex h-[8vh] min-h-[63px] sticky top-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center lg:w-[26%] h-full border-r">
              <h1 onClick={handleMessage} className="ml-4 text-2xl font-sans">
                Messages
              </h1>
              <div className="flex w-full h-full justify-end items-center mr-4">
                <div className="mr-2 cursor-pointer">
                  <Tooltip content="Friend Requests" position={"left"}>
                    <Image
                      priority
                      src={Friends}
                      height={20}
                      width={40}
                      alt="user-avatar"
                    />
                  </Tooltip>
                </div>
                <div className="cursor-pointer" onClick={getUserSuggestion}>
                  <Tooltip content={"Add Friends"} position={"right"}>
                    <Image
                      priority
                      src={AddUser}
                      height={20}
                      width={30}
                      alt="user-avatar"
                    />
                  </Tooltip>
                </div>
              </div>
              {/* <div
                onClick={handleClick}
                className="flex items-center border rounded cursor-pointer ml-4 py-1 px-2"
              >
                Add People
              </div> */}
            </div>
            <div className="flex">
              {/* <div className="flex mr-2 border-2 border-solid border-slate-500 rounded-md">
              <input
                className="py-1 px-3 outline-none border-none"
                type="text"
                placeholder="Search...."
              />
            </div> */}
              <div className="flex cursor-pointer">
                <Image
                  priority
                  src={Notification}
                  height={20}
                  width={40}
                  alt="user-avatar"
                />
              </div>
              <div className="flex mt-2 mx-2 cursor-pointer">
                <DropdownComponent image={UserImage} options={""} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[92vh] w-full">
          {/* sideBar */}
          <div
            className={`flex flex-col border border-slate-50 w-full ${
              pathLength.length == 3 && "hidden lg:flex"
            } lg:w-[26%] lg:min-w-[26%]`}
          >
            <div className="flex items-center px-3 sticky h-[8vh] min-h-[62px] border-y bg-white top-0">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 pl-4 w-[100%] outline-none text-sm bg-slate-100 border border-solid rounded-full"
              />
            </div>
            {/* Here make ternary condition for showinf user List */}
            {RequestSlice.showUserList ? (
              <div className="flex flex-col overflow-y-scroll w-full">
                {RequestSlice.userList?.data.map((user: UserEntry) => (
                  <div
                    className="flex items-center p-1 h-auto w-full cursor-pointer hover:bg-slate-100"
                    key={user.userId}
                  >
                    <div className="w-20 ml-2 mt-2">
                      <Image
                        priority
                        src={UserImage}
                        height={50}
                        width={50}
                        alt="user-avatar"
                      />
                    </div>
                    <div className="flex flex-1">
                      <p>{user?.userDetails?.name}</p>
                    </div>
                    <div
                      className="flex justify-end mr-1 pr-3 w-20"
                      onClick={() => handleAddUser(user.userDetails)}
                    >
                      <Image
                        priority
                        src={AddPeople}
                        height={20}
                        width={25}
                        alt="add-user"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col overflow-y-scroll">
                {chatList?.map((item, index) => (
                  <ChatInfo key={item.chatId} item={item} index={index} />
                ))}
              </div>
            )}
          </div>

          <div
            className={`lg:flex w-full h-full ${
              pathLength.length == 2 && "hidden lg:flex"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
  if (CallSlice.callScreen) {
    return (
      <div className=" bg-[#202325] flex flex-col absolute w-full text-white h-screen">
        {/* <div className="flex min-h-[10px] justify-between"></div> */}

        <div className="flex mt-5 relative w-auto h-[60%] mx-5">
          <div className="flex flex-col flex-1 border relative mx-5 rounded-2xl border-green-400">
            <div className="h-[10%] absolute right-0 flex items-center justify-end mx-2">
              Extra
            </div>
            <div className="h-[100%] relative flex justify-center items-center">
              <video
                className="relative h-full aspect-video"
                ref={localVideoRef}
                autoPlay
              />
            </div>
            <div className="flex h-[10%] absolute bottom-0 w-full items-center justify-between ">
              <h1 className="relative right-0 mx-2">Michael Smyth</h1>
              <h2 className="relative left-0 mx-2">Mic</h2>
            </div>
          </div>
        </div>

        <div className="flex h-[20%] justify-end mr-5">
          <div className="flex relative h-full w-[20%] rounded-2xl my-4 mr-5 flex-col border border-green-500">
            <div className="flex items-center h-full justify-center">
              <video
                className="relative h-full aspect-video"
                ref={remoteVideoRef}
                autoPlay
              />
            </div>
            <div className="flex absolute right-0 bottom-0 justify-end mr-2">
              Me
            </div>
          </div>
        </div>

        <div className="bottom-0 flex-1 w-full py-2 items-center flex justify-around">
          <div className="flex">
            <h1>34:12</h1>
          </div>
          <div className="flex">
            <h1>Mute</h1>
          </div>
          <div className="flex">
            <h1>Stop Video</h1>
          </div>
          <div className="flex">
            <h1>Raise Hand</h1>
          </div>
          <div className="flex">
            <h1>Share Screen</h1>
          </div>
          <div className="flex">
            <h1>Start Record</h1>
          </div>
          <div className="flex">
            <h1>More</h1>
          </div>
          <div
            onClick={handleEndCall}
            className="flex bg-red-700 cursor-pointer h-[40%] p-4 items-center rounded"
          >
            End Call
          </div>
        </div>
      </div>
    );
  }
}
