import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import IncomeModal from '../components/IncomeModal';
import BackButton from "../pages/BackButton";
import { 
  PlusCircle, 
  TrendingUp, 
  Calendar,
  Tag,
  Search
} from 'lucide-react';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOME);
      if (response.status === 200) setIncomeData(response.data);
    } catch (error) {
      toast.error('Error getting income');
      console.log('error in fetchIncome details', error);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE('income'));
      if (res.status === 200) setCategories(res.data);
    } catch (error) {
      console.log('error in fetchIncomeCategory by type', error);
      toast.error('fetch by type category failed');
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  const addIncome = async (income) => {
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, income);
      if (res.status === 201 || res.status === 200) {
        toast.success('Income added successfully');
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
      } else {
        toast.error('Failed to add income');
        console.log('addIncome unexpected response:', res);
      }
    } catch (error) {
      console.log('error in adding income:', error);
      if (error.response) {
        console.log('server response:', error.response.status, error.response.data);
        if (error.response.status === 403) {
          toast.error('Forbidden — check auth/CORS');
        } else {
          toast.error('Error adding income');
        }
      } else {
        toast.error('Network error while adding income');
      }
    }
  };

  const totalIncome = incomeData.reduce((sum, inc) => sum + (inc.amount || 0), 0);

  const filteredIncomes = incomeData.filter(inc =>
    inc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inc.categoryName && inc.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <BackButton />
            <button
              onClick={() => setOpenAddIncomeModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              <PlusCircle className="w-5 h-5" />
              Add Income
            </button>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Income Management
            </h1>
            <p className="text-gray-600">Track and manage your income sources</p>
          </div>

          {/* Total Income Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="text-sm font-medium uppercase tracking-wide">Total Income</h3>
                </div>
                <p className="text-4xl font-bold mb-1">₹{totalIncome.toLocaleString()}</p>
                <p className="text-sm opacity-80">
                  {incomeData.length} {incomeData.length === 1 ? 'source' : 'sources'}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-8 h-8" />
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
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-md border-2 border-transparent focus:border-green-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Income Modal */}
        {openAddIncomeModal && (
          <IncomeModal
            categories={categories}
            onAddIncome={addIncome}
            onClose={() => setOpenAddIncomeModal(false)}
          />
        )}

        {/* Income List */}
        {filteredIncomes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {searchTerm ? 'No matching incomes found' : 'No incomes yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start tracking your income by adding your first source'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                <PlusCircle className="w-5 h-5" />
                Add Your First Income
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredIncomes.map((inc) => (
              <div
                key={inc.id || inc._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-200 border-l-4 border-green-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl flex-shrink-0">
                      <img src={inc.icon} alt="" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{inc.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-lg">
                          <Tag className="w-3.5 h-3.5 text-green-600" />
                          <span className="font-medium">{inc.categoryName || inc.categoryId}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          <span>{new Date(inc.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{inc.amount.toLocaleString()}
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

export default Income;