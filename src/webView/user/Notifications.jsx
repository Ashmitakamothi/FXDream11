import React from 'react';
import { Trophy, Bell, Wallet, Zap } from 'lucide-react';
import '../../web.css';

const notificationsData = [
  {
    id: 1,
    title: "You won Forex Frenzy!",
    desc: "+$320 has been credited to your wallet.",
    time: "2m ago",
    icon: <Trophy className="h-5 w-5" />,
    iconClass: "bg-[rgba(0,166,190,0.1)] text-[#00A5BE]"
  },
  {
    id: 2,
    title: "Contest starting soon",
    desc: "Gold Rush begins in 15 minutes.",
    time: "12m ago",
    icon: <Bell className="h-5 w-5" />,
    iconClass: "bg-[rgba(249,115,22,0.1)] text-[#f97316]"
  },
  {
    id: 3,
    title: "Deposit successful",
    desc: "$500 credited via UPI.",
    time: "1h ago",
    icon: <Wallet className="h-5 w-5" />,
    iconClass: "bg-[rgba(249,115,22,0.1)] text-[#f97316]"
  },
  {
    id: 4,
    title: "Daily bonus available",
    desc: "Claim your $5 bonus before midnight.",
    time: "3h ago",
    icon: <Zap className="h-5 w-5" />,
    iconClass: "bg-[rgba(234,179,8,0.12)] text-[#eab308]"
  },
  {
    id: 5,
    title: "Rank up!",
    desc: "You climbed to global rank #24.",
    time: "1d ago",
    icon: <Trophy className="h-5 w-5" />,
    iconClass: "bg-[rgba(0,166,190,0.1)] text-[#00A5BE]"
  }
];

export default function Notifications() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-8 animate-fade-in max-w-3xl">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[#0f172a]">Notifications</h1>
          <p className="text-[13px] font-medium text-gray-500 mt-1.5">Stay on top of every win and update.</p>
        </header>
        
        <ul className="space-y-4">
          {notificationsData.map((notif) => (
            <li 
              key={notif.id} 
              className="flex items-start gap-5 rounded-[22px] border border-border gradient-card p-5 shadow-card hover-lift cursor-pointer group transition-all duration-300"
            >
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] ${notif.iconClass} transition-transform duration-300 group-hover:scale-110`}>
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-bold text-[15px] text-[#0f172a] leading-tight">{notif.title}</div>
                  <div className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">{notif.time}</div>
                </div>
                <div className="text-[13px] font-medium text-gray-500 mt-1 leading-relaxed">{notif.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
