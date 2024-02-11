import Image from "next/image";
import UserImage from "../../assets/user.svg";
import React from "react";

function ChatInfo() {
  return (
    <div className="flex items-center cursor-pointer w-full h-auto bg-white p-2 border border-solid">
      <div className="w-20">
        <Image
          src={
            UserImage
          }
          height={50}
          width={50}
          alt="user-avatar"
        />
      </div>
      <div className="flex flex-col w-60">
        <p className="font-semibold">
          Saurabh
          Jaswal
        </p>
        <p>
          How are
          you bro?
        </p>
      </div>
      <div className="flex w-20">
        <p>3 min</p>
      </div>
    </div>
  );
}

export default ChatInfo;
