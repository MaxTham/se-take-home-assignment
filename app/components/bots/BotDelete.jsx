"use client";

import React, { useState, useEffect } from "react";
import SuccessModal from "../modals/SuccessModel";
import { deleteBot } from "@/utils/bot";

function BotDelete({ isOpen, onClose, onSuccess }) {
  const [botID, setBotID] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setBotID(""); // Clear input when modal opens
      setSuccessData(null);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (!botID.trim()) {
      alert("Please enter a valid bot ID.");
      return;
    }

    setIsDeleting(true);

    try {
      const data = await deleteBot(botID);
      if (data.success) {
        setSuccessData(data);
        setBotID("");
      } else {
        alert("Failed to delete bot.");
      }
    } catch (err) {
      console.error("Error deleting bot:", err);
      alert("Server error.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-xl font-bold mb-4">Delete Bot</h2>

          <input
            type="text"
            value={botID}
            onChange={(e) => setBotID(e.target.value)}
            placeholder="Enter bot ID"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                onClose();
                setBotID("");
              }}
              className="px-4 py-2 rounded bg-gray-200 text-black cursor-pointer"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-red-600 text-white font-bold cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      {successData && (
        <SuccessModal
          message={successData.message}
          onClose={() => {
            setSuccessData(null);
            onClose();
            onSuccess();
          }}
        />
      )}
    </>
  );
}

export default BotDelete;
