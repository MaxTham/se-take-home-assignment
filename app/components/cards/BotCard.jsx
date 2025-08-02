import React from "react";
import SubTitle from "../title/SubTitle";
function BotCard() {
  return (
    <div>
      <SubTitle title={"Bots"} />
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
        <div className="flex flex-col justify-center">
          <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
            Bot 1
          </p>
          <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
            Idle
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
        <div className="flex flex-col justify-center">
          <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
            Bot 2
          </p>
          <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
            Processing Order #12345
          </p>
        </div>
        <div className="shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-[88px] overflow-hidden rounded-sm bg-[#e6e3db]">
              <div
                className="h-1 rounded-full bg-[#181611]"
                style={{ width: "56.8182%" }}
              ></div>
            </div>
            <p className="text-[#181611] text-sm font-medium leading-normal">
              50
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotCard;
