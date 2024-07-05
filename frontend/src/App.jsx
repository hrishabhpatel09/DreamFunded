import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { logout } from "./store/userSlice";

function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar/>
      <Outlet/>
      <img src={user?.avatarImage} alt="avatr"  height={'20px'}/>
      <button className="mt-5 px-4 py-2" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default App;
