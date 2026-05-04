import { useTheme } from '../../../ThemeContext'
import { ArrowDownToLine, Trophy, Compass, Wallet } from "lucide-react";

const winners = [
    {
        name: "R*** Patel",
        contest: "Forex Frenzy",
        amount: "+$1,250",
        time: "2h ago",
        cardGradient: "from-[#ECFDF5] to-[#D1FAE5]",
        cardDarkGradient: "from-[#0B2E26] to-[#061F1A]",
        iconGradient: "from-[#065F46] to-[#064E3B]",
    },
    {
        name: "A*** Kumar",
        contest: "Altcoin Arena",
        amount: "+$3,400",
        time: "5h ago",
        cardGradient: "from-[#EFF6FF] to-[#DBEAFE]",
        cardDarkGradient: "from-[#0B1E3A] to-[#061427]",
        iconGradient: "from-[#1E3A8A] to-[#1E40AF]",
    },
    {
        name: "S*** Joshi",
        contest: "Scalper Sprint",
        amount: "+$780",
        time: "1d ago",
        cardGradient: "from-[#FFFBEB] to-[#FEF3C7]",
        cardDarkGradient: "from-[#2A1E05] to-[#1C1403]",
        iconGradient: "from-[#92400E] to-[#78350F]",
    },
    {
        name: "M*** Singh",
        contest: "Crypto Cup",
        amount: "+$2,100",
        time: "3h ago",
        cardGradient: "from-[#F5F3FF] to-[#EDE9FE]",
        cardDarkGradient: "from-[#1E103A] to-[#140A27]",
        iconGradient: "from-[#6B21A8] to-[#581C87]",
    },
    {
        name: "P*** Reddy",
        contest: "Gold Rush",
        amount: "+$950",
        time: "6h ago",
        cardGradient: "from-[#FFFBEB] to-[#FEF3C7]",
        cardDarkGradient: "from-[#2A2105] to-[#1C1603]",
        iconGradient: "from-[#B45309] to-[#92400E]",
    },
];

const WinnerCard = ({ w }) => {
    const { theme } = useTheme();
    return (
        <div className={`min-w-[175px] rounded-2xl px-3 py-2.5 flex items-center gap-2.5 flex-shrink-0 bg-gradient-to-br ${theme === "dark" ? w.cardDarkGradient : w.cardGradient}`} style={{boxShadow:theme === "dark" ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 10px rgba(0,0,0,0.05)", }}>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${w.iconGradient} flex items-center justify-center relative overflow-hidden flex-shrink-0`} style={{ boxShadow: "0 2px 8px rgba(245,158,11,0.25), inset 0 1px 2px rgba(255,255,255,0.08)", }}>
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent rounded-t-full" />

                <Trophy size={14} className="relative z-10" color="#FACC15" style={{ filter: "drop-shadow(0 0 3px rgba(250,204,21,0.5))", }}/>
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold  truncate">{w.name}</p>
                <p className="text-[9px] text-gray-500 dark:text-gray-400 truncate">{w.contest}</p>
            </div>

            <div className="text-right flex-shrink-0">
                <p className="text-[14px] font-black leading-none" style={{ color: "#059669" }}>{w.amount}</p>
                <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">{w.time}</p>
            </div>
        </div>
    )
};

const Winnings = () => (
    <div className="px-0 py-1 overflow-hidden">
        <div className="flex items-center justify-between mb-2.5 px-4">
            <div>
                <h2 className="text-[15px] font-bold">Winning Highlights</h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Real users winning real rewards</p>
            </div>
            <button className="text-xs font-semibold text-blue-500">See All</button>
        </div>

        <div className="flex gap-2.5 px-4" style={{ animation: "marquee-scroll 25s linear infinite", width: "max-content", }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            onTouchStart={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onTouchEnd={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
            {[...winners, ...winners].map((w, i) => (
                <WinnerCard key={i} w={w} />
            ))}
        </div>
    </div>
);

export default Winnings;