import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center  gap-2 bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">Back</span>
    </button>
  );
};

export default BackButton;
