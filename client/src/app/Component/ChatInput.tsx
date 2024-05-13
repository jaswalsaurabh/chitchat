"use client";
import React, { useRef, useState } from "react";
import EmojiIcon from "../../assets/emoji.png";
import AttachIcon from "../../assets/attach.png";
import MicIcon from "../../assets/mic.png";
import Image from "next/image";
import { ChatState } from "@/store/chatSlice";
import socketConnection from "../_lib/socket";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

function ChatInput({
  chatState,
}: {
  parentWidth: number | null;
  chatState: ChatState;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    const val = evt.target?.value;
    setMessage(val);
  };

  const messageObj = {
    sender: chatState.sender,
    receiver: chatState.receiver,
    chatType: chatState.chatType,
    kind: "TEXT",
    body: message.trim(),
    chatId: chatState.currChatId,
    route: "message",
  };

  const [rows, setRows] = useState(1);

  const [emoji, setEmoji] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const newLineCount = (message.match(/\n/g) || []).length + 1;
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setMessage(message + "\n");
      setRows(newLineCount > 4 ? 4 : newLineCount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setMessage("");
      if (messageObj.body.length > 0) {
        socketConnection.emit("message", { ...messageObj });
      }
    }
  };

  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <div
      className={`flex items-center justify-center w-full fixed bottom-0 mb-10`}
    >
      <div className={`flex w-[80%] lg:w-1/2 items-center rounded-md`}>
        <div className="flex w-[91%] items-center bg-white rounded-md">
          <div
            onClick={handleEmoji}
            className="flex px-1 w-[36px] justify-center  cursor-pointer py-3 rounded-md"
          >
            <Image
              priority
              src={EmojiIcon}
              height={50}
              width={30}
              alt="emoji"
            />
          </div>
          <div className="absolute bottom-12">
            <EmojiPicker open={emoji} onEmojiClick={onEmojiClick} />
          </div>
          <div className="flex items-center w-full py-2">
            <TextareaAutosize
              ref={textAreaRef}
              className="w-full outline-none border-none resize-none"
              placeholder="Send a message..."
              cacheMeasurements
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              rows={rows}
              maxRows={4}
            />
          </div>
          <div className="flex px-1 lg:px-3 w-[36px]justify-center cursor-pointer py-3 rounded-md">
            <Image
              priority
              src={AttachIcon}
              height={50}
              width={30}
              alt="attachments"
            />
          </div>
        </div>
        <div className="flex w-[36px] ml-2 bg-cyan-500 py-2 justify-center cursor-pointer rounded-[50%]">
          <Image priority src={MicIcon} height={20} width={20} alt="mic" />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
