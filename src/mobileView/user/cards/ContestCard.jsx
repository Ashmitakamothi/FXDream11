import React from "react";
import { useState, useEffect } from "react";
import { Users, ArrowRight, Flame, Zap, Brain, Clock, Trophy } from "lucide-react";
import { useTheme } from '../../../ThemeContext';
import { Button } from "antd";
const pad = (n) => String(n).padStart(2, "0");

const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
        case 'open': return { icon: Flame, label: 'Hot', bg: 'bg-[#ef4444]' };
        case 'trending': return { icon: Zap, label: 'Trending', bg: 'bg-[#3b82f6]' };
        default: return { icon: Brain, label: status, bg: 'bg-[#8b5cf6]' };
    }
};

const getContestStyle = (index, theme) => {
    const isDark = theme === "dark";

    const styles = [
        {
            light: {
                card: "bg-white border border-gray-200",
                barGradient: "from-[#10B981] via-[#059669] to-[#047857]",
                btnGradient: "from-[#059669] to-[#047857]",
                statBg: "bg-[#0000000d]",
            },
            dark: {
                card: "bg-gradient-to-br from-[#062C30] via-[#041F22] to-[#072E2E] border border-white/5",
                barGradient: "from-[#10B981] via-[#059669] to-[#047857]",
                btnGradient: "from-[#059669] to-[#047857]",
                statBg: "bg-[#064E3B]/25",
            },
        },
        {
            light: {
                card: "bg-white border border-gray-200",
                barGradient: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
                btnGradient: "from-[#2563EB] to-[#1D4ED8]",
                statBg: "bg-[#0000000d]",
            },
            dark: {
                card: "bg-gradient-to-br from-[#0B1E3A] via-[#061427] to-[#0A2540] border border-white/5",
                barGradient: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
                btnGradient: "from-[#2563EB] to-[#1D4ED8]",
                statBg: "bg-[#1E3A8A]/25",
            },
        },
    ];

    const style = styles[index % styles.length];
    return isDark ? style.dark : style.light;
};
const generateRandomWavePath = (seed, baseLineY, amplitude, width, height) => {
    let currentSeed = seed;
    const pseudoRandom = () => {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
    };

    const numSegments = 4;
    const segmentLength = width / numSegments;

    const points = [];
    for (let i = 0; i <= numSegments; i++) {
        const x = i * segmentLength;
        const y = baseLineY + (pseudoRandom() * 2 - 1) * amplitude;
        points.push({ x, y: Math.max(10, Math.min(height - 10, y)) });
    }

    let d = `M 0,${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        const controlX = (prevPoint.x + currentPoint.x) / 2;
        // Using Cubic Bezier for smoother, more chart-like waves
        d += ` C ${controlX},${prevPoint.y} ${controlX},${currentPoint.y} ${currentPoint.x},${currentPoint.y}`;
    }
    return d;
};
const getContestActionState = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "not_started";
    if (now > end) return "completed";
    return "live";
};
const renderActionButton = (c, style, navigate) => {
    const state = getContestActionState(c.startDate, c.endDate);

    switch (state) {
        case "not_started":
            return (
                <button
                    className={`flex items-center justify-center gap-1 text-[11px] font-bold text-white bg-gradient-to-r ${style.btnGradient} px-4 py-[8px] rounded-xl w-full active:scale-95`}
                    onClick={() => navigate(`/user/contests/${c.contestId}`)}
                >
                    Join Now <ArrowRight size={10} />
                </button>
            );

        case "completed":
            return (
                <button
                    disabled
                    className="bg-[#12231F] border-none text-[11px] font-bold px-4 py-[8px] rounded-xl text-gray-300 w-full cursor-default"
                >
                    Contest Completed
                </button>
            );

        case "live":
        default:
            if (c.currentParticipants >= c.maxParticipants) {
                return (
                    <button
                        disabled
                        className="bg-[#12231F] border-none text-[11px] font-bold px-4 py-[8px] rounded-xl text-gray-300 w-full cursor-default"
                    >
                        Contest Full
                    </button>
                );
            }
            return (
                <button disabled className="bg-[#12231F] border border-white/5 text-[11px] font-bold px-4 py-[8px] rounded-xl text-[#1C7E5F] w-full cursor-default">
                    Contest Started
                </button>
            );
    }
};
const ContestTimer = ({ endDate, color }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        if (difference <= 0) return { d: 0, h: 0, m: 0, s: 0 };

        return {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [endDate]);

    return (
        <div className={`flex items-center gap-1.5 rounded-full ${color} backdrop-blur-sm`}>
            <Clock size={12} />
            <span className="text-[12px] font-bold font-mono">
                {pad(time.d)}:{pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
        </div>
    );
};

import { useNavigate } from "react-router-dom";

const ContestCard = ({ contest: c, index, actionbtns }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const palettes = [
        {
            darkGradient: "from-[#121a22] via-[#11161b] to-[#161a1f]",
            barGradient: "from-[#2692ed] via-[#2767ba] to-[#2948a3]",
            btnGradient: "from-[#2388eb] to-[#22419f]",
            badge: { icon: Zap, label: "Trending", bg: "bg-[#2d8ce6]" }
        },
        {
            darkGradient: "from-[#211d12] via-[#1b1811] to-[#211a16]",
            barGradient: "from-[#f5a600] via-[#c46a1b] to-[#a1442b]",
            btnGradient: "from-[#eb9f00] to-[#a14022]",
            badge: { icon: Trophy, label: "Premium", bg: "bg-[#da8a1a]" }
        },
        {
            darkGradient: "from-[#191222] via-[#16111b] to-[#1b161f]",
            barGradient: "from-[#9966cc] via-[#804db3] to-[#664599]",
            btnGradient: "from-[#8c52cc] to-[#5e3da6]",
            badge: { icon: Flame, label: "Featured", bg: "bg-[#8040bf]" }
        }
    ];
    
    const style = palettes[index % palettes.length];
    const BadgeIcon = style.badge.icon;

    const formatDate = (dateString) => {
        if (!dateString) return "TBD";
        const d = new Date(dateString);
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        return `${d.toLocaleDateString('en-US', options)} | ${d.toLocaleTimeString('en-US', timeOptions)}`;
    };

    const waveSeed = c.contestId || index;
    const wavePath1 = generateRandomWavePath(waveSeed, 50, 40, 360, 100);
    const wavePath2 = generateRandomWavePath(waveSeed + 123, 60, 30, 360, 100);

    const progress = Math.min(((c.currentParticipants || 214) / (c.maxParticipants || 300)) * 100, 100);

    return (
        <div className={`bg-card ${theme === 'dark' ? `bg-gradient-to-br ${style.darkGradient}` : ''} border border-gray-100 dark:border-[#ffffff0a] rounded-[24px] relative overflow-hidden active:scale-[0.98] transition-all duration-200 shadow-sm dark:shadow-[0_6px_24px_rgba(0,0,0,0.4)]`}>

            <svg className="absolute inset-0 w-full h-full opacity-[0.03] text-primary" viewBox="0 0 360 100" preserveAspectRatio="none" fill="none">
                <path d={wavePath1} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d={wavePath2} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
            
            <div className="p-4 relative z-10">
                <div className="flex items-center justify-between mb-1 gap-2">
                    <h3 className="font-bold text-[16px] text-gray-900 dark:text-white tracking-wide truncate flex-1 min-w-0">
                        {c.contestName}
                    </h3>
                    
                    <div className="flex items-center gap-2 shrink-0">
                        <span className={`flex items-center justify-center gap-1 px-2.5 py-1 rounded-full ${style.badge.bg} text-white text-[10px] font-bold leading-none shadow-sm`}>
                            <BadgeIcon size={12} strokeWidth={2.5} />
                            <span className="pt-[1px]">{style.badge.label}</span>
                        </span>
                        <button 
                            onClick={() => navigate(`/user/contests/${c.contestId}`)}
                            className={`flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r ${style.btnGradient} text-white text-[12px] font-bold active:scale-95 transition-transform`}
                        >
                            Join &rarr;
                        </button>
                    </div>
                </div>
                
                {/* Pair */}
                <p className="text-[11px] text-gray-500 dark:text-[#75847F] mb-3 font-semibold uppercase tracking-wider">
                    {Array.isArray(c.allowedTradingPairs) ? c.allowedTradingPairs.join("/") : (c.allowedTradingPairs || "All Pairs")}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full h-[4px] rounded-full bg-gray-100 dark:bg-[#ffffff0a] mb-4 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${style.barGradient}`} style={{ width: `${progress}%` }} />
                </div>
                
                {/* Timer & Participants */}
                <div className="flex items-center justify-between mb-4">
                    <ContestTimer endDate={c.endDate} color="bg-[#f3f4f6] dark:bg-[#ffffff0a] border-none dark:border dark:border-[#ffffff05] text-gray-900 dark:text-gray-300 px-3 py-1.5" />
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-[#75847F]">
                        <Users size={13} />
                        <span className="text-[12px] font-medium font-mono text-gray-500 dark:text-gray-300">{c.currentParticipants || 214} joined</span>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: "Credit", value: `$${Number(c.virtualBalance || 10000).toLocaleString()}` },
                        { label: "Entry", value: `$${Number(c.entryFee || 100).toLocaleString()}` },
                        { label: "Prize Pool", value: `$${Number(c.prizePool || 25000).toLocaleString()}` },
                    ].map((stat) => (
                        <div key={stat.label} className={`bg-[#f8fafc] dark:bg-[#ffffff08] border-none rounded-[16px] py-2.5 px-2 text-center`}>
                            <p className="text-[14px] font-bold text-gray-900 dark:text-white mb-0.5">{stat.value}</p>
                            <p className="text-[9px] text-gray-500 dark:text-[#75847F] uppercase tracking-widest font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default ContestCard;