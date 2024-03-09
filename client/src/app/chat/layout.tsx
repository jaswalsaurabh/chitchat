"use client";
import ChatInfo from "@/app/Component/ChatInfo";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import Notification from "../../assets/notify.svg";
import Audio from "../../assets/audio-call.svg";
import Video from "../../assets/video-call.svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCallState } from "@/store/callSlice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const length = 15;
  const filledArray = Array.from({ length }, (_, index) => index + 1);
  const pathname = usePathname();
  const pathLength = pathname.split("/");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // console.log("this is pathname", pathLength);
  const dispatch = useDispatch()
  const callSlice = useSelector((state: any) => state.CallSlice);
  
  console.log("this is callSlice>>", callSlice);
  const getStream = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });
    setLocalStream(stream);
    if (videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  useEffect(() => {
    if (callSlice.isCalling) {
      getStream();
    }
  }, [callSlice.isCalling]);

  const handleCall = () => {
    if (videoRef.current) {
      const tracks = localStream?.getTracks();
      tracks?.forEach((track) => track.stop());

      videoRef.current.srcObject = null;
      dispatch(updateCallState({ isCalling: false }));
    }
  };

  if (!callSlice.isCalling) {
    return (
      <div className="flex flex-col">
        <div className="flex h-[8vh] min-h-[63px] sticky top-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <h1 className="ml-4 text-2xl font-sans">Messages</h1>
            </div>
            <div className="flex">
              {/* <div className="flex mr-2 border-2 border-solid border-slate-500 rounded-md">
              <input
                className="py-1 px-3 outline-none border-none"
                type="text"
                placeholder="Search...."
              />
            </div> */}
              <div className="flex cursor-pointer">
                <Image
                  priority
                  src={Notification}
                  height={20}
                  width={40}
                  alt="user-avatar"
                />
              </div>
              <div className="flex mt-2 mx-2 cursor-pointer">
                <Image
                  priority
                  src={UserImage}
                  height={50}
                  width={50}
                  alt="user-avatar"
                />
                {/* <Modal/> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[92vh] w-full">
          <div
            className={`flex flex-col border border-slate-50 w-full ${
              pathLength.length == 3 && "hidden lg:flex"
            } lg:w-[26%]`}
          >
            <div className="p-3 sticky border-y bg-white top-0">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 pl-4 w-[100%] outline-none text-sm bg-slate-100 border border-solid rounded-full"
              />
            </div>
            <div className="flex flex-col overflow-y-scroll">
              {filledArray.map((item) => (
                <ChatInfo key={item} item={item} />
              ))}
            </div>
          </div>
          <div className={`lg:flex w-full h-full hidde`}>{children}</div>
        </div>
      </div>
    );
  }
  if (callSlice.isCalling) {
    return (
      <div className=" bg-[#202325] flex flex-col absolute w-full text-white h-screen">
        {/* <div className="flex min-h-[10px] justify-between"></div> */}

        <div className="flex mt-5 relative w-auto h-[60%] mx-5">
          <div className="flex flex-col flex-1 border relative mx-5 rounded-2xl border-green-400">
            <div className="h-[10%] absolute right-0 flex items-center justify-end mx-2">
              Extra
            </div>
            <div className="h-[100%] relative flex justify-center items-center">
              <video
                className="relative h-full aspect-video"
                ref={videoRef}
                autoPlay
              />
            </div>
            <div className="flex h-[10%] absolute bottom-0 w-full items-center justify-between ">
              <h1 className="relative right-0 mx-2">Michael Smyth</h1>
              <h2 className="relative left-0 mx-2">Mic</h2>
            </div>
          </div>
        </div>

        <div className="flex h-[20%] justify-end mr-5">
          <div className="flex relative h-full w-[20%] rounded-2xl my-4 mr-5 flex-col border border-green-500">
            <div className="flex items-center h-full justify-center">
              {/* <video className="relative h-full aspect-video" ref={videoRef} autoPlay /> */}
            </div>
            <div className="flex absolute right-0 bottom-0 justify-end mr-2">
              Me
            </div>
          </div>
        </div>

        <div className="bottom-0 flex-1 w-full py-2 items-center flex justify-around">
          <div className="flex">
            <h1>34:12</h1>
          </div>
          <div className="flex">
            <h1>Mute</h1>
          </div>
          <div className="flex">
            <h1>Stop Video</h1>
          </div>
          <div className="flex">
            <h1>Raise Hand</h1>
          </div>
          <div className="flex">
            <h1>Share Screen</h1>
          </div>
          <div className="flex">
            <h1>Start Record</h1>
          </div>
          <div className="flex">
            <h1>More</h1>
          </div>
          <div
            onClick={handleCall}
            className="flex bg-red-700 cursor-pointer h-[40%] p-4 items-center rounded"
          >
            End Call
          </div>
        </div>
      </div>
    );
  }
}
