import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[80%]">
        <div className="flex flex-col">
          <h1 className="text-center text-4xl  capitalize mb-4">
            Hello friend
          </h1>
          <p className=" text-center">
            Fill up your personal information & start engaging <br /> with your
            friends
          </p>
        </div>
        <div className="flex flex-col my-4 px-3">
         <button className=" border border-solid mt-4 p-2 rounded" >Sign Up</button>
        </div>
      </div>
    </div>
  );
}
