import React, { useState, useEffect } from 'react'
import { Trophy, Users, Zap } from 'lucide-react'
import useContestStore from '../../store/contestStore'

// Reusable Countdown Timer Component
const CountdownTimer = ({ initialTime }) => {
  const [seconds, setSeconds] = useState(() => {
    if (!initialTime) return 0;
    // Handle both "HH:MM:SS" and ISO dates
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

  return <div className="font-mono text-xl font-bold tabular-nums text-primary">{formatTime(seconds)}</div>;
};

export default function LiveContests() {
  const { contests, loading, fetchContests } = useContestStore();

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  if (loading && contests.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium">Loading Live Contests...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-6 animate-fade-in">
        
        {/* Banner */}
        <header className="relative overflow-hidden rounded-2xl border border-border gradient-banner p-6 text-white shadow-glow">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="relative flex items-center gap-3">
            <span className="live-dot"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest">Streaming Live</span>
          </div>
          <h1 className="relative mt-2 text-2xl md:text-3xl font-bold">Live Contests</h1>
          <p className="relative text-sm text-white/85">{contests.length} battles in motion. Stats refresh every second.</p>
        </header>

        {/* Grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {contests.map((contest, i) => (
            <div key={contest.id || i} className="group relative overflow-hidden rounded-2xl p-6 shadow-card hover:shadow-[0_20px_50px_rgba(0,165,190,0.1)] hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-[#111827]/90 backdrop-blur-sm">
              <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#00A5BE]/10 group-hover:bg-[#00A5BE]/15 blur-[100px] transition-all duration-500 pointer-events-none"></div>
              
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="live-dot"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">{contest.status === 'Live' ? 'Live' : 'Open'}</span>
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-foreground">
                    {contest.contestName}
                  </h3>
                  <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">{contest.allowedTradingPairs?.[0] || 'Multi-Pair'}</div>
                </div>
                
                <div className="rounded-xl bg-background/60 backdrop-blur border border-border px-3 py-2 text-center relative z-10 min-w-[110px]">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Ends in</div>
                  <CountdownTimer initialTime={contest.endTime || "01:00:00"} />
                </div>
              </div>

              <div className="relative mt-5">
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Participation</span>
                  <span className="font-bold text-foreground">{Math.round(((contest.currentParticipants || 0) / (contest.maxParticipants || 1)) * 100)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-primary transition-[width] duration-700" style={{ width: `${Math.round(((contest.currentParticipants || 0) / (contest.maxParticipants || 1)) * 100)}%` }}></div>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-4 gap-2 text-xs">
                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <div className="text-muted-foreground">Entry</div>
                  <div className="font-bold text-foreground text-sm">${contest.entryFee}</div>
                </div>
                
                <div className="rounded-lg bg-primary/10 px-2.5 py-2 text-primary">
                  <div className="text-primary/70 font-bold text-[10px] uppercase tracking-wider mb-1 inline-flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    Prize
                  </div>
                  <div className="font-bold text-sm">${contest.prizePool?.toLocaleString()}</div>
                </div>

                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <div className="text-muted-foreground inline-flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Players
                  </div>
                  <div className="font-bold tabular-nums text-foreground text-sm">{contest.currentParticipants}</div>
                </div>

                <div className="rounded-lg px-2.5 py-2 bg-primary/10 text-primary">
                  <div className="opacity-70 font-bold text-[10px] uppercase tracking-wider mb-1 inline-flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Your P/L
                  </div>
                  <div className="font-bold tabular-nums text-sm">+$0.00</div>
                </div>
              </div>

              <div className="relative mt-5 flex gap-2">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium gradient-primary text-primary-foreground shadow-glow hover:brightness-110 transition-all h-9 px-4 py-2 flex-1">
                  Open Contest
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors glass border border-border text-foreground hover:bg-card/80 hover:border-primary/40 h-9 px-4 py-2">
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

