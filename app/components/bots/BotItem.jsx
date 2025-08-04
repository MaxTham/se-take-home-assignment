// components/bots/BotItem.jsx
import React from "react";

function BotItem({ bot }) {
  const taskInfo = bot.botTask || null;
  const isBusy = !!taskInfo;
  const progress = isBusy ? 50 : null; // placeholder

  return (
    <div
      className={`flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 ${
        isBusy ? "justify-between" : ""
      }`}
    >
      <div className="flex flex-col justify-center">
        <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
          {bot.botName} #{bot.botID}
        </p>
        <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
          {taskInfo || "No ongoing order"}
        </p>
      </div>

      {isBusy && (
        <div className="shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-[88px] overflow-hidden rounded-sm bg-[#e6e3db]">
              <div
                className="h-1 rounded-full bg-[#181611]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[#181611] text-sm font-medium leading-normal">
              {progress}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotItem;
