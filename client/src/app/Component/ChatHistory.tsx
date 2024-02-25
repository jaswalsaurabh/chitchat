import React from "react";
import MessageInput from "./MessageInput";

function ChatHistory() {
  return (
    <div className="flex flex-col w-full" >
      <MessageInput />
    </div>
  );
}

export default ChatHistory;
