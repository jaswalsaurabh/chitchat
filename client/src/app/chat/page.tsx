import Image from "next/image";
import ChatCover from "../../assets/cover.png";
import Logo from "../../assets/mess-logo.svg";
import ChatInfo from "../Component/ChatInfo";

export default function Page() {
  const length = 15;
  const filledArray =
    Array.from(
      { length },
      (_, index) =>
        index + 1,
    );
  return (
    <div className="flex flex-col">
      <div className="flex h-[8vh] sticky top-0 bg-blue-300 px-2">
        <div className="flex justify-center items-center">
          <Image
            src={
              Logo
            }
            alt="logo"
            height={
              50
            }
            width={
              50
            }
          />
          <h1 className="font-semibold text-2xl" >
            Chit
            Chat
          </h1>
        </div>
      </div>
      <div className="flex h-[93vh] w-full">
        <div className="flex w-[35%] flex-col bg-violet-200 border border-solid overflow-y-scroll">
          {filledArray.map(
            (
              item,
            ) => (
              <>
                <ChatInfo />
              </>
            ),
          )}
        </div>
        <div className="flex w-full h-full bg-orange-200">
          <Image
            src={
              ChatCover
            }
            alt="chatcover"
          />
        </div>
      </div>
    </div>
  );
}
