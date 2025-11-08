import React, { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import BackButton from "../pages/BackButton";
import { 
  SlidersHorizontal,
  Search,
  Calendar,
  ArrowUpDown,
  Tag,
  TrendingUp,
  TrendingDown,
  FileSearch
} from "lucide-react";

const Filter = () => {
  const [filters, setFilters] = useState({
    type: "income",
    startDate: "",
    endDate: "",
    keyword: "",
    sortOrder: "asc",
  });

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.FILTER, filters);
      if (res.status === 200) {
        setResults(res.data);
        toast.success("Results loaded!");
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error filtering transactions:", error);
      toast.error("Failed to fetch filtered data");
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = results.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <BackButton />
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Filter Transactions
            </h1>
            <p className="text-gray-600">Search and filter your income and expenses</p>
          </div>

          {/* Filter Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Filter Options</h2>
            </div>

            <div className="space-y-4">
              {/* Type and Sort Order Row */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Type */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    Type
                  </label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ArrowUpDown className="w-4 h-4 text-indigo-600" />
                    Sort Order
                  </label>
                  <select
                    name="sortOrder"
                    value={filters.sortOrder}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="asc">Ascending (Oldest First)</option>
                    <option value="desc">Descending (Newest First)</option>
                  </select>
                </div>
              </div>

              {/* Date Range Row */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Start Date */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* End Date */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Search className="w-4 h-4 text-indigo-600" />
                  Keyword
                </label>
                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleChange}
                  placeholder="Search by name, category, etc..."
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Search Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="w-5 h-5" />
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {results.length > 0 && (
            <div className={`${
              filters.type === "income" 
                ? "bg-gradient-to-br from-green-500 to-emerald-600" 
                : "bg-gradient-to-br from-red-500 to-rose-600"
            } p-6 rounded-2xl shadow-xl text-white mb-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 opacity-90">
                    {filters.type === "income" ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <h3 className="text-sm font-medium uppercase tracking-wide">
                      Total {filters.type === "income" ? "Income" : "Expense"}
                    </h3>
                  </div>
                  <p className="text-4xl font-bold mb-1">₹{totalAmount.toLocaleString()}</p>
                  <p className="text-sm opacity-80">
                    {results.length} {results.length === 1 ? 'transaction' : 'transactions'} found
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
                  {filters.type === "income" ? (
                    <TrendingUp className="w-8 h-8" />
                  ) : (
                    <TrendingDown className="w-8 h-8" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileSearch className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">Results</h2>
          </div>
          
          {results.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSearch className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to find what you're looking for
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((item) => (
                <div
                  key={item.id || item._id}
                  className={`bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-200 border-l-4 ${
                    filters.type === "income" ? "border-green-500" : "border-red-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icon */}
                      <div className={`${
                        filters.type === "income" 
                          ? "bg-gradient-to-br from-green-100 to-emerald-100" 
                          : "bg-gradient-to-br from-red-100 to-rose-100"
                      } p-3 rounded-xl flex-shrink-0`}>
                        <span className="text-2xl">{item.icon || '💰'}</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-lg">
                            <Tag className={`w-3.5 h-3.5 ${
                              filters.type === "income" ? "text-green-600" : "text-red-600"
                            }`} />
                            <span className="font-medium">{item.categoryName || item.categoryId}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            <span>{new Date(item.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}</span>
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="text-right flex-shrink-0">
                        <div className={`text-2xl font-bold ${
                          filters.type === "income" ? "text-green-600" : "text-red-600"
                        }`}>
                          ₹{item.amount.toLocaleString()}
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
    </div>
  );
};

export default Filter;  