import React, { useState, useRef } from "react";
import Modal from "react-modal";
import "./dropdown.css";
import Image from "next/image";
import User from "../../assets/user.svg";

const customStyles = {
  content: {
    right: 0,
    bottom: 0,
    width: "25%",
    height: "25%",
    margin: "20px",
    transform: "none",
  },
  overlay: {
    transform: "none",
    backgroundColor: "none",
  },
};

Modal.setAppElement("#chat");

const ModalComp: React.FC = () => {
  const subtitle = useRef<HTMLHeadingElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        className="content"
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex w-full justify-between p-2">
            <Image priority src={User} height={50} width={50} alt="User" />
            <div className="flex flex-col w-full">
              <h1>Romeo Juliet</h1>
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
            <button
              className=" bg-red-600 mt-2 rounded p-2"
              onClick={closeModal}
            >
              Reject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComp;
