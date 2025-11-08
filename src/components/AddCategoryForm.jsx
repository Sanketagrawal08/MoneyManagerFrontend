import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = ({ onAddCategory }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = () => {
    onAddCategory(category);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Category Name */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          type="text"
          value={category.name}
          onChange={({ target }) => handleChange("name", target.value)}
          placeholder="e.g. Freelance, Salary, Bonus"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Category Type */}
      <div className="flex flex-col">
        <label htmlFor="categoryType" className="mb-1 text-sm font-medium text-gray-700">
          Category Type
        </label>
        <select
          id="categoryType"
          value={category.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="" disabled hidden>
            Select category type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="self-end bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm transition-all"
      >
        Add Category
      </button>
    </div>
  );
};

export default AddCategoryForm;
