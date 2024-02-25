import ChatInfo from "@/app/Component/ChatInfo";
import { Inter } from "next/font/google";

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
        <div className="flex justify-center items-center">
          <h1 className="ml-4 text-2xl font-sans">Messages</h1>
        </div>
      </div>
      <div className="flex h-[92vh] w-full">
        <div className="flex flex-col border border-slate-50 overflow-y-scroll w-full lg:w-[35%]">
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
