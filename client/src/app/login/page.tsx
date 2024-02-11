import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full" >
      <div className="flex flex-col w-1/2 " >
        <input
          className="px-4 border border-solid m-4 p-2"
          type="text"
          placeholder="Enter your email"
        />
        <input
          className="px-4 border border-solid m-4 p-2"
          type="text"
          placeholder="Password"
        />
        <button className="border border-solid border-green-400 m-4 p-2" >
          Login
        </button>
      </div>
    </div>
  );
}
