import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, to }) => {
  const user = useSelector((state) => state.user);
  return !user ? children : <Navigate to={to}></Navigate>;
};

export default ProtectedRoute;
