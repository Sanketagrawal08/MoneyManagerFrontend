import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import ExpenseModal from "../components/ExpenseModal";
import BackButton from "../pages/BackButton";
import { 
  MinusCircle, 
  TrendingDown, 
  Calendar,
  Tag,
  Search
} from 'lucide-react';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) setExpenseData(response.data);
    } catch (error) {
      toast.error("Error getting expenses");
      console.log("Error in fetchExpenseDetails:", error);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (res.status === 200) setCategories(res.data);
    } catch (error) {
      console.log("Error fetching expense categories:", error);
      toast.error("Fetch by type category failed");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  const addExpense = async (expense) => {
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, expense);
      if (res.status === 201 || res.status === 200) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
      } else {
        toast.error("Failed to add expense");
      }
    } catch (error) {
      console.log("Error adding expense:", error);
      if (error.response?.status === 403) {
        toast.error("Forbidden — check auth or permissions");
      } else {
        toast.error("Error adding expense");
      }
    }
  };

  const totalExpense = expenseData.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  const filteredExpenses = expenseData.filter(exp =>
    exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exp.categoryName && exp.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <BackButton />
            <button
              onClick={() => setOpenAddExpenseModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              <MinusCircle className="w-5 h-5" />
              Add Expense
            </button>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Expense Management
            </h1>
            <p className="text-gray-600">Track and manage your expenses</p>
          </div>

          {/* Total Expense Card */}
          <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-2xl shadow-xl text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <TrendingDown className="w-5 h-5" />
                  <h3 className="text-sm font-medium uppercase tracking-wide">Total Expense</h3>
                </div>
                <p className="text-4xl font-bold mb-1">₹{totalExpense.toLocaleString()}</p>
                <p className="text-sm opacity-80">
                  {expenseData.length} {expenseData.length === 1 ? 'expense' : 'expenses'}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
                <TrendingDown className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-md border-2 border-transparent focus:border-red-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Expense Modal */}
        {openAddExpenseModal && (
          <ExpenseModal
            categories={categories}
            onAddExpense={addExpense}
            onClose={() => setOpenAddExpenseModal(false)}
          />
        )}

        {/* Expense List */}
        {filteredExpenses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {searchTerm ? 'No matching expenses found' : 'No expenses yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start tracking your expenses by adding your first one'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setOpenAddExpenseModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                <MinusCircle className="w-5 h-5" />
                Add Your First Expense
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses.map((exp) => (
              <div
                key={exp.id || exp._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-200 border-l-4 border-red-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className="bg-gradient-to-br from-red-100 to-rose-100 p-3 rounded-xl flex-shrink-0">
                      <span className="text-2xl">{exp.icon || '💸'}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{exp.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-lg">
                          <Tag className="w-3.5 h-3.5 text-red-600" />
                          <span className="font-medium">{exp.categoryName || exp.categoryId}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          <span>{new Date(exp.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-red-600">
                        ₹{exp.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;