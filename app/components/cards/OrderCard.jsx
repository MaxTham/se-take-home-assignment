import React from "react";
import SubTitle from "../title/SubTitle";
function OrderCard() {
  return (
    <div>
      <SubTitle title={" PENDING Orders"} />
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
        <div className="flex flex-col justify-center">
          <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
            Order #12345
          </p>
          <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
            VIP
          </p>
        </div>
        <div className="shrink-0">
          <div className="flex size-7 items-center justify-center">
            <div className="size-3 rounded-full bg-[#078812]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
        <div className="flex flex-col justify-center">
          <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
            Order #67890
          </p>
          <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
            Normal
          </p>
        </div>
      </div>
      <SubTitle title={" COMPLETED Orders"} />
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
        <div className="flex flex-col justify-center">
          <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
            Order #111213
          </p>
          <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
            Completed
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
        <div className="flex flex-col justify-center">
          <p className="text-[#181611] text-base font-medium leading-normal line-clamp-1">
            Order #141516
          </p>
          <p className="text-[#8a8060] text-sm font-normal leading-normal line-clamp-2">
            Completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
