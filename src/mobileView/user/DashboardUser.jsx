import React from 'react'
import LiveCard from '../user/cards/LiveCard'
import QuickActions from './cards/QuickAction'
import Winnings from './cards/Winnings'
import ActiveContests from './cards/ActiveContests'
import RecentActivities from './cards/RecentActivities'
import Navbar from '../common/Navbar'

export default function DashboardUser() {
  return (
    <div>
      <Navbar/>
      <LiveCard/>
      <QuickActions/>
      <Winnings/>
      <ActiveContests/>
      <RecentActivities/>
    </div>
  )
}
