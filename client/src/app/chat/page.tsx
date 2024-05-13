"use client";
import Image from "next/image";
import ChatCover from "../../assets/cover.png";
import { useEffect } from "react";
import socketConnection from "../_lib/socket";
import { MessageEntry, addChatMessage } from "@/store/chatSlice";
import { MESSAGE, MSG_KIND } from "../enum";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();

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
        msgStatus: MESSAGE.DELIVERED,
        receiver: data.data.sender,
      });
    }
    dispatch(addChatMessage(data.data));
  };

  useEffect(() => {
    socketConnection.on("received", receiveHandler);
    return () => {
      socketConnection.off("received", receiveHandler);
    };
  }, []);
  return (
    <div className="lg:flex w-full h-full bg-orange-200 hidden">
      <Image priority src={ChatCover} alt="chatcover" />
    </div>
  );
}
