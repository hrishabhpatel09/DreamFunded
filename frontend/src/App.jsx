import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
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
      <h1 className="bg-red-500">
        {user?.username || "Please Login to continue"}
      </h1>
      <button className="mt-5 px-4 py-2" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default App;
