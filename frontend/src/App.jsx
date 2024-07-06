import { useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { logout } from "./store/userSlice";
import {io} from 'socket.io-client'

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar/>
      <Outlet/>
      <button className="mt-5 px-4 py-2 dark:text-white dark:bg-black" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default App;
