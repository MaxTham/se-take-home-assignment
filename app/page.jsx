"use client";

import React, { useState } from 'react';
import Header from './components/title/Header';
import ControlCard from './components/control/ControlCard';
import OrderCard from './components/orders/OrderCard';
import BotCard from './components/bots/BotCard';

function DashboardPage() {
  const [botRefreshKey, setBotRefreshKey] = useState(0);
  const [orderRefreshKey, setOrderRefreshKey] = useState(0);
  const triggerBotRefresh = () => setBotRefreshKey(prev => prev + 1);
  const triggerOrderRefresh = () => setOrderRefreshKey(prev => prev + 1);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <ControlCard onBotCreated={triggerBotRefresh} onOrderCreated={triggerOrderRefresh} />
            <OrderCard orderRefreshTrigger={orderRefreshKey}/>
            <BotCard botRefreshTrigger={botRefreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
