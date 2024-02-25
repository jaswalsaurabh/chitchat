"use client";
import ChatHeader from "@/app/Component/ChatHeader";
import React, { useState } from "react";
// import UserImage from "../../assets/user.svg";

export default function Page({ params }: { params: { id: string } }) {
  const [historyProps, setHistoryProps] = useState({
    userInfo: false,
    search: false,
  });
  function handleUserInfo() {
    setHistoryProps({ ...historyProps, userInfo: true });
  }
  function closeProfile() {
    setHistoryProps({ ...historyProps, userInfo: false });
  }
  return (
    <div className={"flex flex-col w-full bg-amber-200"}>
      <ChatHeader />
    </div>
  );
}
