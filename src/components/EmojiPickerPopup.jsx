import React, { useState } from "react";
import { Image, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer border p-2 rounded-md hover:bg-gray-100 transition"
      >
        {icon ? (
          <img src={icon} alt="icon" className="w-6 h-6" />
        ) : (
          <Image className="w-6 h-6 text-gray-500" />
        )}
        <span className="text-gray-700">{icon ? "Change Icon" : "Pick Icon"}</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white shadow-md rounded-lg p-2">
          <div className="flex justify-end mb-1">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X size={16} />
            </button>
          </div>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
