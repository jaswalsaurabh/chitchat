"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import BackBtn from "../../assets/back.svg";
import MenuIcon from "../../assets/menu.png";
import Audio from "../../assets/audio-call.svg";
import Video from "../../assets/video-call.svg";
import CloseIcon from "../../assets/close.svg";
import UserInfo from "@/app/Component/UserInfo";
import ChatHistory from "./ChatHistory";
import { useDispatch, useSelector } from "react-redux";
import { updateCallState } from "@/store/callSlice";
import { useRouter } from "next/navigation";

function ChatHeader() {
  const [historyProps, setHistoryProps] = useState({
    userInfo: false,
    search: false,
  });

  const [parentWidth, setParentWidth] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const callSlice = useSelector((state: any) => state.CallSlice);
  const ChatSlice = useSelector((state: any) => state.ChatSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleUserInfo() {
    setHistoryProps({ ...historyProps, userInfo: true });
  }

  function closeProfile() {
    setHistoryProps({ ...historyProps, userInfo: false });
  }
  //   const parentWidth = useRef<number | null>(null);

  useEffect(() => {
    const parent = document.getElementById("flexDiv");
    // Get the width of the parent div
    if (!parent || !parent.offsetWidth) {
      return;
    }
    setParentWidth(parent.offsetWidth);
    // Log the width to the console (you can use this value as needed)
    // console.log("Parent div width:", parent.offsetWidth);
  }, []);

  const handleInitiateCall = async () => {
    // socketConnection.emit("incomming:call", { to: ChatSlice?.receiver.name });
    dispatch(
      updateCallState({ isCalling: true, callScreen: true, callObj: value })
    );
  };

  const answerCall = useCallback(async () => {
    dispatch(
      updateCallState({ callScreen: true, callObj: value, answered: true })
    );
    // dispatch(
    //   addEventsData({ payload: true, callScreen: true, key: "answered" })
    // );
  }, []);

  // useEffect(() => {
  //   socketConnection.on("incomming:call", answerCall);
  //   return () => {
  //     socketConnection.on("incomming:call", answerCall);
  //   };
  // }, [answerCall]);

  const handleBack = ()=>{
    router.push('/chat')
  }

  return (
    <div className="flex flex-row w-full">
      {" "}
      <div
        id="flexDiv"
        className={`flex flex-col items-center ${
          historyProps.userInfo ? "flex w-[60%]" : "w-full"
        } h-[92vh] bg-amber-200`}
      >
        <header className="bg-sky-200 sticky top-[63px] flex flex-row items-center w-full h-[8vh] min-h-[62px]">
          <div className="flex justify-between pl-2 pr-6 cursor-pointer">
            <div className="flex" onClick={handleBack} >
              <Image
                priority
                src={BackBtn}
                height={50}
                width={30}
                alt="back-btn"
              />
            </div>
            <Image
              priority
              src={UserImage}
              height={50}
              width={50}
              alt="user-avatar"
            />
          </div>
          <div
            className="flex flex-1 flex-col justify-center h-full cursor-pointer"
            onClick={handleUserInfo}
          >
            Jaswal
          </div>
          <div className="flex-none pr-6">
            <div className="flex items-center">
              <div
                onClick={callSlice.incoming ? answerCall : handleInitiateCall}
                className="text-xl cursor-pointer p-2 rounded"
              >
                <Image
                  priority
                  src={callSlice.incoming ? CloseIcon : Audio}
                  height={30}
                  width={20}
                  alt="voice-call"
                />
              </div>
              <div
                onClick={handleInitiateCall}
                className=" text-xl cursor-pointer p-2 rounded"
              >
                <Image
                  priority
                  src={Video}
                  height={30}
                  width={20}
                  alt="video-call"
                />
              </div>
              <div className=" text-xl cursor-pointer p-2 rounded">
                {/* <Image
                  priority
                  src={SearchIcon}
                  height={30}
                  width={20}
                  alt="user-avatar"
                /> */}
                {/* <input
                  type="text"
                  placeholder="1"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    dispatch(updateCallState({ callObj: e.target.value }));
                  }}
                /> */}
              </div>
              <div className="ml-1 text-xl cursor-pointer p-2">
                <Image
                  priority
                  src={MenuIcon}
                  height={30}
                  width={20}
                  alt="user-avatar"
                />
              </div>
            </div>
          </div>
        </header>
        <ChatHistory parentWidth={parentWidth} />
      </div>
      <div
        className={`${
          historyProps.userInfo
            ? "flex w-[40%] flex-col bg-white ease-in-out"
            : "hidden"
        }`}
      >
        <div className="flex items-center bg-red-100 sticky top-[63px] w-full h-[8vh] min-h-[62px]">
          <div className="px-4 text-xl cursor-pointer" onClick={closeProfile}>
            <Image
              priority
              src={CloseIcon}
              height={50}
              width={30}
              alt="user-avatar"
            />
          </div>
          User Detail
        </div>
        <UserInfo item={1} />
      </div>
    </div>
  );
}

export default ChatHeader;
