import React, { useState } from "react";
import MainTitle from "../title/MainTitle";
import PopUpModal from "../modals/PopUpModal";
import { createBot, deleteBot } from "@/utils/bot";
import { createOrder } from "@/utils/order";

function ControlCard({ onBotCreated, onOrderCreated }) {
  const [modalActionMessage, setModalActionMessage] = useState(null);
  const [modalActionType, setModalActionType] = useState("success");
  const createNewBot = async () => {
    const data = await createBot();
    if (data.success) {
      setModalActionType("success");
      setModalActionMessage(data.message);
      onBotCreated();
      onOrderCreated();
      autoDismissMessage();
    } else {
      setModalActionType("error");
      setModalActionMessage(data.error);
      autoDismissMessage();
    }
  };
  const deleteNewBot = async () => {
    const data = await deleteBot();
    if (data.success) {
      setModalActionType("success");
      setModalActionMessage(data.message);
      onOrderCreated();
      onBotCreated();
      autoDismissMessage();
    } else {
      setModalActionType("error");
      setModalActionMessage(data.error);
      autoDismissMessage();
    }
  };

  const createNewOrder = async (orderType) => {
    const data = await createOrder(orderType);
    if (data.success) {
      setModalActionType("success");
      setModalActionMessage(data.message);
      onOrderCreated();
      autoDismissMessage();
    } else {
      setModalActionType("error");
      setModalActionMessage(data.error);
      autoDismissMessage();
    }
  };

  const autoDismissMessage = () => {
    setTimeout(() => setModalActionMessage(null), 5000);
  };
  return (
    <div>
      <MainTitle title="Automation Controller" />

      {/* Buttons */}
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button
            onClick={() => createNewOrder(1)}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2b90c] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            New VIP Order
          </button>
          <button
            onClick={() => createNewOrder(2)}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            New Normal Order
          </button>
        </div>
      </div>

      <div className="flex justify-stretch">
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={() => createNewBot()}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2b90c] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            + Bot
          </button>
        </div>
        <div className="flex px-4 py-3 justify-start">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => deleteNewBot()}
          >
            - Bot
          </button>
        </div>
      </div>
      <PopUpModal message={modalActionMessage} type={modalActionType} />
    </div>
  );
}

export default ControlCard;
