import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import AppContext from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext); // ✅ user not needed here, only setUser

  // handle input change
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // handle form submit
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ Call backend login API
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, data);
      console.log("Login response:", response.data);

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token && user) {
          // ✅ Save token + user to localStorage for persistence
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // ✅ Update global context
          setUser(user);

          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          toast.error("Invalid login response from server");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message
          ? `Error: ${error.response.data.message}`
          : "Invalid credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={data.email}
            onChange={changeHandler}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={changeHandler}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Signup Redirect */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
