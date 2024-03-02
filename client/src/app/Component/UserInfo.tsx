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
    <div className="flex flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center justify-center mt-4">
        <Image
          priority
          src={UserImage}
          height={150}
          width={150}
          alt="user-avatar"
        />
        <p>Jaswal</p>
      </div>
    </div>
  );
}

export default UserInfo;
