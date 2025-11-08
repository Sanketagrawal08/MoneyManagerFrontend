// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filter"
            element={
              <ProtectedRoute>
                <Filter />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Root = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};
