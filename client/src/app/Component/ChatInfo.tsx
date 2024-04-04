"use client";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import React from "react";
import { useRouter } from "next/navigation";
import {
  ChatEntry,
  fetchChatHistory,
  updateChatDetails,
} from "@/store/chatSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

function ChatInfo({ item, index }: { item: ChatEntry; index: number }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    // dispatch(updateState({ key: "receiver", value: item.chatDetail }));
    dispatch(
      updateChatDetails({
        receiver: item.chatDetail,
        currChatId: item.chatId,
        chatType: item.chatType,
      })
    );
    dispatch(fetchChatHistory(item.chatId));
    router.push("/chat/123" + item.chatId);
  };
  return (
    <div
      className={`flex items-center cursor-pointer w-full h-auto bg-white p-2 ${
        index == 0 ? "border-none" : "border-t border-slate-200"
      } hover:bg-slate-100`}
      onClick={handleClick}
    >
      <div className="w-20 mt-1">
        <Image
          priority
          src={UserImage}
          height={50}
          width={50}
          alt="user-avatar"
        />
      </div>
      <div className="flex flex-col w-60">
        <p className="font-semibold">{item.chatDetail.name}</p>
        <p>How are you bro?</p>
      </div>
      <div className="flex w-20 text-sm">
        <p>{new Date(Number(item.updatedAt) * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default ChatInfo;
