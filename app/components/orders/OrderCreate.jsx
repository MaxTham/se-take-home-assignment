"use client";

import React, { useState } from "react";
import SuccessModal from "../modals/SuccessModel";
import { createOrder } from "@/utils/order";

function OrderCreate({ isOpen, onClose, onSuccess, orderType }) {
  const [orderDetails, setOrderDetails] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async () => {
    if (!orderDetails.trim()) return;

    setIsCreating(true);
    try {
      const data = await createOrder(orderDetails, orderType);
      if (data.success) {
        setSuccessData(data);
        setOrderDetails("");
      } else {
        alert("Failed to create order.");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Server error.");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen && !successData) return null;

  return (
    <>
      {isOpen && !successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">New {orderType} Order</h2>
            <input
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              placeholder="Enter order details"
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setOrderDetails("");
                  onClose();
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

export default OrderCreate;
