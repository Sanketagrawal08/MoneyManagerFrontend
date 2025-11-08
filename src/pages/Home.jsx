import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  PlusCircle,
  MinusCircle,
  User,
  Mail,
  LogIn,
  Trash2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../pages/Navbar";
import AppContext from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    RecentTransactions: [],
    latest5Income: [],
    latest5expenses: [],
  });

  const [showResetModal, setShowResetModal] = useState(false);

  const getDataHandler = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (res.status === 200) setDashboard(res.data);
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  //  handle reset transactions
  const resetHandler = async () => {
    try {
      const res = await axiosConfig.delete(API_ENDPOINTS.RESET_TRANSACTIONS);
      if (res.status === 200) {
        toast.success("All transactions have been reset!");
        setShowResetModal(false);
        getDataHandler();
      }
    } catch (error) {
      console.log("Error resetting transactions:", error);
      toast.error("Failed to reset transactions");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Track your finances at a glance</p>
          </div>

          {/* ✅ User Info / Login */}
          <div className="mt-4 md:mt-0 bg-white p-4 rounded-xl shadow flex flex-col gap-3 border border-gray-200">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.fullName || "User"}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* ✅ Reset Transactions Button */}
                <button
                  onClick={() => setShowResetModal(true)}
                  className="flex items-center gap-2 justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium"
                >
                  <Trash2 className="w-5 h-5" />
                  Reset Transactions
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                <LogIn className="w-5 h-5" />
                Login
              </button>
            )}
          </div>
        </div>

        {/* ✅ Navbar */}
        <Navbar />

        {/* Summary Cards (Income + Expense Only) */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Total Income */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="text-lg font-medium opacity-90">
                    Total Income
                  </h3>
                </div>
                <p className="text-3xl md:text-4xl font-bold">
                  ₹{dashboard.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Total Expense */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5" />
                  <h3 className="text-lg font-medium opacity-90">
                    Total Expense
                  </h3>
                </div>
                <p className="text-3xl md:text-4xl font-bold">
                  ₹{dashboard.totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <TrendingDown className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Transactions
            </h2>
          </div>
          {dashboard.RecentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No recent transactions found.
            </p>
          ) : (
            <div className="space-y-3">
              {dashboard.RecentTransactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        tx.type === "income" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {tx.type === "income" ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span className="font-medium text-gray-800">
                      {tx.icon ? `${tx.icon} ` : ""}
                      {tx.name}
                    </span>
                  </div>
                  <span
                    className={`font-bold text-lg ${
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}₹
                    {tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latest Incomes and Expenses */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Incomes */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-800">
                Latest 5 Incomes
              </h3>
            </div>
            {dashboard.latest5Income.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No incomes available.
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard.latest5Income.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {inc.icon ? `${inc.icon} ` : ""}
                        {inc.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {inc.categoryName}
                      </div>
                    </div>
                    <span className="font-bold text-green-600">
                      ₹{inc.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expenses */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MinusCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-800">
                Latest 5 Expenses
              </h3>
            </div>
            {dashboard.latest5expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No expenses available.
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard.latest5expenses.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {exp.icon ? `${exp.icon} ` : ""}
                        {exp.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {exp.categoryName}
                      </div>
                    </div>
                    <span className="font-bold text-red-600">
                      ₹{exp.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  Reset  Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              This will permanently delete all your income and expense records.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                <XCircle className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={resetHandler}
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4" /> Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
