import React from "react";

function MessageInput() {
  return (
    <div className="flex items-center justify-center w-full fixed bottom-0 mb-10">
      <div className="flex w-1/2 bg-white">
        <div className="px-4">
            Emoji
        </div>
        <input
          className="p-1 ml-4 outline-none border-none"
          autoFocus
          type="text"
          placeholder="Type a message.."
        />
      </div>
    </div>
  );
}

export default MessageInput;
