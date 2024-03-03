"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import awsconfig from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import { confirmSignUp, signUp } from "aws-amplify/auth";
import Image from "next/image";
import MenuIcon from "../../../assets/success.svg";

// @ts-ignore
Amplify.configure({ ...awsconfig });

export default function Page() {
  const router = useRouter();
  const [active, setActive] = useState({
    register: true,
    confirmation: false,
    success: false,
  });
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPass: "",
    otp: "",
  });

  function handleClick() {
    router.push("/login");
  }

  const handleSignUp = async (kind: string) => {
    if (kind === "register") {
      let signupParams = {
        username: userData.name,
        password: userData.password,
        options: {
          userAttributes: {
            email: userData.email,
            name: userData.name,
          },
        },
      };
      // console.log("signup Params", signupParams);

      try {
        let registerUser = await signUp(signupParams);

        setActive({ success: false, register: false, confirmation: true });
        // console.log("this is register User", registerUser);
      } catch (error) {
        console.log("this is error in register account >>", error);
      }
    } else {
      try {
        const confirmResp = await confirmSignUp({
          username: userData.name,
          confirmationCode: userData.otp,
        });
        console.log("confirm resp", confirmResp);
        setActive({ success: true, register: false, confirmation: false });
      } catch (error) {
        console.log("error confirming sign up", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // console.log("this is value", userData);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex flex-col border border-solid p-3 rounded">
          <div className="flex flex-col p-3">
            {active.success ? (
              <>
                <div className="flex flex-row items-center">
                  <h1 className="text-center text-2xl my-2">
                    Account created successfully
                  </h1>
                  <Image
                    className="ml-1"
                    priority
                    src={MenuIcon}
                    height={30}
                    width={30}
                    alt="user-avatar"
                  />
                </div>
                <p className="text-center mt-2">
                  Please{" "}
                  <span
                    onClick={handleClick}
                    className="font-semibold text-blue-600 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-center text-4xl my-2">
                  Sign up to Chit Chat
                </h1>
                <p className="text-center mt-2">
                  Already have an account?{" "}
                  <span
                    onClick={handleClick}
                    className="font-semibold text-blue-600 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </div>
          {!active.success && (
            <div className="flex flex-col my-4 p-3">
              {active.register && (
                <>
                  <input
                    className="px-3 p-2 border-2 border-solid my-2 rounded"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={userData.name}
                  />
                  <input
                    className="px-3 p-2 border-2 border-solid my-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <input
                    className="px-3 p-2 border-2 border-solid my-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <input
                    className="px-3 p-2 border-2 border-solid my-2 rounded"
                    type="text"
                    placeholder="Confirm Password"
                    value={userData.confirmPass}
                    onChange={handleChange}
                    name="confirmPass"
                  />
                </>
              )}
              {active.confirmation && (
                <>
                  <input
                    className="px-3 p-2 border-2 border-solid my-2 rounded"
                    type="text"
                    placeholder="Username"
                    value={userData.name}
                    name="confirmPass"
                    readOnly
                  />
                  <input
                    className="px-3 p-2 border-2 border-solid my-2 rounded"
                    type="password"
                    placeholder="OTP"
                    value={userData.otp}
                    onChange={handleChange}
                    name="otp"
                  />
                </>
              )}

              {active.success && (
                <>
                  <p>
                    {" "}
                    Account created Successfully
                    <span>Login</span>
                  </p>
                </>
              )}

              <button
                className="px-3 p-2 border-2 border-blue-600 bg-blue-600 text-white border-solid my-4 rounded"
                onClick={() =>
                  handleSignUp(active.register ? "register" : "confirm")
                }
              >
                {active.register ? "Register Account" : "Confirm Account"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
