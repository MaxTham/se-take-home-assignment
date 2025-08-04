"use client";

import React, { useEffect, useState } from "react";
import SubTitle from "../title/SubTitle";
import OrderItem from "./OrderItem";
import { getPendingOrder, getCompleteOrder } from "@/utils/order";

function OrderCard({ orderRefreshTrigger }) {
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

  useEffect(() => {
    fetchOrders();
  }, [orderRefreshTrigger]);

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
        pendingOrders.map((order) => (
          <OrderItem key={order.orderID} order={order} />
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
        completedOrders.map((order) => (
          <OrderItem key={order.orderID} order={order} />
        ))
      )}
    </div>
  );
}

export default OrderCard;
