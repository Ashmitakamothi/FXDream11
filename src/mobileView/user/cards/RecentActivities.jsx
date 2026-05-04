import { useTheme } from "../../../ThemeContext";
import { Trophy, ArrowDownToLine, Sparkles, TrendingUp, TrendingDown } from "lucide-react";

const activities = [
  {
    icon: Trophy,
    gradient: "from-[#92400E] to-[#7C2D12]",
    glowColor: "rgba(245,158,11,0.15)",
    shadow: "shadow-[0_4px_14px_rgba(245,158,11,0.35)]",
    title: "You placed #2 in Forex Frenzy",
    meta: "Apr 14 • 02:35 PM",
    detail: "Prize Earned: $120 · Rank: #2",
    value: "+$120",
    valueColor: "text-[#10B981]",
    valueBg: "bg-[#10B981]/10",
    valueIcon: TrendingUp,
  },
  {
    icon: ArrowDownToLine,
    gradient: "from-[#065F46] to-[#134E4A]",
    glowColor: "rgba(16,185,129,0.15)",
    shadow: "shadow-[0_4px_14px_rgba(16,185,129,0.35)]",
    title: "Deposit of $500 confirmed",
    meta: "Apr 14 • 10:12 AM",
    detail: "Via UPI · Ref: TXN8834",
    value: "+$500",
    valueColor: "text-[#10B981]",
    valueBg: "bg-[#10B981]/10",
    valueIcon: TrendingUp,
  },
  {
    icon: Sparkles,
    gradient: "from-[#1E3A8A] to-[#1E293B]",
    glowColor: "rgba(59,130,246,0.15)",
    shadow: "shadow-[0_4px_14px_rgba(59,130,246,0.35)]",
    title: "Crypto Clash contest launched",
    meta: "Apr 13 • 06:00 PM",
    detail: "Entry: $10 · Prize Pool: $5,000",
    value: "New",
    valueColor: "text-[#3B82F6]",
    valueBg: "bg-[#3B82F6]/10",
    valueIcon: null,
  },
  {
    icon: Trophy,
    gradient: "from-[#7F1D1D] to-[#450A0A]",
    glowColor: "rgba(239,68,68,0.15)",
    shadow: "shadow-[0_4px_14px_rgba(239,68,68,0.35)]",
    title: "Lost in Scalper Sprint",
    meta: "Apr 13 • 01:20 PM",
    detail: "Entry: $20 · Rank: #18",
    value: "-$20",
    valueColor: "text-[#EF4444]",
    valueBg: "bg-[#EF4444]/10",
    valueIcon: TrendingDown,
  },
];

const RecentActivities = () => {
      const { theme } = useTheme();
  
  return (
    <div className="px-4 py-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold ">Recent Activity</h2>
        <button className="text-xs font-semibold text-blue-500">View All</button>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-2.5">
        {activities.map((a, i) => {
          const Icon = a.icon;
          const ValueIcon = a.valueIcon;

          return (
            <div key={i} className={`flex items-center gap-3 ${theme === "dark" ? "bg-white/10" : "bg-white"} rounded-2xl p-3.5 active:scale-[0.98] transition-all duration-200`} style={{boxShadow:"0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)", }}>
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center relative overflow-hidden ${a.shadow}`} style={{boxShadow: `0 4px 14px ${a.glowColor}, 0 1px 3px rgba(0,0,0,0.15)`,}}>
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" />
                <Icon size={16} className="text-white relative z-10" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate"> {a.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5"> {a.meta}</p>
                <p className="text-[10px] text-gray-400 mt-0.5"> {a.detail}</p>
              </div>

              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${a.valueBg}`}>
                {ValueIcon && (<ValueIcon size={11} className={a.valueColor} />)}
                <span className={`text-[12px] font-bold ${a.valueColor}`}>{a.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;