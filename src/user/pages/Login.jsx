import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../store/user/UserSlice";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const response = await axios.post("/auth/google", {
        code: codeResponse.code,
      });

      if (response.data.success) {
        localStorage.setItem("access_token", response.data.tokens.access_token);
        dispatch(fetchUser(response.data.tokens.access_token));
        navigate("/company");
      }
      document.getElementById("overlay").close();
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      document.getElementById("overlay").close();
    },
    onNonOAuthError: (er) => {
      document.getElementById("overlay").close();
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token != null && token != undefined) {
      navigate("/company");
    }
  }, []);

  return (
    <>
      <div className="flex flex-row w-full min-h-screen justify-center min-w-screen">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center">
          <div className="text-center text-color-1 ">
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
          <button
            className="poppins-regular max-w-sm text-color-1 w-52 bg-white h-[61px] mx-auto text-center border border-[#70746F] rounded-xl flex flex-row justify-center gap-2 items-center mt-10"
            onClick={(e) => {
              document.getElementById("overlay").showModal();

              googleLogin();
            }}
          >
            <img
              className="bg-inherit align-middle"
              src="/google.svg"
              alt="Google Logo"
            />
            Google
          </button>
        </div>
        <div className="w-full bg-white hidden md:flex">
          <img
            className="w-[80%] mx-auto bg-inherit"
            src="/login.svg"
            alt="Login..."
          />
        </div>
      </div>

      <dialog id="overlay" className="modal">
        <span className="loading loading-spinner loading-lg"></span>
      </dialog>
    </>
  );
};

export default Login;
