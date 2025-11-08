import React, { useState } from 'react';
import EmojiPickerPopup from './EmojiPickerPopup';
import { X, DollarSign, Calendar, Tag, FileText } from 'lucide-react';

const IncomeModal = ({ categories = [], onAddIncome, onClose }) => {
  const [income, setIncome] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: ''
  });

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!income.name || !income.amount || !income.date || !income.categoryId) {
      alert('Please fill name, amount, date and category.');
      return;
    }
    onAddIncome(income);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Add New Income</h2>
            <button 
              onClick={onClose} 
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-green-100 text-sm mt-1">Track your earnings and income sources</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Emoji Picker */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <span className="text-lg">😊</span>
              Choose an Icon
            </label>
            <EmojiPickerPopup
              icon={income.icon}
              onSelect={(emoji) => setIncome(prev => ({ ...prev, icon: emoji }))}
            />
          </div>

          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-green-600" />
              Income Source
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Salary, Freelance, Investment..."
              value={income.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 text-green-600" />
              Category
            </label>
            <select
              name="categoryId"
              value={income.categoryId}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-white"
            >
              <option value="">Select Category</option>
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                ₹
              </span>
              <input
                type="number"
                name="amount"
                value={income.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border-2 border-gray-200 pl-8 pr-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={income.date}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Income
            </button>

            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeModal;