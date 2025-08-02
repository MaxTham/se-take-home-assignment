import React from "react";
import MainTitle from "../title/MainTitle";
function ControlCard() {
  return (
    <div>
      <MainTitle title="Automation Controller" />
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2b90c] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">New VIP Order</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">New Normal Order</span>
          </button>
        </div>
      </div>
      <div className="flex px-4 py-3 justify-start">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2b90c] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">+ Bot</span>
        </button>
      </div>
      <div className="flex px-4 py-3 justify-start">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">- Bot</span>
        </button>
      </div>
    </div>
  );
}

export default ControlCard;
