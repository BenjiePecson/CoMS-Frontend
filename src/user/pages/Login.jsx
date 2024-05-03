import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    window.open(
      `${import.meta.env.VITE_VERCEL_SERVER_URL}/auth/google`,
      "_self",
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token != null && token != undefined) {
      navigate("/company");
    }
  });

  return (
    <>
      <div className="flex flex-row w-full min-h-screen justify-center min-w-screen">
        <div className="w-full md:w-2/5 px-[50px] mt-64">
          <div className="text-center text-color-1">
            <h1 className="poppins-medium text-[24px]">
              Login to your Account
            </h1>
            <span className="poppins-regular text-[16px]">
              Don't have an account?
            </span>{" "}
            <span className="poppins-semibold text-[16px] text-[#5A67BA] underline">
              Sign Up
            </span>
          </div>
          {/* <Link to={"/company"}> */}
          <button
            className="poppins-regular text-color-1 w-full bg-white h-[61px] mx-auto text-center border border-[#70746F] rounded-xl flex flex-row justify-center gap-2 items-center mt-10"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            <img
              className="bg-inherit align-middle"
              src="/google.svg"
              alt="Google Logo"
            />
            Google
          </button>
          {/* </Link> */}
        </div>
        <div className="w-full bg-white hidden md:flex">
          <img
            className="w-[80%] mx-auto bg-inherit"
            src="/login.svg"
            alt="Login..."
          />
        </div>
      </div>
    </>
  );
};

export default Login;
