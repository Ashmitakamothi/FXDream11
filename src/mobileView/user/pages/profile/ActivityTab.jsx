import React, { useState } from 'react'
import ComingSoon from '../../../common/ComingSoon'
import { Lock, ArrowUp, LogIn, Key, ArrowDown } from 'lucide-react'

export default function ActivityTab() {
  const [activeTab, setActiveTab] = useState('All');

  const activities = [
    { id: 1, title: "Password Updated", subtitle: "Today, 10:42 AM • iPhone 14 • Mumbai", icon: Lock, status: "SUCCESS", type: "Security" },
    { id: 2, title: "Withdrawal Request", subtitle: "Today, 09:15 AM • $250.00 to bank **4521", icon: ArrowUp, status: "SUCCESS", type: "Transactions" },
    { id: 3, title: "Login Activity", subtitle: "Yesterday, 8:30 PM • Chrome • Mumbai, IN", icon: LogIn, status: "SUCCESS", type: "Security" },
    { id: 4, title: "MPIN Changed", subtitle: "Yesterday, 7:55 PM • iPhone 14", icon: Key, status: "SUCCESS", type: "Security" },
    { id: 5, title: "Deposit Successful", subtitle: "Yesterday, 2:10 PM • $500.00 via UPI", icon: ArrowDown, status: "SUCCESS", type: "Transactions" },
    { id: 6, title: "Login Attempt", subtitle: "2 days ago, 11:20 PM • Unknown device • Delhi", icon: LogIn, status: "FAILED", type: "Security" }
  ];

  const filteredActivities = activeTab === 'All' 
    ? activities 
    : activities.filter(a => a.type === activeTab);

  /*
  return (
    <div>
      <ComingSoon/>
    </div>
  )
  */

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2">
        {['All', 'Security', 'Transactions'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-2xl text-[12px] font-bold transition-colors ${
              activeTab === tab 
                ? 'bg-[#2bd99b] text-[#111a15]' 
                : 'bg-[#111a15] text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-2">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-[#111a15] rounded-3xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a241f] flex items-center justify-center shrink-0">
                  <activity.icon size={16} className={activity.status === 'FAILED' ? 'text-[#ef4444]' : 'text-[#2bd99b]'} />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white">{activity.title}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{activity.subtitle}</p>
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider ${
                activity.status === 'SUCCESS' 
                  ? 'bg-[#1a3a2e] text-[#2bd99b]' 
                  : 'bg-[#3a1a1a] text-[#ef4444]'
              }`}>
                {activity.status}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 font-medium text-sm">
            No activities found.
          </div>
        )}
      </div>
    </div>
  )
}
