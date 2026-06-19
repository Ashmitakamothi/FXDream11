import { useEffect } from "react";
import { useTheme } from "../../../ThemeContext";
import { Trophy, ArrowDownToLine, Sparkles, TrendingUp, TrendingDown, LogIn, Upload } from "lucide-react";
import useWalletStore from "../../../store/walletStore";

/* 
// STATIC DATA COMMENTED OUT 
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
*/

const RecentActivities = () => {
  const { theme } = useTheme();
  const { transactions, fetchWalletDetails } = useWalletStore();

  useEffect(() => {
    fetchWalletDetails();
  }, [fetchWalletDetails]);

  return (
    <div className="px-4 py-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-white">Recent Activity</h2>
        <button className="text-xs font-semibold text-[#1C7E5F]">View All</button>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-2.5">
        {transactions && transactions.length > 0 ? transactions.slice(0, 5).map((t, i) => {
          const isPositive = t.type?.toLowerCase() === 'deposit' || t.amount > 0;
          
          let Icon = isPositive ? TrendingUp : TrendingDown;
          if (t.type?.toLowerCase() === 'deposit') Icon = ArrowDownToLine;
          if (t.type?.toLowerCase() === 'withdrawal') Icon = Upload;

          const title = t.remark || t.description || t.type || t.category || (isPositive ? 'Deposit' : 'Withdrawal');
          const meta = t.createdAt ? new Date(t.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now';
          const detail = t.transactionId ? `Txn ID: ${t.transactionId}` : 'Transaction completed successfully';
          const amount = `${isPositive ? '+' : ''}$${Math.abs(t.amount || 0).toFixed(2)}`;
          
          const valueColor = isPositive ? "text-[#1C7E5F]" : "text-[#EF4444]";
          const valueBorder = isPositive ? "border-[#1C7E5F]/30" : "border-[#EF4444]/30";
          const statusBg = isPositive ? "bg-[#12231F]" : "bg-[#EF4444]/10";
          const ValueIcon = isPositive ? TrendingUp : TrendingDown;

          return (
            <div key={i} className="flex items-center gap-3 bg-[#0B1714] border border-[#ffffff0a] rounded-[20px] p-4 active:scale-[0.98] transition-all duration-200" style={{boxShadow: "0 4px 16px rgba(0,0,0,0.2)"}}>
              <div className={`w-[38px] h-[38px] rounded-[12px] ${statusBg} flex items-center justify-center border ${valueBorder} shrink-0`}>
                <Icon size={16} className={valueColor} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-white truncate">{title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{meta}</p>
                <p className="text-[9px] text-[#788a85] mt-1 leading-[1.3] line-clamp-2 pr-2 whitespace-pre-line">{detail}</p>
              </div>

              <div className="flex items-center justify-center shrink-0">
                <div className={`px-3 py-1.5 rounded-full ${statusBg} flex items-center gap-1 border ${valueBorder}`}>
                  <ValueIcon size={10} className={valueColor} />
                  <span className={`text-[9px] font-bold ${valueColor} tracking-wider uppercase`}>{amount}</span>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="py-10 text-center text-xs text-gray-500">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;