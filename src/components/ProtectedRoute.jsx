// src/components/ProtectedRoute.jsx
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AppContext);
  const token = localStorage.getItem("token");

  // ✅ If token exists but user not loaded, sync from localStorage
  useEffect(() => {
    if (!user && token) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [user, token, setUser]);

  // ✅ Block access if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
