import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Trophy, ChevronRight, Users, Clock, TrendingUp, Award, Play, Target, ArrowRight, Flame, Zap, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ContestTimer } from "./ContestDetail";
import HeaderAll from "../../common/HeaderAll";
import MobileSidebar from "../../common/MobileSidebar";
import colors from "./colors.json";
import useContestStore from "../../../store/contestStore";


const filterTabs = ["All", "Upcoming", "Live", "Completed"];

const MobileMyContests = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("All");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { myContests, getMyContests } = useContestStore();

    useEffect(() => {
        getMyContests();
    }, [getMyContests]);

    const filtered = (myContests || []).filter((c) => {
        const status = c.status?.toLowerCase();
        const filter = activeFilter.toLowerCase();
        if (filter === "all") return true;
        if (filter === "upcoming") return status === "open";
        if (filter === "live") return status === "running";
        return status === filter;
    }).map((c, index) => {
        const status = c.status?.toLowerCase();
        const palettes = [colors.palettes.blue, colors.palettes.gold, colors.palettes.purple];
        const palette = palettes[index % palettes.length];

        let badge = { icon: Flame, label: "Hot", bg: colors.badges.hot };
        if (status === "open") badge = { icon: Zap, label: "Upcoming", bg: colors.badges.trending };
        if (status === "completed") badge = { icon: Trophy, label: "Finished", bg: colors.badges.winner };

        return {
            ...c,
            id: c.contestId,
            name: c.contestName,
            pair: c.allowedTradingPairs?.join("/") || "All Pairs",
            rank: c.userRank,
            balance: c.virtualBalance,
            pnlPercent: c.pnl || 0,
            participants: { current: c.currentParticipants, max: c.maxParticipants },
            progress: Math.round((c.currentParticipants / (c.maxParticipants || 1)) * 100),
            status: status === "running" ? "live" : status === "open" ? "upcoming" : status,
            badge,
            ...palette,
            wavePath: "M0 60 Q40 45 80 55 T160 48 T240 52 T320 42 T360 50",
            wavePath2: "M0 70 Q50 58 100 65 T200 55 T300 60 T360 52",
        };
    });

    return (
        <div className="min-h-screen bg-background max-w-md mx-auto relative">
            <HeaderAll path="My Portfolio" onMenuClick={() => setIsSidebarOpen(true)} />
            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="px-5 mt-2">
                <div className="relative rounded-2xl overflow-hidden p-5" style={{ background: colors.portfolio.gradient, boxShadow: colors.portfolio.shadow }}>
                    <div className="absolute inset-0 opacity-[0.05]">
                        <svg className="w-full h-full" viewBox="0 0 360 200" fill="none">
                            <path d="M0 100 L40 80 L80 120 L120 60 L160 90 L200 50 L240 110 L280 70 L320 95 L360 55" stroke="white" strokeWidth="1" />
                            <path d="M0 140 L50 120 L100 150 L150 100 L200 130 L250 90 L300 125 L360 85" stroke="white" strokeWidth="0.6" />
                        </svg>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-15" style={{ background: colors.portfolio.glow }} />

                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-[11px] text-white/50 font-medium uppercase tracking-wider">My Portfolio</p>
                                <h2 className="text-xl font-bold text-white mt-0.5">My Contests</h2>
                                <p className="text-[12px] text-white/40 mt-0.5">{myContests.length} contests • All</p>
                            </div>
                            <button onClick={() => navigate("/user/contests")} className="flex items-center gap-1 text-[11px] font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
                                style={{ background: colors.portfolio.button, color: "white", boxShadow: colors.portfolio.buttonShadow }}
                            >
                                Browse Contests <ChevronRight size={12} />
                            </button>
                        </div>

                        <div className="flex gap-2 mt-2">
                            {[
                                { label: "Total Contests", value: myContests.length.toString(), icon: Trophy, color: "#ffffff" },
                                { label: "Winnings", value: `$${myContests.reduce((acc, contest) => acc + (contest.winnings || 0), 0).toLocaleString()}`, icon: TrendingUp, color: colors.portfolio.winnings },
                                { label: "Win Ratio", value: myContests.length > 0 ? `${Math.round((myContests.filter(c => c.isWinner).length / myContests.length) * 100)}%` : "0%", icon: Target, color: colors.portfolio.ratio },
                            ].map((s) => (
                                <div key={s.label} className="flex-1 rounded-xl py-2.5 px-2.5 text-center backdrop-blur-md" style={{ background: "#ffffff14" }}>
                                    <s.icon size={14} className="mx-auto mb-1" style={{ color: s.color }} />
                                    <p className="text-[14px] font-bold text-white leading-none">{s.value}</p>
                                    <p className="text-[8px] text-white/40 mt-1 uppercase tracking-wider font-medium">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-5 mt-4 mb-3">
                <div className="flex gap-2">
                    {filterTabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 active:scale-95 ${activeFilter === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contest List */}
            <div className="px-5 pb-28 space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                            <Trophy size={28} className="text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-semibold mb-1">No contests yet</p>
                        <p className="text-muted-foreground text-sm mb-4">Join a contest to start competing</p>
                        <button onClick={() => navigate("/user/contests")} className="px-6 py-2.5 rounded-full text-sm font-bold text-primary-foreground bg-primary active:scale-95 transition-transform">
                            Browse Contests
                        </button>
                    </div>
                ) : (
                    filtered.map((c) => {
                        const isProfit = c.pnl >= 0;

                        return (
                            <div key={c.id} onClick={() => navigate(`/user/contests/${c.id}`)} style={{ boxShadow: '0 6px 24px hsl(0 0% 0% / 0.07), 0 2px 8px hsl(0 0% 0% / 0.04)' }}
                                className={`bg-gradient-to-br ${c.gradient} ${c.darkGradient} rounded-2xl relative overflow-hidden active:scale-[0.97] transition-all duration-200 cursor-pointer card-shine`}  >
                                {/* Background wave pattern */}
                                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 360 100" preserveAspectRatio="none" fill="none">
                                    <path d={c.wavePath} stroke="currentColor" strokeWidth="1.2" />
                                    <path d={c.wavePath2} stroke="currentColor" strokeWidth="0.8" />
                                </svg>

                                <div className="p-3.5 relative z-10">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-[14px] text-foreground">{c.name}</h3>
                                            <span className={`flex items-center gap-0.5 px-1.5 py-[2px] rounded-full ${c.badge.bg} text-white text-[9px] font-bold`}>
                                                <c.badge.icon size={9} />
                                                {c.badge.label}
                                            </span>
                                            {c.rank && (
                                                <span className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-full text-white text-[9px] font-bold" style={{ background: colors.accent.rank || "#cc841a" }}>
                                                    <Award size={9} /> #{c.rank}
                                                </span>
                                            )}
                                        </div>
                                        {c.status === "live" ? (
                                            <button onClick={(e) => { e.stopPropagation(); }} style={{ boxShadow: '0 4px 14px hsl(0 0% 0% / 0.18)' }}
                                                className={`flex items-center gap-1 text-[11px] font-bold text-white bg-gradient-to-r ${c.btnGradient} px-5 py-[7px] rounded-full active:scale-[0.92] transition-all duration-200`}
                                            >
                                                Continue <ArrowRight size={11} />
                                            </button>
                                        ) : c.status === "upcoming" ? (
                                            <button onClick={(e) => { e.stopPropagation(); }} style={{ boxShadow: '0 4px 14px hsl(0 0% 0% / 0.18)' }}
                                                className={`flex items-center gap-1 text-[11px] font-bold text-white bg-gradient-to-r ${c.btnGradient} px-5 py-[7px] rounded-full active:scale-[0.92] transition-all duration-200`} >
                                                Join Now <ArrowRight size={11} />
                                            </button>
                                        ) : (
                                            <span className={`text-[12px] font-bold ${isProfit ? "text-primary" : "text-destructive"}`}>{isProfit ? `Won: +$${c.pnl}` : `Loss: -$${Math.abs(c.pnl)}`}</span>
                                        )}
                                    </div>

                                    {/* Pair */}
                                    <p className="text-[11px] text-muted-foreground mb-2">{c.pair}</p>

                                    {/* Progress bar */}
                                    <div className="w-full h-[6px] rounded-full bg-foreground/[0.06] mb-2.5 overflow-hidden relative">
                                        <div className={`h-full rounded-full bg-gradient-to-r ${c.barGradient} relative`} style={{ width: `${c.progress}%`, boxShadow: '0 0 8px hsl(0 0% 0% / 0.08)' }}>
                                            <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/25 to-transparent rounded-full" />
                                        </div>
                                    </div>

                                    {/* Date row */}
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            <span className="text-[9px] text-muted-foreground">{c.startDate}</span>
                                        </div>
                                        <div className="flex-1 h-px bg-foreground/[0.06]" />
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[9px] text-muted-foreground">{c.endDate}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                                        </div>
                                    </div>

                                    {/* Timer + Participants row */}
                                    <div className="flex items-center justify-between mb-2.5">
                                        {c.status === "completed" ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-foreground/[0.06]">
                                                <span className="text-[10px] font-semibold text-muted-foreground">Final Rank:</span>
                                                <span className="text-[12px] font-bold" style={{ color: colors.accent.rank }}>#{c.rank}</span>
                                            </div>
                                        ) : (
                                            <ContestTimer endDate={c.endDate} status={c.status} />
                                        )}
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <Users size={11} />
                                            <span className="text-[10px] font-medium">{c.participants.current}/{c.participants.max}</span>
                                        </div>
                                    </div>

                                    {/* Performance stats row */}
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {[
                                            { label: "Balance", value: `$${c.balance.toLocaleString()}` },
                                            { label: "P&L", value: `${isProfit ? "+" : ""}${c.pnlPercent}%`, color: isProfit ? colors.accent.profit : colors.accent.loss },
                                        ].map((stat) => (
                                            <div key={stat.label} className={`${c.statBg} rounded-lg py-1.5 px-2 text-center`}>
                                                <p className="text-[12px] font-bold text-foreground leading-none" style={stat.color ? { color: stat.color } : undefined}>{stat.value}</p>
                                                <p className="text-[8px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom CTA row */}
                                    <div className="flex items-center justify-between mt-2.5">
                                        <button className="text-[10px] font-semibold text-muted-foreground px-3 py-1 rounded-full bg-foreground/[0.04] active:scale-95 transition-transform" onClick={(e) => { e.stopPropagation(); navigate(`/user/contests/${c.id}`); }}>
                                            Details
                                        </button>
                                        {c.status === "live" && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: colors.accent.running }} />
                                                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: colors.accent.running }} />
                                                </span>
                                                <span className="text-[10px] font-semibold" style={{ color: colors.accent.running }}>Running</span>
                                            </div>
                                        )}
                                        {c.status === "upcoming" && (<span className="text-[10px] font-semibold" style={{ color: colors.accent.soon }}>Starts Soon</span>)}
                                        {c.status === "completed" && (<span className="text-[10px] text-muted-foreground">🏆 ${c.prizePool.toLocaleString()} pool</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MobileMyContests;