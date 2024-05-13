import {
  ChatState,
  MessageEntry,
  addChatMessage,
  updateChatHistory,
  updateState,
} from "@/store/chatSlice";
import React, { useEffect } from "react";
import socketConnection from "../_lib/socket";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE, MSG_KIND } from "../enum";
import { ReduxState } from "@/store/store";
import { Acknowledgement } from "@/types/chatTypes";
import Message from "./Message";

function ChatHistory({ chatState }: { chatState: ChatState }) {
  const currUser = chatState.sender?.userId;
  const dispatch = useDispatch();

  const messageHandler = (data: { data: MessageEntry }) => {
    dispatch(addChatMessage(data.data));
  };

  const receiveHandler = (data: { data: MessageEntry }) => {
    if (
      data.data.kind == MSG_KIND.TEXT ||
      data.data.kind == MSG_KIND.DOCUMENT ||
      data.data.kind == MSG_KIND.AUDIO ||
      data.data.kind == MSG_KIND.VIDEO ||
      data.data.kind == MSG_KIND.IMAGE
    ) {
      socketConnection.emit("acknowledge", {
        chatId: data.data.chatId,
        messageId: data.data.id,
        msgStatus: MESSAGE.SEEN,
        receiver: data.data.sender,
      });
    }
    dispatch(addChatMessage(data.data));
  };
  // const reduxState = useSelector((state) => state);
  const ChatState = useSelector((state: ReduxState) => state.ChatSlice);

  // console.log("chatState",chatState);

  const handleAcknowledgement = (data: Acknowledgement) => {
    const tempState = [...ChatState.chatHistory.data];
    const newData = tempState.map((item) => {
      let newItem = { ...item };
      if (newItem.id === data.messageId) {
        newItem.msgStatus = data.msgStatus;
        return newItem;
      }
      return newItem;
    });
    dispatch(updateChatHistory({ data: newData }));
  };

  useEffect(() => {
    socketConnection.on("received", receiveHandler);
    socketConnection.on("acknowledge", handleAcknowledgement);
    socketConnection.on("sent", messageHandler);
    return () => {
      socketConnection.off("received", receiveHandler);
      socketConnection.off("acknowledge", handleAcknowledgement);
      socketConnection.off("sent", messageHandler);
    };
  }, [ChatState]);

  const AuthSlice = useSelector((state: ReduxState) => state.AuthSlice);

  useEffect(() => {
    let scrollDiv = document.getElementById("scrollDiv");
    if (scrollDiv) {
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }
  }, [chatState.chatHistory]);

  return (
    <div
      id="scrollDiv"
      className={`flex flex-col mt-4 h-[82%] w-full px-10 overflow-y-scroll`}
    >
      {chatState.chatHistory.data.map((item) => (
        <Message
          key={item.id}
          item={item}
          currUser={currUser}
          AuthSlice={AuthSlice}
        />
      ))}
    </div>
  );
}

export default ChatHistory;
