"use client";
import React from "react";
import MessageInput from "./MessageInput";
import Message from "./Message";

function ChatHistory({ parentWidth }: { parentWidth: number | null }) {
  const width = parentWidth;
  let widthStyle = width?.toFixed(0) + "px";
  console.log("width histo", widthStyle);
  return (
    <div className="flex items-center flex-col h-full w-full overflow-y-hidden">
      <Message />
      <div className="w-full absolute">
        <MessageInput parentWidth={parentWidth} />
      </div>
    </div>
  );
}

export default ChatHistory;
