import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-green-100">
      {/* <div>
        <h1>Hello</h1>
      </div> */}
      <div className="flex flex-col w-1/2 ">
        <div className="flex flex-col">
          <h1 className="text-center mb-4">Sign in to your Account</h1>
        </div>
        <div className="flex flex-col my-4">
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
        </div>
        <div>
          <div className="flex justify-between">
            <div className="w-[20%] flex justify-evenly cursor-pointer">
              <input
                id="checkbox"
                type={"checkbox"}
                className="cursor-pointer"
              />
              <label className="cursor-pointer" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <p className="cursor-pointer">Forgot Password?</p>
          </div>
        </div>
        <button className="border border-solid border-green-400 m-4 p-2">
          Sign In
        </button>
      </div>
    </div>
  );
}
