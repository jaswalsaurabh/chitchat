import {
  ChatState,
  MessageEntry,
  addChatMessage,
  updateChatHistory,
  updateState,
} from "@/store/chatSlice";
import React, { useEffect } from "react";
import socketConnection from "../_lib/socket";
import { useDispatch } from "react-redux";

function Message({ chatState }: { chatState: ChatState }) {
  const currUser = chatState.sender?.userId;
  const dispatch = useDispatch();

  const messageHandler = (data: { data: MessageEntry }) => {
    console.log("this is data in handler kkkkkk", data);
    const currHistory = chatState?.chatHistory?.data;
    console.log("curr His", currHistory);
    dispatch(addChatMessage(data.data));
  };

  useEffect(() => {
    socketConnection.on("received", messageHandler);
    socketConnection.on("sent", messageHandler);
    return () => {
      socketConnection.off("received", messageHandler);
      socketConnection.off("sent", messageHandler);
    };
  }, []);

  return (
    <div
      className={`flex flex-col mt-4 h-[82%] w-full px-10 overflow-y-scroll`}
    >
      {chatState.chatHistory.data.map((item, index) => (
        <div
          key={item.id}
          className={`${
            item.sender.userId === currUser ? "self-end" : "self-start"
          } max-w-[65%] rounded-tl-none rounded-md`}
        >
          <div className="inline-flex w-auto bg-white px-2 py-1 my-1 rounded-tl-none rounded-md">
            <p className="">
              {item.body}
            </p>
            <span className="text-xs pl-2 pt-4">
              {new Date(Number(item.createdAt)).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Message;
