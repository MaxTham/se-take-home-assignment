import React from 'react'
import Header from './components/title/Header'
import ControlCard from './components/cards/ControlCard'
import OrderCard from './components/cards/OrderCard'
import BotCard from './components/cards/BotCard'

function DashboardPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <ControlCard />
            <OrderCard />
            <BotCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
