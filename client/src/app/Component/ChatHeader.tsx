"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import SearchIcon from "../../assets/search.png";
import MenuIcon from "../../assets/menu.png";
import CloseIcon from "../../assets/close.svg";
import UserInfo from "@/app/Component/UserInfo";
import ChatHistory from "./ChatHistory";

function ChatHeader() {
  const [historyProps, setHistoryProps] = useState({
    userInfo: false,
    search: false,
  });
  function handleUserInfo() {
    setHistoryProps({ ...historyProps, userInfo: true });
  }
  function closeProfile() {
    setHistoryProps({ ...historyProps, userInfo: false });
  }
  //   const parentWidth = useRef<number | null>(null);
  const [parentWidth, setParentWidth] = useState<number | null>(null);
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
  return (
    <div className="flex flex-row w-full">
      {" "}
      <div
        id="flexDiv"
        className={`flex flex-col items-center ${
          historyProps.userInfo ? "flex w-[60%]" : "w-full"
        } h-[92vh] bg-amber-200`}
      >
        <header className="bg-sky-200 flex flex-row items-center w-full h-[8vh] min-h-[62px]">
          <div className="flex-none px-6 cursor-pointer">
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
              <div className="relative text-xl cursor-pointer p-2 rounded">
                <Image
                  priority
                  src={SearchIcon}
                  height={30}
                  width={20}
                  alt="user-avatar"
                />
              </div>
              <div className="relative ml-1 text-xl cursor-pointer p-2">
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
        <div className="flex items-center bg-red-100 w-full h-[8vh] min-h-[62px]">
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
