'use client'
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter()

  function handleClick(){
    router.push('/login')
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex flex-col border border-solid p-3 rounded">
          <div className="flex flex-col p-3">
            <h1 className="text-center text-4xl my-2">Sign up to Chit Chat</h1>
            <p className="text-center mt-2">
              Already have an account?{" "}
              <span onClick={handleClick} className="font-semibold text-blue-600 cursor-pointer">
                Login
              </span>
            </p>
          </div>
          <div className="flex flex-col my-4 p-3">
            <input
              className="px-3 p-2 border-2 border-solid my-2 rounded"
              type="text"
              placeholder="Name"
            />
            <input
              className="px-3 p-2 border-2 border-solid my-2 rounded"
              type="email"
              placeholder="Email"
            />
            <input
              className="px-3 p-2 border-2 border-solid my-2 rounded"
              type="password"
              placeholder="Password"
            />
            <input
              className="px-3 p-2 border-2 border-solid my-2 rounded"
              type="text"
              placeholder="Confirm Password"
            />

            <button className="px-3 p-2 border-2 border-blue-600 bg-blue-600 text-white border-solid my-4 rounded">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
