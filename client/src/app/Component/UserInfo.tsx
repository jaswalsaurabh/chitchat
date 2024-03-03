"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import UserImage from "../../assets/user.svg";

function UserInfo({ item }: { item: number }) {
  const router = useRouter();
  const handleClick = () => {
    // Your onClick handler logic
    // console.log("item>>", item);

    router.push("/chat/123" + item);
  };
  return (
    <div className="flex flex-col items-center bg-slate-50 h-[84vh]">
      <div className="flex flex-col items-center mt-4 h-1/2">
        <Image
          priority
          src={UserImage}
          height={150}
          width={150}
          alt="user-avatar"
        />
        <p>Saurabh Jaswal</p>
        <div>
          <p>Active 3 minutes ago</p>
        </div>
      </div>
      <div className="flex flex-col w-full bg-cyan-100 h-1/2">
        <div>
          <p>Email</p>
          <p>jaswal@hotmail.com</p>
        </div>
        <div>
          <p>Media</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
