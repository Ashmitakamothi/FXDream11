import { useState, useRef, useEffect } from "react";
import { TrendingUp, ArrowRight, Crown, Star, Clock } from "lucide-react";

/* ===================== DATA ===================== */
const contests = [
  {
    name: "Crypto Kings Championship",
    pair: "BTC/USDT",
    round: "Round 3 of 5",
    endTime: { d: 1, h: 12, m: 45, s: 30 },
    pnl: "+$1,247.50",
    rank: 4,
    total: 128,
    badge: "🔥 Hot",
    xp: "+250 XP",
  },
  {
    name: "Forex Fury Showdown",
    pair: "EUR/USD",
    round: "Round 1 of 3",
    endTime: { d: 0, h: 8, m: 32, s: 15 },
    pnl: "+$812.00",
    rank: 12,
    total: 64,
    badge: "⚡ Rush",
    xp: "+500 XP",
  },
  {
    name: "Altcoin Legends League",
    pair: "ETH/SOL",
    round: "Finals",
    endTime: { d: 0, h: 0, m: 10, s: 45 },
    pnl: "$10,000",
    rank: null,
    total: 256,
    badge: "👑 Elite",
    xp: "+1000 XP",
  },
];

/* ===================== UTILS ===================== */
const pad = (n) => String(n).padStart(2, "0");

/* ===================== COUNTDOWN ===================== */
const CountdownTimer = ({ endTime }) => {
  const [time, setTime] = useState(endTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        let { d, h, m, s } = t;

        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }

        if (d < 0) return { d: 0, h: 0, m: 0, s: 0 };

        return { d, h, m, s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-1 ml-[30px]">
      <div className="flex items-center gap-1 px-2 py-[3px] rounded-full bg-[#ffffff1a] backdrop-blur-sm">
        <Clock size={10} color="#6EFACB" />
        <span className="text-[11px] font-bold text-[#6EFACB] font-mono">
          {pad(time.d)}:{pad(time.h)}:{pad(time.m)}:{pad(time.s)}
        </span>
      </div>
    </div>
  );
};

/* ===================== MAIN CARD ===================== */
const LiveCard = () => {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % contests.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* TOUCH */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      setActive((prev) =>
        diff > 0
          ? (prev + 1) % contests.length
          : (prev - 1 + contests.length) % contests.length
      );
    }
  };

  const c = contests[active];

  return (
    <div className="px-4 pt-3">
      <div className="rounded-2xl px-4 py-4 relative overflow-hidden text-white" style={{ background:"linear-gradient(140deg, #0b5134, #0F3D3E, #062C30)", boxShadow:"0 6px 24px rgba(0,0,0,0.3), 0 0 20px rgba(110,250,203,0.1)", height: "195px", }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Candlestick bg */}
        <svg className="absolute right-0 top-0 opacity-[0.05]" width="180" height="90" viewBox="0 0 180 90" fill="none">
          <rect x="14" y="22" width="4" height="28" rx="1" fill="white" /><line x1="16" y1="12" x2="16" y2="58" stroke="white" strokeWidth="1" />
          <rect x="34" y="10" width="4" height="20" rx="1" fill="white" /><line x1="36" y1="2" x2="36" y2="36" stroke="white" strokeWidth="1" />
          <rect x="54" y="28" width="4" height="22" rx="1" fill="white" /><line x1="56" y1="18" x2="56" y2="56" stroke="white" strokeWidth="1" />
          <rect x="74" y="6" width="4" height="24" rx="1" fill="white" /><line x1="76" y1="0" x2="76" y2="36" stroke="white" strokeWidth="1" />
          <rect x="94" y="18" width="4" height="26" rx="1" fill="white" /><line x1="96" y1="10" x2="96" y2="50" stroke="white" strokeWidth="1" />
          <rect x="114" y="4" width="4" height="18" rx="1" fill="white" /><line x1="116" y1="0" x2="116" y2="28" stroke="white" strokeWidth="1" />
          <rect x="134" y="15" width="4" height="22" rx="1" fill="white" /><line x1="136" y1="8" x2="136" y2="42" stroke="white" strokeWidth="1" />
          <rect x="154" y="8" width="4" height="16" rx="1" fill="white" /><line x1="156" y1="2" x2="156" y2="30" stroke="white" strokeWidth="1" />
        </svg>

        {/* Line graph */}
        <svg className="absolute left-0 bottom-8 w-full opacity-[0.08]" height="30" viewBox="0 0 360 30" preserveAspectRatio="none" fill="none">
          <path d="M0 25 C40 22 60 12 100 15 S160 5 200 10 S260 2 300 8 S340 4 360 6" stroke="#5ef0c1" strokeWidth="1.5" fill="none" />
          <path d="M0 25 C40 22 60 12 100 15 S160 5 200 10 S260 2 300 8 S340 4 360 6 L360 30 L0 30Z" fill="url(#lg2)" opacity="0.3" />
          <defs><linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5ef0c1" stopOpacity="0.25" /><stop offset="100%" stopColor="#5ef0c1" stopOpacity="0" /></linearGradient></defs>
        </svg>
        {/* Glow */}
        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#6EFACB] opacity-10 blur-2xl" />

        {/* XP */}
        <div className="absolute top-2.5 right-3 z-20">
          <span className="flex items-center gap-1 px-1.5 py-[1.5px] rounded-full bg-[#ffffff1a] text-[9px] font-bold text-white/80">
            <Star size={8} color="#FFD700" />{c.xp}</span>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {/* BADGES */}
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 px-2 py-[2px] rounded-full bg-[#22c55e] text-[9px] font-bold">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                Live
              </span>

              <span className="px-1.5 py-[2px] rounded-full bg-[#f97316] text-[9px] font-bold">{c.badge}</span>
            </div>

            {/* TITLE */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ffffff1a] flex items-center justify-center">
                <Crown size={12} color="#FFD700" />
              </div>
              <h3 className="font-bold text-[13px]">{c.name}</h3>
            </div>

            <p className="opacity-40 text-[10px] ml-[30px]">{c.round}</p>
            <CountdownTimer key={active} endTime={c.endTime} />
          </div>

          <div className="flex flex-col gap-2">
            {/* FOOTER */}
            <div className="flex items-end justify-between">
            <div>
              <p className="opacity-40 text-[8px] uppercase">{c.rank ? "Your PnL" : "Prize Pool"}</p>

              <div className="flex items-center gap-1">
                <TrendingUp size={16} color="#6EFACB" />
                <span className="text-[20px] font-black text-[#6EFACB]">{c.pnl}</span>
              </div>

              {c.rank && (
                <p className="opacity-30 text-[9px]">Rank #{c.rank} of {c.total}</p>
              )}
            </div>

            <button className="flex items-center gap-1 bg-white text-black font-bold text-[11px] px-4 py-2 rounded-full active:scale-95">
              Continue
              <ArrowRight size={12} />
            </button>
            </div>

            <div className="flex justify-center gap-1.5 pt-1">
              {contests.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-[4px] rounded-full ${i === active ? "w-4 bg-white" : "w-[4px] bg-white/30" }`}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCard;