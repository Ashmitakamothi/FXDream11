import React from 'react';
import { Trophy, ArrowUp } from 'lucide-react';

const WinningHighlights = ({ topWinners }) => {
  return (
    <section>
      <div>
        <h2 className="text-base font-bold tracking-tight">🏆 Winning Highlights</h2>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Live leaderboard highlights</p>
      </div>
      <div className="mt-3">
        <div className="group relative overflow-hidden">
          <div className="flex w-max gap-3 animate-marquee-slow group-hover:[animation-play-state:paused]">
            {[...topWinners, ...topWinners].map((w, i) => (
              <div key={i} className="relative flex items-center gap-3 min-w-[240px] rounded-[14px] px-4 py-3 overflow-hidden transition-all duration-300 hover:-translate-y-[3px] border border-[#E2E8F0] bg-white shadow-[0_2px_8px_-4px_rgba(15,23,42,0.08)] hover:bg-[#F8FAFC] hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_8px_20px_-8px_rgba(212,175,55,0.30)] dark:border-white/[0.06] dark:bg-[#1C2433] dark:hover:bg-[#232E41] dark:hover:border-white/10">
                <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(34,197,94,0.03) 50%, transparent 80%)' }} />
                <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-[#FFF7E6] border-[rgba(212,175,55,0.25)] dark:bg-white/[0.04] dark:border-white/[0.08]" style={{ boxShadow: '0 0 10px -2px rgba(212,175,55,0.35)' }}>
                  <Trophy className="h-4 w-4" style={{ color: '#D4AF37' }} strokeWidth={1.75} />
                </div>
                <div className="relative leading-tight whitespace-nowrap flex-1">
                  <div className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{w.name}</div>
                  <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{w.time}</div>
                </div>
                <div className="relative ml-2 inline-flex items-center gap-1 text-sm font-bold text-[#16A34A] dark:text-[#22C55E]">
                  <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />
                  +{w.amount}%
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: 'linear-gradient(to right, var(--theme-bg), transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: 'linear-gradient(to left, var(--theme-bg), transparent)' }} />
        </div>
      </div>
    </section>
  );
};

export default WinningHighlights;
