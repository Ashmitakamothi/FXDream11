import React from "react";
import { useState, useEffect } from "react";
import { Users, ArrowRight, Flame, Zap, Brain, Clock } from "lucide-react";
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
                    onClick={() => navigate(`/contest/${c.contestId}`)}
                >
                    Join Now <ArrowRight size={10} />
                </button>
            );

        case "completed":
            return (
                <button
                    disabled
                    className="text-[11px] font-bold px-4 py-[8px] rounded-xl bg-secondary text-muted-foreground w-full cursor-default"
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
                        className="text-[11px] font-bold px-4 py-[8px] rounded-xl bg-gray-200 text-gray-500 w-full cursor-default"
                    >
                        Full
                    </button>
                );
            }
            return (
                <button disabled className="text-[11px] font-bold px-4 py-[8px] rounded-xl bg-primary/10 text-primary w-full cursor-default border border-primary/20">
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
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${color} backdrop-blur-sm border border-[#0000000a]`}>
            <Clock size={12} />
            <span className="text-[12px] font-bold  font-mono">
                {pad(time.d)}:{pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
        </div>
    );
};

import { useNavigate } from "react-router-dom";

const ContestCard = ({ contest: c, index, actionbtns }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const badge = getStatusBadge(c.status);
    const style = getContestStyle(index, theme);
    const BadgeIcon = badge.icon;
    const progress = Math.min((c.currentParticipants / c.maxParticipants) * 100, 100);

    const wavePath1 = generateRandomWavePath(c.contestId * 100 + 1, 60, 25, 360, 120);
    const wavePath2 = generateRandomWavePath(c.contestId * 100 + 2, 65, 15, 360, 120);

    return (
        <div className={` ${style.card} rounded-2xl relative overflow-hidden active:scale-[0.97] transition-all duration-200 card-shine`}
            style={{ boxShadow: theme === "dark" ? "0 6px 24px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.06)", }}>

            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 360 100" preserveAspectRatio="none" fill="none">
                <path d={wavePath1} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d={wavePath2} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
            <div className="p-3.5 relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[14px] ">{c.contestName}</h3>
                        <span className={`flex items-center gap-1 px-1.5 py-[2px] rounded-full ${badge.bg} text-white text-[9px] font-bold`}>
                            <BadgeIcon size={9} />
                            {badge.label}
                        </span>
                    </div>
                    {!actionbtns && (
                        <button className={`flex items-center gap-1 text-[11px] font-bold text-white bg-gradient-to-r ${style.btnGradient} px-4 py-[6px] rounded-full active:scale-95`} onClick={() => navigate(`/contest/${c.contestId}`)}>
                            Join <ArrowRight size={10} />
                        </button>
                    )}
                </div>
                <p className="text-[11px] text-gray-500 mb-2 truncate">{c.allowedTradingPairs?.join(", ")}</p>
                <div className="w-full h-[6px] rounded-full bg-[#f1f5f9] dark:bg-[#0000000d] mb-2.5 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${style.barGradient}`} style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between mb-2.5">
                    <ContestTimer endDate={c.endDate} color={style.statBg} />
                    <div className="flex items-center gap-1 text-gray-500">
                        <Users size={11} />
                        <span className="text-[10px]">{c.currentParticipants} joined</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    {[
                        { label: "Credit", value: `$${c.virtualBalance?.toLocaleString()}` },
                        { label: "Entry", value: `$${c.entryFee}` },
                        { label: "Prize Pool", value: `$${c.prizePool?.toLocaleString()}` },
                    ].map((stat) => (
                        <div key={stat.label} className={`${style.statBg} rounded-2xl py-1.5 px-2 text-center`}>
                            <p className="text-[12px] font-bold ">{stat.value}</p>
                            <p className="text-[8px] text-gray-500 uppercase">{stat.label}</p>
                        </div>
                    ))}
                </div>
                {actionbtns && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                            className={`${style.statBg} border text-[11px] font-bold px-4 py-[8px] rounded-xl text-secondary-foreground w-full active:scale-95 transition-transform`}
                            onClick={() => navigate(`/user/contests/${c.contestId}`)}
                        >
                            Details
                        </button>
                        {renderActionButton(c, style, navigate)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestCard;