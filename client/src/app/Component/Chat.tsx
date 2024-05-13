"use client";
import React from "react";
import ChatInput from "./ChatInput";
import Message from "./ChatHistory";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store/store";
import Modal from "./IncomingCall";

function ChatHistory({ parentWidth }: { parentWidth: number | null }) {
  const width = parentWidth;
  // console.log("width histo", widthStyle);
  const ChatSlice = useSelector((state: ReduxState) => state.ChatSlice);
  // console.log("reduxState", ChatSlice);

  return (
    <div className="flex items-center flex-col h-full w-full overflow-y-hidden">
      <Message chatState={ChatSlice} />
      <div className="w-full absolute">
        <ChatInput parentWidth={parentWidth} chatState={ChatSlice} />
      </div>
    </div>
  );
}

export default ChatHistory;
