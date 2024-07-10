import { useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { logout } from "./store/userSlice";
import {io} from 'socket.io-client'
import axios from 'axios'

function App() {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state)=> state.chat)
  console.log(chat)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleCheckout = async() =>{
   try {
    const response = await axios.post('http://localhost:8000/api/payment/checkout',{},{withCredentials: true})
    console.log(response.data.session.url)
    window.location.href = response.data.session.url;
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <>
      <Navbar/>
      <Outlet/>
      <button className="mt-5 px-4 py-2 dark:text-white dark:bg-black" onClick={handleLogout}>
        Logout
      </button>
      <button onClick={handleCheckout}>CHeckout</button>
    </>
  );
}

export default App;
