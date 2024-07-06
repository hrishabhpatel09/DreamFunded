import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import Forget from "./Pages/Forget.jsx";
import ForgetVerify from "./Pages/ForgetVerify.jsx";
import ProtectedRoute from "./middleware/protectedRoute.jsx";
import ChatApp from './Pages/ChatApp.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <ProtectedRoute children={<Login />} to={"/"} />,
    // element: <Login/>
  },
  {
    path: "/forget",
    element: <Forget />,
  },
  {
    path: "/forget/:id/verify",
    element: <ForgetVerify></ForgetVerify>,
  },
  {
    path:'/chat',
    loader: async()=>{
      return axios.get('http://localhost:8000/api/chat/getAllGroups',{withCredentials: true})
    },
    element: <ChatApp/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
);
