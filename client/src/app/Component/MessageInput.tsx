"use client";
import React from "react";
import EmojiIcon from "../../assets/emoji.png";
import AttachIcon from "../../assets/attach.png";
import MicIcon from "../../assets/mic.png";
import Image from "next/image";

function MessageInput({ parentWidth }: { parentWidth: number | null }) {
  const width = parentWidth;
  let widthStyle = width + "px";
  console.log("width input", widthStyle);

  return (
    <div
      className={`flex items-center justify-center w-full fixed bottom-0 mb-10`}
    >
      <div className={`flex w-1/2 items-center rounded-md`}>
        <div className="flex w-[91%] items-center bg-white rounded-md">
        <div className="flex px-4 w-[9%] justify-center cursor-pointer py-3 rounded-md">
        <Image
            priority
            src={EmojiIcon}
            height={50}
            width={30}
            alt="user-avatar"
          />
        </div>
        <input
          className="p-3 ml-4 w-[91%] outline-none border-none"
          autoFocus
          type="text"
          placeholder="Type a message.."
        />
        </div>
        <div className="flex w-[5%] ml-2 bg-cyan-500 py-2 justify-center cursor-pointer rounded-[50%]">
          <Image
            priority
            src={MicIcon}
            height={20}
            width={20}
            alt="user-avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
