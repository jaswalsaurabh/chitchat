"use client";
import { MessageEntry } from "@/store/chatSlice";
import React, { useEffect } from "react";
import { MESSAGE, MSG_KIND } from "../enum";
import { AuthState } from "@/store/authSlice";
import socketConnection from "../_lib/socket";

function Message({
  item,
  currUser,
  AuthSlice,
}: {
  item: MessageEntry;
  currUser: string | undefined;
  AuthSlice: AuthState;
}) {
  useEffect(() => {
    if (item.msgStatus !== MESSAGE.SEEN && item.receiver.userId === currUser) {
      if (
        item.kind == MSG_KIND.TEXT ||
        item.kind == MSG_KIND.DOCUMENT ||
        item.kind == MSG_KIND.AUDIO ||
        item.kind == MSG_KIND.VIDEO ||
        item.kind == MSG_KIND.IMAGE
      ) {
        socketConnection.emit("acknowledge", {
          chatId: item.chatId,
          messageId: item.id,
          msgStatus: MESSAGE.SEEN,
          receiver: item.sender,
        });
      }
    }
  }, []);

  return (
    <div
      key={item.id}
      className={`${
        item.sender.userId === currUser ? "self-end" : "self-start"
      } max-w-[65%] rounded-tl-none rounded-md`}
    >
      <div className="inline-flex w-auto bg-white px-2 py-1 my-1 rounded-tl-none rounded-md">
        <p className="">{item.body}</p>
        <span className="text-xs pl-2 pt-4">
          {new Date(Number(item.createdAt)).toLocaleDateString()}
        </span>
        {item.receiver.userId != AuthSlice.authObj?.sub && (
          <>
            {item.msgStatus === MESSAGE.SENT && <span>✓</span>}
            {item.msgStatus === MESSAGE.DELIVERED && <span>✓✓</span>}
            {item.msgStatus === MESSAGE.SEEN && <span>✓✓✓</span>}
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
