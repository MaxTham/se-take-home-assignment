"use client";

import React, { useEffect, useState } from "react";
import SubTitle from "../title/SubTitle";
import OrderItem from "./OrderItem";
import {
  getPendingOrder,
  getCompleteOrder,
  assignOrder,
  completeOrder,
  resetOrder,
} from "@/utils/order";

function OrderCard({ orderRefreshTrigger, botRefresh }) {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const pending = await getPendingOrder();
      const complete = await getCompleteOrder();

      setPendingOrders(pending.data || []);
      setCompletedOrders(complete.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const assignTask = async () => {
    if (pendingOrders.length > 0) {
      const data = await assignOrder();
      if (data.success) {
        fetchOrders();
        botRefresh();
        setTimeout(async () => {
          const completeData = await completeOrder(
            data.assignedOrderID,
            data.assignedBotID
          );
          if (completeData.success) {
            fetchOrders(); // refresh after completing
            botRefresh();
          }
        }, 10000);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
    assignTask();
  }, [orderRefreshTrigger]);

  useEffect(() => {
    const handleUnload = async () => {
      try {
        await resetOrder(); // ⬅️ Trigger this before session ends
      } catch (err) {
        console.error("Failed to reset order:", err);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div>
      <SubTitle title="PENDING Orders" />
      {pendingOrders.length === 0 ? (
        <div className="bg-white px-4 min-h-[72px] py-2">
          <p className="text-[#8a8060] text-sm font-normal leading-normal">
            There are no pending orders.
          </p>
        </div>
      ) : (
        (assignTask(),
        (
          <div className="max-h-[200px] overflow-y-auto">
            {pendingOrders.map((order) => (
              <OrderItem key={order.orderID} order={order} />
            ))}
          </div>
        ))
      )}

      <SubTitle title="COMPLETED Orders" />
      {completedOrders.length === 0 ? (
        <div className="bg-white px-4 min-h-[72px] py-2">
          <p className="text-[#8a8060] text-sm font-normal leading-normal">
            There are no completed orders.
          </p>
        </div>
      ) : (
        <div className="max-h-[200px] overflow-y-auto">
          {completedOrders.map((order) => (
            <OrderItem key={order.orderID} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderCard;
