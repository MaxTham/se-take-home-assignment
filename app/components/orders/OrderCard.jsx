"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import SubTitle from "../title/SubTitle";
import OrderItem from "./OrderItem";
import {
  getPendingOrder,
  getCompleteOrder,
  assignOrder,
  completeOrder,
} from "@/utils/order";

const OrderCard = forwardRef(({ orderRefreshTrigger, botRefresh }, ref) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const timeoutsRef = useRef({});

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
        const timeoutId = setTimeout(async () => {
          const completeData = await completeOrder(
            data.assignedOrderID,
            data.assignedBotID
          );
          if (completeData.success) {
            fetchOrders();
            botRefresh();
          }
          delete timeoutsRef.current[data.assignedBotID];
        }, 10000);

        timeoutsRef.current[data.assignedBotID] = timeoutId;
      }
    }
  };

  // Expose clearTimeoutByBotID to parent
  useImperativeHandle(ref, () => ({
    clearTimeoutByBotID: (botID) => {
      if (timeoutsRef.current[botID]) {
        clearTimeout(timeoutsRef.current[botID]);
        delete timeoutsRef.current[botID];
        console.log(`Cleared timeout for bot #${botID}`);
      }
    },
  }));

  useEffect(() => {
    fetchOrders();
  }, [orderRefreshTrigger]);

  useEffect(() => {
    if (pendingOrders.length > 0) {
      assignTask();
    }
  }, [pendingOrders]);

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
        <div className="max-h-[200px] overflow-y-auto">
          {pendingOrders.map((order) => (
            <OrderItem key={order.orderID} order={order} />
          ))}
        </div>
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
});

export default OrderCard;
