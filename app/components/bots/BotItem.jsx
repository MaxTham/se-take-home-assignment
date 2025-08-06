// components/bots/BotItem.jsx
import React from "react";

function BotItem({ bot }) {
  const taskType = (bot.botTaskType == 1)? "VIP":"Normal";
  const taskInfo = (bot.botTask=="IDLE") ? "IDLE" : `Order #${bot.botTask} (${taskType})`;
  const isBusy = !!taskInfo;

  return (
    <div
      className={`flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 ${
        isBusy ? "justify-between" : ""
      }`}
    >
      <div className="flex flex-col justify-center">
        <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
          Bot #{bot.botID}
        </p>
        <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
          {taskInfo}
        </p>
      </div>
    </div>
  );
}

export default BotItem;
