'use client'
import React from "react";
import MessageInput from "./MessageInput";

function ChatHistory({ parentWidth }: { parentWidth: number | null }) {
    const width = parentWidth 
    let widthStyle = width?.toFixed(0) + "px"
    console.log("width histo", widthStyle);
  return (
    <div className={`flex flex-col w-full absolute`}>
      <MessageInput parentWidth={parentWidth} />
    </div>
  );
}

export default ChatHistory;
