import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[50%] ">
        <div className="flex flex-col">
          <h1 className="text-center text-4xl mb-4">
            Log in to
            <span className="ml-1 font-semibold">Chit Chat</span>
          </h1>
        </div>
        <div className="flex flex-col my-4 px-3">
          <input
            className="px-4 border-2 border-solid border-slate-400 rounded my-4 p-2"
            type="text"
            placeholder="Enter your email"
          />
          <input
            className="px-4 border-2 border-solid border-slate-400 rounded my-4 p-2"
            type="text"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col px-3">
          <div className="flex justify-between">
            <div className="w-auto flex justify-evenly cursor-pointer">
              <input
                id="checkbox"
                type={"checkbox"}
                className="cursor-pointer"
              />
              <label className="cursor-pointer ml-1" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <p className="cursor-pointer underline text-blue-600">
              Forgot Password?
            </p>
          </div>
          <button className="border-2 border-solid rounded bg-blue-600 text-white border-blue-600 my-4 p-2">
            Sign In
          </button>
        </div>
        {/* <div className="flex flex-col w-full px-3">
          <div className="flex flex-row justify-between items-center">
            <hr className="border w-full border-t-[1px] border-gray-400" />
            <span className="px-2">or</span>
            <hr className="border w-full border-t-[1px] border-gray-400" />
          </div>
          <div className="flex border-2 border-solid cursor-pointer border-red-400 p-2 rounded items-center justify-center mt-4">
            <span>Log in with Google</span>
          </div>
          <div className="flex border-2 mt-4 border-solid cursor-pointer border-blue-400 p-2 rounded items-center justify-center">
            <span>Log in with Meta</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
