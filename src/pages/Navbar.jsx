import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { List, PlusCircle, MinusCircle, Filter, LogOutIcon } from "lucide-react";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {user} = useContext(AppContext);
  console.log(user)


  const logout = async () => {
      localStorage.clear();
      navigate("/login")
  }

  return (
    <nav className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-2xl shadow-md justify-center md:justify-start">
      <button
        className="flex items-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium border-2 border-blue-600"
        onClick={() => navigate("/category")}
      >
        <List className="w-5 h-5" />
        Add / View Categories
      </button>

      <button
        className="flex items-center gap-2 bg-white text-green-600 px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium border-2 border-green-600"
        onClick={() => navigate("/income")}
      >
        <PlusCircle className="w-5 h-5" />
        Add / View Income
      </button>

      <button
        className="flex items-center gap-2 bg-white text-red-600 px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium border-2 border-red-600"
        onClick={() => navigate("/expense")}
      >
        <MinusCircle className="w-5 h-5" />
        Add / View Expenses
      </button>

      <button
        className="flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium border-2 border-gray-700"
        onClick={() => navigate("/filter")}
      >
        <Filter className="w-5 h-5" />
        Filter Expenses
      </button>
   
    </nav>
  );
};

export default Navbar;
