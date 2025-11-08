import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import  AppContext  from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const token = localStorage.getItem("token");

 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
