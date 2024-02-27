import ChatInfo from "@/app/Component/ChatInfo";
import Image from "next/image";
import UserImage from "../../assets/user.svg";
import Notification from "../../assets/notify.svg";
import Modal from "../Component/Modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const length = 15;
  const filledArray = Array.from({ length }, (_, index) => index + 1);
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
              <Modal/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[92vh] w-full">
        <div className="flex flex-col border border-slate-50 overflow-y-scroll w-full lg:w-[35%]">
          {filledArray.map((item, index) => (
            <>
              {index == 0 && (
                <div key={item} className="p-3 sticky border-b bg-white top-0">
                  <input
                    key={item}
                    type="text"
                    placeholder="Search..."
                    className="p-2 pl-4 w-[100%] outline-none text-sm bg-slate-100 border border-solid rounded-full"
                  />
                </div>
              )}
              <ChatInfo item={item} />
            </>
          ))}
        </div>
        <div className="lg:flex w-full h-full bg-orange-200 hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
