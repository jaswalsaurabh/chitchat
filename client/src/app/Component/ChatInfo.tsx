"use client";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import React from "react";
import { useRouter } from "next/navigation";

function ChatInfo({ item }: { item: number }) {
  const router = useRouter();
  const handleClick = () => {
    // Your onClick handler logic
    // console.log('item>>',item);
    
    router.push("/chat/123" + item);
  };
  return (
    <div
      className="flex items-center cursor-pointer w-full h-auto bg-white p-2 border-t border-slate-50s hover:bg-slate-100 hover:border-none"
      onClick={() => handleClick()}
    >
      <div className="w-20">
        <Image
          priority
          src={UserImage}
          height={50}
          width={50}
          alt="user-avatar"
        />
      </div>
      <div className="flex flex-col w-60">
        <p className="font-semibold">Saurabh Jaswal</p>
        <p>How are you bro?</p>
      </div>
      <div className="flex w-20">
        <p>3 min</p>
      </div>
    </div>
  );
}

export default ChatInfo;
