import React from "react";

function Message() {
  const length = 35;
  const filledArray = Array.from({ length }, (_, index) => index + 1);
  return (
    <div
      className={`flex flex-col mt-4 h-[82%] w-full px-10 overflow-y-scroll`}
    >
      {filledArray.map((item) => (
        <div
          key={item}
          className={`${
            item % 2 == 0 ? "self-end" : "self-start"
          } bg-green-100 max-w-[65%]`}
        >
          <div className="inline-flex w-auto bg-white">
            <p className="">Hello bro kya kr rha hai {item}</p>
            <span className="text-sm pl-2 pt-4">12:23</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Message;
