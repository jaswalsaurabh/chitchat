"use client";
import React, { useRef, useState } from "react";
import EmojiIcon from "../../assets/emoji.png";
import AttachIcon from "../../assets/attach.png";
import MicIcon from "../../assets/mic.png";
import Image from "next/image";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

function ChatInput({ parentWidth }: { parentWidth: number | null }) {
  const width = parentWidth;
  let widthStyle = width + "px";
  console.log("width input", widthStyle);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");

  useAutosizeTextArea(textAreaRef.current, message);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setMessage(val);
  };

  return (
    <div
      className={`flex items-center justify-center w-full fixed bottom-0 mb-10`}
    >
      <div className={`flex w-1/2 items-center rounded-md`}>
        <div className="flex w-[91%] items-center bg-white rounded-md">
          <div className="flex px-4 w-[9%] justify-center  cursor-pointer py-3 rounded-md">
            <Image
              priority
              src={EmojiIcon}
              height={50}
              width={30}
              alt="user-avatar"
            />
          </div>
          <div className="flex items-center w-full py-2">
            {/* <textarea
            className="p-0 m-0 w-full outline-none border-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message.."
          /> */}
            <textarea
              className="w-full outline-none border-none resize-none"
              onChange={handleChange}
              placeholder="Type a message.."
              ref={textAreaRef}
              value={message}
            />
          </div>
          <div className="flex px-4 w-[9%] justify-center cursor-pointer py-3 rounded-md">
            <Image
              priority
              src={AttachIcon}
              height={50}
              width={30}
              alt="user-avatar"
            />
          </div>
        </div>
        <div className="flex w-[5%] ml-2 bg-cyan-500 py-2 justify-center cursor-pointer rounded-[50%]">
          <Image
            priority
            src={MicIcon}
            height={20}
            width={20}
            alt="user-avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
