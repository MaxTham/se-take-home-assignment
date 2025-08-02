import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f3f0] px-10 py-3">
      <div className="flex items-center gap-4 text-txtBlack">
        <div className="size-6">
            <img src="/mcd-icon.jpeg" alt="MCD Icon" className="size-6" />
        </div>
        <h2 className="text-txtBlack text-lg font-bold leading-tight tracking-[-0.015em]">
          Mcdonald's Cooking Bot Idle Automation Controller
        </h2>
      </div>
    </header>
  );
}

export default Header;
