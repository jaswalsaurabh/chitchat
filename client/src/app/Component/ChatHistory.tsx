"use client";
import React from "react";
import MessageInput from "./MessageInput";

function ChatHistory({ parentWidth }: { parentWidth: number | null }) {
  const width = parentWidth;
  let widthStyle = width?.toFixed(0) + "px";
  console.log("width histo", widthStyle);
  return (
    <div className="flex items-center justify-center flex-col w-full" >
      <div className={`flex flex-col w-[90%]`}>
        <div className="self-start bg-green-100 max-w-[65%]">
          <div className="inline-flex self-start w-auto bg-white">
            <p className="">Hello bro kya kr rha hai</p>
            <span className="text-sm pl-2 pt-4">12:23</span>
          </div>
        </div>
        <div className="self-end bg-green-100 max-w-[65%]">
          <div className="inline-flex self-start w-auto bg-white">
            <p className="">Hello bro kya kr rha hai</p>
            <span className="text-sm pl-2 pt-4">12:23</span>
          </div>
        </div>
      </div>
      <div className="w-full absolute">
        <MessageInput parentWidth={parentWidth} />
      </div>
    </div>
  );
}

export default ChatHistory;
