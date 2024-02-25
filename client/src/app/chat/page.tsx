import Image from "next/image";
import ChatCover from "../../assets/cover.png";
import ChatInfo from "../Component/ChatInfo";

export default function Page() {
  const length = 15;
  const filledArray = Array.from({ length }, (_, index) => index + 1);
  return (
    <div className="flex flex-col absolute ">
      <div className="flex h-[8vh] min-h-[63px] sticky top-0">
        <div className="flex justify-center items-center">
          <h1 className="ml-4 text-2xl font-sans">Messages</h1>
        </div>
      </div>
      <div className="flex h-[92vh] w-full">
        <div className="flex flex-col border border-solid overflow-y-scroll w-full lg:w-[35%]">
          {filledArray.map((item, index) => (
            <>
              {index == 0 && (
                <div key={item} className="p-3">
                  <input
                    key={item}
                    type="text"
                    placeholder="Search..."
                    className="p-2 pl-4 w-[100%] outline-none text-sm bg-slate-100 border border-solid rounded-full"
                  />
                </div>
              )}
              <ChatInfo item={index} />
            </>
          ))}
        </div>
        <div className="lg:flex w-full h-full bg-orange-200 hidden">
          <Image priority src={ChatCover} alt="chatcover" />
        </div>
      </div>
    </div>
  );
}
