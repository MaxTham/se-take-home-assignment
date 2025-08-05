// components/bots/BotItem.jsx
import React from "react";

function OrderItem({ order }) {
  const taskInfo = order.orderTask || null;
  const isBusy = !!taskInfo;

  const isPending = order.orderStatus === "Pending";
  const statusColor = isPending ? "#f2b90c" : "#078812";
  const status = order.orderType == 1 ? "VIP" : "Normal";
  return (
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
      <div className="flex flex-col justify-center">
        <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
          Order {order.orderID}
        </p>
        <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
          {status}
        </p>
        <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
          {order.orderStatus}
        </p>
      </div>
      <div className="shrink-0">
        <div className="flex size-7 items-center justify-center">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: statusColor }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
