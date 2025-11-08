import React from "react";
import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({ categories , onEditCategory}) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center items-center text-gray-500 h-40">
        No Categories Added Yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-all"
        >
          {/* Left Section: Icon + Info */}
          <div className="flex items-center gap-4">
            {category.icon ? (
              <img src={category.icon} alt="icon" className="w-6 h-6" />
            ) : (
              <Layers2 className="text-blue-500" />
            )}
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium">{category.name}</p>
              <p className="text-gray-500 text-sm capitalize">{category.type}</p>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2">
            <button onClick={()=>onEditCategory(category)}  className="text-gray-500 hover:text-blue-500 flex items-center gap-1 text-sm font-medium">
              <Pencil size={14} /> Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
