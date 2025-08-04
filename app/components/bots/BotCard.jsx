"use client";

import React, { useEffect, useState } from "react";
import SubTitle from "../title/SubTitle";
import BotItem from "./BotItem";

function BotCard({ botRefreshTrigger }) {
  const [bots, setBots] = useState([]);

  const fetchBots = async () => {
    try {
      const res = await fetch("/api/bots/get");
      const data = await res.json();
      setBots(data);
    } catch (err) {
      console.error("Failed to fetch bots:", err);
    }
  };

  useEffect(() => {
    fetchBots();
  }, [botRefreshTrigger]); // refetch when botRefreshTrigger changes

  return (
    <div>
      <SubTitle title="Bots" />
      {bots.length === 0 ? (
        <div className="bg-white px-4 min-h-[72px] py-2">
          <p className="text-[#8a8060] text-sm font-normal leading-normal">
            Please add bot before adding orders
          </p>
        </div>
      ) : (
        bots.map((bot) => <BotItem key={bot.botID} bot={bot} />)
      )}
    </div>
  );
}

export default BotCard;
