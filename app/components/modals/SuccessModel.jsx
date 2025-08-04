// components/bots/SuccessModal.jsx
import React from "react";

function SuccessModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4 text-green-700">Success</h2>
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#f2b90c] text-[#181611] font-bold py-2 px-4 rounded cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
