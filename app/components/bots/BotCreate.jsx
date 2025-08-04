"use client";

import React, { useState } from "react";
import SuccessModal from "../modals/SuccessModel";

function BotCreate({ isOpen, onClose, onSuccess }) {
  const [botName, setBotName] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async () => {
    if (!botName.trim()) return;
    setIsCreating(true);

    try {
      const res = await fetch("/api/bots/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botName }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessData(data); // Triggers SuccessModal
        setBotName("");
      } else {
        alert("Failed to create bot.");
      }
    } catch (err) {
      console.error("Error creating bot:", err);
      alert("Server error.");
    } finally {
      setIsCreating(false);
    }
  };

  // Don’t render the creation modal if it's not open
  if (!isOpen && !successData) return null;

  return (
    <>
      {/* Creation Modal */}
      {isOpen && !successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Create New Bot</h2>

            <input
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              placeholder="Enter bot name"
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setBotName(""); // Clear input
                  onClose(); // Close modal
                }}
                className="px-4 py-2 rounded bg-gray-200 text-black cursor-pointer"
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-[#f2b90c] text-[#181611] font-bold cursor-pointer"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal (only shown after successful creation) */}
      {successData && (
        <SuccessModal
          message={successData.message}
          onClose={() => {
            setSuccessData(null); // Clear success message
            onClose(); // Only close after modal is dismissed
            onSuccess();
          }}
        />
      )}
    </>
  );
}

export default BotCreate;
