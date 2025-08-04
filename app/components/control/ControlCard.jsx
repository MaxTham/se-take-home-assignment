import React, { useState } from "react";
import MainTitle from "../title/MainTitle";
import BotCreate from "../bots/BotCreate";
import BotDelete from "../bots/BotDelete";
import OrderCreate from "../orders/OrderCreate";

function ControlCard({ onBotCreated, onOrderCreated }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderType, setOrderType] = useState(null);

  return (
    <div>
      <MainTitle title="Automation Controller" />

      {/* Buttons */}
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button
            onClick={() => setOrderType("VIP")}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2b90c] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            New VIP Order
          </button>
          <button
            onClick={() => setOrderType("Normal")}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            New Normal Order
          </button>
        </div>
      </div>

      <div className="flex justify-stretch">
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2b90c] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            + Bot
          </button>
        </div>
        <div className="flex px-4 py-3 justify-start">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => setShowDeleteModal(true)}
          >
            - Bot
          </button>
        </div>
      </div>

      <OrderCreate
        isOpen={orderType !== null}
        orderType={orderType}
        onClose={() => setOrderType(null)}
        onSuccess={() => {
          setOrderType(null);
          onOrderCreated(); // trigger parent update
        }}
      />

      <BotCreate
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          onBotCreated(); // tell Dashboard to refresh BotCard
        }}
      />

      <BotDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={() => {
          setShowDeleteModal(false);
          onBotCreated();
        }}
      />
    </div>
  );
}

export default ControlCard;
