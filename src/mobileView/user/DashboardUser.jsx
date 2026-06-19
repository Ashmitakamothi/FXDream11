import React from 'react'
import LiveCard from '../user/cards/LiveCard'
import QuickActions from './cards/QuickAction'
// import Winnings from './cards/Winnings'
import ActiveContests from './cards/ActiveContests'
import RecentActivities from './cards/RecentActivities'
import Navbar from '../common/Navbar'

export default function DashboardUser() {
  return (
    <div className="pb-24">
      <Navbar/>
      <LiveCard/>
      <QuickActions/>
      {/* <Winnings/> */}
      <ActiveContests/>
      <RecentActivities/>
    </div>
  )
}
