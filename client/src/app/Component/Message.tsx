import { ChatState, MessageEntry, addChatMessage } from "@/store/chatSlice";
import React, { useEffect } from "react";
import socketConnection from "../_lib/socket";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE, MSG_KIND } from "../enum";
import { ReduxState } from "@/store/store";

function Message({ chatState }: { chatState: ChatState }) {
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
        chatId: chatState.currChatId,
        messageId: data.data.id,
        msgStatus: MESSAGE.DELIVERED,
        receiver: data.data.sender,
      });
    }
    dispatch(addChatMessage(data.data));
  };

  const handleAcknowledgement = (data: any) => {
    console.log("this is data acknowledge", data);
    // dispatch(addChatMessage(data.data));
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
  }, []);

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
      {chatState.chatHistory.data.map((item, index) => (
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
      ))}
    </div>
  );
}

export default Message;
