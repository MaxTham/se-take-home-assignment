// components/common/PopUpModal.jsx
import React from "react";

function PopUpModal({ message, type = "success" }) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all duration-300`}
    >
      {message}
    </div>
  );
}

export default PopUpModal;
