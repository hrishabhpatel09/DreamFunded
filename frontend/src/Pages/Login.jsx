import React, { useState } from "react";
import { Link, Router, redirect, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/user/login",
            { username, password },
            { withCredentials: true }
          );
          if (!response) reject("Something Went Wrong");
          else {
            const user = response.data.data.user;
            resolve();
            setTimeout(()=>{
              dispatch(login(user));
              navigate("/");
            },1000)
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Please Wait...",
        success: "Logged In",
        error: "Something Went Wrong",
      }
    );
  };
  return (
    <div className="flex justify-center items-center flex-col body h-[100vh]">
      <Toaster />
      <div className="container h-[35vh] mt-0 border-r-2 shadow-md pt-12 flex flex-col items-center justify-center sm:w-96 w-[90vw] sm:h-[50vh]">
        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="username"
            className="border-black input  h-10 w-80 rounded-md pl-2 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border-black input h-10 w-80 rounded-md pl-2 outline-none "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to={"/forget"} className="self-center mr-16 mt-2 text-blue-400">
          Forgotten your password?
        </Link>
        <button
          className="mt-8 bg-blue-500 px-4 py-2 text-black cursor-pointer button"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
      <div className="shadow-md container h-[8vh] mt-4 border-r-2 flex items-center justify-center w-[90vw] sm:w-96">
        <p className="mr-2">Don't have an account?</p>
        <Link to={"/signup"} className="text-blue-500 font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
