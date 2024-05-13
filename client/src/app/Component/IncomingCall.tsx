import React, { useState } from "react";
import User from "../../assets/user.svg";
import Image from "next/image";

const IncomingCall: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`${
        modalIsOpen ? "block" : "hidden"
      } absolute bottom-10 right-10 bg-gray-800 w-1/4 rounded-lg`}
    >
      <div className="flex flex-col min-h-[235px] justify-center items-center">
        <div className="flex w-full justify-between p-2">
          <Image priority src={User} height={50} width={50} alt="User" />
          <div className="flex flex-col w-full">
            <h1 className="text-white">Romeo Juliet</h1>
            <p className="text-gray-400 text-sm">is now calling...</p>
          </div>
        </div>
        <div className="flex flex-col w-full p-2">
          <button
            className=" bg-teal-500 mt-2 rounded p-2"
            onClick={closeModal}
          >
            Accept
          </button>
          <button className=" bg-red-600 mt-2 rounded p-2" onClick={closeModal}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
