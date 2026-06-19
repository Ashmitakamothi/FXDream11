import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Bookmark, Share2, Clock, Users, Flame, Zap, Brain, Star, Trophy, Shield, TrendingUp, Award, ChevronRight, Crown } from "lucide-react";
import OverviewTab from "./contests/OverviewTab";
import PrizeTab from "./contests/PrizeTab";
import LeaderboardTab from "./contests/LeaderboardTab";
import MyResultsTab from "./contests/MyResultsTab";
import useContestStore from "../../../store/contestStore";

const pad = (n) => String(n).padStart(2, "0");
const tabs = ["Overview", "Prize", "Leaderboard", "My Results"];

export const ContestTimer = ({ endDate, status }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        if (difference <= 0) return { d: 0, h: 0, m: 0, s: 0 };

        return {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60),
        };
    }

    const [time, setTime] = useState(calculateTimeLeft());
    const isEnded = status?.toLowerCase() === "completed" || (time.d === 0 && time.h === 0 && time.m === 0 && time.s === 0);

    useEffect(() => {
        if (isEnded) return;
        const interval = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, [endDate, isEnded]); // Added endDate to dependencies

    if (isEnded) {
        return (
            <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a3026] border border-[#30bd84]/30 shadow-sm animate-pulse">
                <Clock size={16} className="text-[#30bd84]" />
                <span className="text-[15px] font-bold text-[#f7f7f7] font-mono tracking-wider">Contest Ended</span>
            </div>
        );
    }

    return (
        <div
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-rgba(36, 77, 63, 0.5) border border-rgba(54, 115, 93, 0.25) animate-pulse-live"
            style={{ boxShadow: "0 0 16px rgba(41, 158, 113, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)" }}
        >
            <Clock size={14} className="text-[#299e71]" />
            <span className="text-[13px] font-bold text-[#f2f2f2] font-mono tracking-wide">
                {pad(time.d)}:{pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
        </div>
    );
};

const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
        case 'open': return { icon: Flame, label: 'Hot', bg: 'bg-[#ef4444]' };
        case 'trending': return { icon: Zap, label: 'Trending', bg: 'bg-[#3b82f6]' };
        default: return { icon: Brain, label: status, bg: 'bg-[#8b5cf6]' };
    }
};

const ContestDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Overview");
    const { contestDetails: contest, getContestByID } = useContestStore();

    const badge = getStatusBadge(contest?.status);
    const BadgeIcon = badge.icon;

    useEffect(() => {
        if (id) {
            getContestByID(id);
        }
    }, [id, getContestByID]);
    if (!contest) {
        return (
            <div className="min-h-screen bg-background max-w-md mx-auto flex items-center justify-center">
                <div className="text-center">
                    <Trophy size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-bold text-lg">Contest Not Found</p>
                    <button onClick={() => navigate("/contests")} className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        Back to Contests
                    </button>
                </div>
            </div>
        );
    }

    const fillPercent = Math.round((contest.currentParticipants / contest.maxParticipants) * 100);

    return (
        <div className="min-h-screen bg-background max-w-md mx-auto relative">
            <header className="sticky top-0 z-40 glass-effect">
                <div className="flex items-center justify-between px-5 py-2">
                    <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-[#1C7E5F]/30 active:scale-90 transition-transform duration-150">
                        <ArrowLeft size={16} className="text-[#1C7E5F]" />
                    </button>
                    <h1 className="text-[16px] font-extrabold text-white tracking-tight">{contest.contestName}</h1>
                    <div className="w-8 h-8"></div>
                </div>
            </header>

            {/* Hero Summary Card */}
            <div className="px-4 pt-4">
                <div className="bg-gradient-to-br from-[hsl(160,35%,12%)] via-[hsl(168,30%,10%)] to-[hsl(175,25%,8%)] rounded-2xl relative overflow-hidden card-shine" style={{ boxShadow: "0 8px 32px rgba(15, 38, 28, 0.35), 0 2px 8px rgba(0, 0, 0, 0.2)" }}>

                    {/* Candlestick / trading pattern background */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 360 200" preserveAspectRatio="none" fill="none">
                        <line x1="40" y1="40" x2="40" y2="160" stroke="#33e6a6" strokeWidth="0.6" />
                        <rect x="35" y="60" width="10" height="50" fill="#33e6a6" rx="1" />
                        <line x1="80" y1="50" x2="80" y2="150" stroke="hsl(0,60%,50%)" strokeWidth="0.6" />
                        <rect x="75" y="70" width="10" height="40" fill="hsl(0,60%,50%)" rx="1" />
                        <line x1="120" y1="30" x2="120" y2="140" stroke="hsl(160,60%,50%)" strokeWidth="0.6" />
                        <rect x="115" y="50" width="10" height="55" fill="hsl(160,60%,50%)" rx="1" />
                        <line x1="160" y1="45" x2="160" y2="155" stroke="hsl(0,60%,50%)" strokeWidth="0.6" />
                        <rect x="155" y="65" width="10" height="45" fill="hsl(0,60%,50%)" rx="1" />
                        <line x1="200" y1="35" x2="200" y2="130" stroke="hsl(160,60%,50%)" strokeWidth="0.6" />
                        <rect x="195" y="45" width="10" height="60" fill="hsl(160,60%,50%)" rx="1" />
                        <line x1="240" y1="55" x2="240" y2="165" stroke="hsl(160,60%,50%)" strokeWidth="0.6" />
                        <rect x="235" y="75" width="10" height="35" fill="hsl(160,60%,50%)" rx="1" />
                        <line x1="280" y1="40" x2="280" y2="145" stroke="hsl(0,60%,50%)" strokeWidth="0.6" />
                        <rect x="275" y="60" width="10" height="50" fill="hsl(0,60%,50%)" rx="1" />
                        <line x1="320" y1="50" x2="320" y2="160" stroke="hsl(160,60%,50%)" strokeWidth="0.6" />
                        <rect x="315" y="55" width="10" height="65" fill="hsl(160,60%,50%)" rx="1" />
                        <path d="M0 100 Q40 85 80 95 T160 88 T240 92 T320 82 T360 90" stroke="hsl(160,50%,45%)" strokeWidth="0.8" opacity="0.5" />
                        <path d="M0 140 Q50 128 100 135 T200 125 T300 130 T360 122" stroke="hsl(160,40%,40%)" strokeWidth="0.5" opacity="0.3" />
                    </svg>
                    {/* Soft center glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(160,60%,35%,0.12)_0%,transparent_70%)]" />

                    <div className="p-4 relative z-10">
                        {/* Top row */}
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[20px] font-extrabold text-[#ffffff] truncate max-w-[180px]">{contest.contestName}</h2>
                                <div>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${badge.bg} text-[#ffffff] text-[11px] font-bold`}>
                                        <BadgeIcon size={12} />
                                        {badge.label}
                                    </span>
                                </div>
                            </div>
                            {/* CTA */}
                            <span className="px-4 py-2 rounded-full text-[12px] font-bold text-[#8ca8a1] bg-[#ffffff]/[0.08] whitespace-nowrap border border-white/5 shadow-sm">
                                {contest.joinButtonText || "Contest In Progress"}
                            </span>
                        </div>

                        {/* Timer */}
                        <div className="flex justify-center mb-3">
                            <ContestTimer endDate={contest.endDate} status={contest.status} />
                        </div>

                        {/* Financial Data */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                                { label: "Credit", value: `$${Number(contest.virtualBalance || 0).toFixed(2)}` },
                                { label: "Entry", value: `$${Number(contest.entryFee || 0).toFixed(2)}` },
                                { label: "Prize Pool", value: `$${Number(contest.prizePool || 0).toFixed(2)}` },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-[#1b2a24] rounded-2xl py-3.5 px-2 text-center border border-white/[0.04]">
                                    <p className="text-[15px] font-extrabold text-[#ffffff] leading-none">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-[#8ca8a1] mt-2 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 pt-3">
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { label: "Min Players", value: String(contest.minParticipants), icon: Users, gradient: "from-[#172433] to-[#131b26]", iconColor: "text-[#6aa3e3]", glowColor: "rgba(46, 120, 209, 0.15)" },
                        { label: "Max Players", value: String(contest.maxParticipants), icon: Users, gradient: "from-[#221e33] to-[#1a1626]", iconColor: "text-[#a085e6]", glowColor: "rgba(128, 77, 255, 0.15)" },
                        { label: "Joined", value: String(contest.currentParticipants), icon: TrendingUp, gradient: "from-[#192923] to-[#131d1a]", iconColor: "text-[#47d19c]", glowColor: "rgba(31, 169, 122, 0.15)" },
                        { label: "Leverage", value: `1:${contest.maxLeverage}`, icon: Shield, gradient: "from-[#29221a] to-[#261f18]", iconColor: "text-[#e3b26a]", glowColor: "rgba(227, 178, 106, 0.15)" },
                    ].map((item) => (
                        <div key={item.label} className={`bg-gradient-to-br ${item.gradient} rounded-xl py-2.5 px-2 text-center relative overflow-hidden`} style={{ boxShadow: `0 3px 12px ${item.glowColor}, 0 1px 4px rgba(0, 0, 0, 0.1)` }}>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
                            <div className="relative z-10">
                                <item.icon size={14} className={`${item.iconColor} mx-auto mb-1`} style={{ filter: "drop-shadow(0 0 4px currentColor)" }} />
                                <p className="text-[13px] font-bold text-[#ededed] leading-none">{item.value}</p>
                                <p className="text-[8px] font-medium text-[#8c8c8c] mt-0.5 uppercase tracking-wider">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Participation Bar */}
            <div className="px-4 pt-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-[#8ca8a1]">Participation</span>
                    <span className="text-[11px] font-bold text-[#ffffff]">{contest.currentParticipants} / {contest.maxParticipants}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#192a24] overflow-hidden">
                    <div className="h-full rounded-full bg-[#1fa97a] transition-all duration-1000 ease-out" style={{ width: `${fillPercent}%` }} />
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${activeTab === tab ? "bg-gradient-to-r from-[#2aa880] to-[#188562] text-white" : "bg-[#131f19] text-[#8ca8a1]" }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 pt-3 pb-32">
                {activeTab === "Overview" && <OverviewTab contest={contest} />}
                {activeTab === "Prize" && <PrizeTab contest={contest} />}
                {activeTab === "Leaderboard" && <LeaderboardTab id={id} />}
                {activeTab === "My Results" && <MyResultsTab contest={contest} id={id} />}
            </div>

            {/* Sticky Bottom Action */}
            {contest.status?.toLowerCase() === "running" && (
                <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-4 pb-6 max-w-md mx-auto bg-[#0b130f]">
                    <button className={`w-full py-3.5 rounded-2xl text-[13px] font-bold text-[hsl(0,0%,100%)] bg-gradient-to-r ${contest.btnGradient} active:scale-[0.96] transition-all`} style={{ boxShadow: "0 6px 20px hsl(0 0% 0% / 0.2)" }}>
                        Go to Trading Dashboard
                    </button>
                </div>
            )}

            {contest.status?.toLowerCase() === "open" && (
                <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-4 pb-6 max-w-md mx-auto bg-[#0b130f]">
                    {contest.canJoin ? (
                        <button
                            className="w-full py-3.5 rounded-full text-[14px] font-bold text-[#ffffff] bg-gradient-to-r from-[#1fa97a] via-[#1ea170] to-[#1b7a6f] active:scale-[0.94] transition-all relative overflow-hidden group"
                            style={{ boxShadow: "0 6px 24px rgba(31, 169, 122, 0.35), 0 0 16px rgba(41, 158, 113, 0.15)" }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Zap size={16} className="group-active:translate-x-0.5 transition-transform" />
                                {contest.joinButtonText || `Join Contest — ${contest.entryFee}`}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rgba(255, 255, 255, 0.08) to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </button>
                    ) : (
                        <button
                            className="w-full py-3.5 rounded-full text-[14px] font-bold text-[#202b25] bg-[#758a81] active:scale-[0.98] transition-all"
                        >
                            {contest.joinButtonText || "Contest In Progress"}
                        </button>
                    )}
                </div>
            )}

            {contest.status?.toLowerCase() === "completed" && (
                <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-4 pb-6 max-w-md mx-auto bg-[#0b130f]">
                    <button className="w-full py-3.5 rounded-2xl text-[13px] font-bold text-muted-foreground bg-muted cursor-default" style={{ boxShadow: "0 4px 12px hsl(0 0% 0% / 0.08)" }}>
                        View Final Results
                    </button>
                </div>
            )}

        </div>
    );
};

export default ContestDetail;