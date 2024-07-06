import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";


const Forget = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user/forget/${username}`
          );
          if (!response) reject("Something Went Wrong");
          else {
            navigate(`/forget/${username}/verify`)
            resolve()
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Please Wait...",
        success: "Otp Sent Successfully",
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
            placeholder="username or email"
            className="border-black  h-10 w-80 rounded-md pl-2 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          className="mt-8 bg-blue-500 px-4 py-2 text-black rounded-sm cursor-pointer"
          onClick={handleClick}
        >
          Send Otp
        </button>
      </div>
      <div className="shadow-md container h-[8vh] mt-4 border-r-2 flex items-center justify-center w-[90vw] sm:w-96">
        <p className="mr-2">Click here to </p>
        <Link to={"/login"} className="text-blue-500 font-semibold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Forget;
