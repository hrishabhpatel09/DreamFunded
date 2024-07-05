import React, { useState } from "react";
import { Link, Router, redirect ,useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()
  const handleClick = () =>{
    toast.promise(new Promise(async(resolve, reject) => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/login',{username, password},{withCredentials: true})
            if(!response)reject('Something Went Wrong')
            else{
                navigate('/')
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    }),
      {
        loading: 'Please Wait...',
        success: 'Logged In',
        error: 'Something Went Wrong'
      }
    )
  }
  return (
    <>
      <Toaster/>
      <div className="container h-[35vh] mt-24 border-r-2 shadow-md pt-12 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="border-black border-b-2 h-10 w-[60vw] rounded-md pl-2 outline-none "
            onChange={e=>setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border-black border-b-2 h-10 w-[60vw] rounded-md pl-2 outline-none "
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <Link to={"/forget"} className="self-center mr-16 mt-2 text-blue-400">
          Forgotten your password?
        </Link>
        <button className="mt-8 bg-blue-500 px-4 py-2 text-white rounded-sm cursor-pointer" onClick={handleClick}>
          Login
        </button>
      </div>
      <div className="shadow-md conatiner h-[8vh] mt-4 border-r-2 flex items-center justify-center">
        <p className="mr-2">Don't have an account?</p>
        <Link to={"/signup"} className="text-blue-500 font-semibold">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Login;
