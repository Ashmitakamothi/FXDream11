import React, { useState, useEffect } from 'react'
import { Trophy, Users, Zap } from 'lucide-react'
import useContestStore from '../../store/contestStore'
import '../../web.css'

// Reusable Countdown Timer Component
const CountdownTimer = ({ initialTime }) => {
  const [seconds, setSeconds] = useState(() => {
    if (!initialTime) return 0;
    if (initialTime.includes(':')) {
      const [h, m, s] = initialTime.split(':').map(Number);
      return h * 3600 + m * 60 + s;
    }
    const diff = Math.floor((new Date(initialTime) - new Date()) / 1000);
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  };

  return <div className="text-xl font-bold tabular-nums text-primary tracking-tight leading-none">{formatTime(seconds)}</div>;
};

export default function LiveContests() {
  const { contests, loading, fetchContests } = useContestStore();

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  if (loading && contests.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Live Contests...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-6 animate-fade-in">
        
        {/* Banner */}
        <header className="relative overflow-hidden rounded-[22px] border border-border gradient-banner p-8 text-white shadow-glow">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="relative flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] opacity-80">Streaming Live</span>
          </div>
          <h1 className="relative mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">Live Contests</h1>
          <p className="relative mt-1 text-[13px] font-medium text-white/85">{contests.length} battles in motion. Stats refresh every second.</p>
        </header>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {contests.map((contest, i) => (
            <div key={contest.id || i} className="group relative overflow-hidden rounded-[22px] border border-border dark:border-gray-800 p-6 shadow-card hover-lift transition-all duration-300 gradient-card">
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444]"></span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ef4444]">{contest.status === 'Live' ? 'Live' : 'Open'}</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#0f172a] dark:text-white leading-tight mb-0.5">
                    {contest.contestName}
                  </h3>
                  <div className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">{contest.allowedTradingPairs?.[0] || 'Multi-Pair'}</div>
                </div>
                
                <div className="rounded-2xl bg-[#00A5BE]/5 border border-[#00A5BE]/10 dark:bg-[#00A5BE]/10 dark:border-[#00A5BE]/20 px-4 py-2.5 text-center relative z-10 min-w-[120px]">
                  <div className="text-[9px] uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500 font-extrabold mb-1">Ends in</div>
                  <CountdownTimer initialTime={contest.endTime || "01:00:00"} />
                </div>
              </div>

              <div className="relative mt-6">
                <div className="mb-2 flex justify-between items-end text-[12px] font-bold">
                  <span className="text-gray-400 dark:text-gray-500 font-medium">Live progress</span>
                  <span className="text-[#0f172a] dark:text-gray-300">{Math.round(((contest.currentParticipants || 0) / (contest.maxParticipants || 1)) * 100)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full bg-[#00A5BE] rounded-full transition-[width] duration-700" style={{ width: `${Math.round(((contest.currentParticipants || 0) / (contest.maxParticipants || 1)) * 100)}%` }}></div>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-4 gap-2.5">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-2.5 transition-colors group-hover:bg-white dark:group-hover:bg-gray-900">
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-0.5">Entry</div>
                  <div className="font-bold text-[#0f172a] dark:text-white text-[15px] leading-none">${contest.entryFee}</div>
                </div>
                
                <div className="rounded-xl bg-[#00A5BE]/5 dark:bg-[#00A5BE]/10 border border-[#00A5BE]/10 dark:border-[#00A5BE]/20 p-2.5">
                  <div className="text-[10px] font-extrabold text-[#00A5BE] uppercase tracking-tight mb-1 inline-flex items-center gap-1">
                    <Trophy className="h-2.5 w-2.5" />
                    Prize
                  </div>
                  <div className="font-bold text-[#00A5BE] text-[15px] leading-none">${contest.prizePool?.toLocaleString()}</div>
                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-2.5 transition-colors group-hover:bg-white dark:group-hover:bg-gray-900">
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-1 inline-flex items-center gap-1">
                    <Users className="h-2.5 w-2.5" />
                    Players
                  </div>
                  <div className="font-bold tabular-nums text-[#0f172a] dark:text-white text-[15px] leading-none">{contest.currentParticipants}</div>
                </div>

                <div className="rounded-xl bg-[#00A5BE]/5 dark:bg-[#00A5BE]/10 border border-[#00A5BE]/10 dark:border-[#00A5BE]/20 p-2.5">
                  <div className="text-[10px] font-extrabold text-[#00A5BE] uppercase tracking-tight mb-1 inline-flex items-center gap-1">
                    <Zap className="h-2.5 w-2.5" />
                    Your P/L
                  </div>
                  <div className="font-bold tabular-nums text-[#00A5BE] text-[15px] leading-none">+$0.00</div>
                </div>
              </div>

              <div className="relative mt-6 flex gap-3">
                <button className="h-10 px-6 rounded-xl bg-[#00A5BE] text-white text-sm font-bold shadow-[0_8px_20px_-6px_rgba(0,165,190,0.4)] hover:brightness-110 hover:shadow-[0_12px_44px_-10px_rgba(0,165,190,0.5)] active:scale-[0.98] transition-all duration-300 flex-1">
                  Open Contest
                </button>
                <button className="h-10 px-6 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] transition-all">
                  Watch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
