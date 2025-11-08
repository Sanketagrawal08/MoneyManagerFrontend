import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CategoryList from "./CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
import toast from "react-hot-toast";
import BackButton from "./BackButton";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  const fetchCategoryDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      setCategoryData(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const isDuplicate = categoryData.some(
      (cat) => cat.name.toLowerCase() === name.trim().toLowerCase()
    );
    
    if (isDuplicate) {
      toast.error("Category with same name already exists");
      return;
    }

    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (res.status === 201) {
        toast.success("Category added successfully!");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      toast.error("Error adding category");
      console.log("Error adding category:", error);
    }
  };

  const handleEditCategory = async (categoryToEdit) => {

  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <BackButton />
        <h2 className="text-3xl font-semibold text-gray-800 text-center">All Categories</h2>
        <button
          onClick={() => setOpenAddCategoryModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-all"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Category List */}
      <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
        isOpen={openAddCategoryModal}
        onClose={() => setOpenAddCategoryModal(false)}
      >
        <AddCategoryForm onAddCategory={handleAddCategory} />
      </Modal>
    </div>
  );
};

export default Category;
