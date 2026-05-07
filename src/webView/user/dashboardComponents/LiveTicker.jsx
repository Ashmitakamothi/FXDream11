import React from 'react';
import { Plus } from 'lucide-react';

const LiveTicker = ({ topWinners, displayContests, performace, displayLeaderboard }) => {
  return (
    <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-cyan-100/60 dark:bg-cyan-900/20 border border-cyan-200/50 dark:border-cyan-800/30 overflow-hidden">
      <span className="live-dot shrink-0"></span>
      <span className="text-[11px] font-bold uppercase tracking-widest text-primary shrink-0">Live</span>
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {topWinners.map((w, i) => (
            <span key={`win-${i}`} className="text-sm font-medium text-foreground/90">🔥 {w.name} is leading with +{w.amount}% profit!</span>
          ))}
          {displayContests?.slice(0, 2).map((c, i) => (
            <span key={`contest-${i}`} className="text-sm font-medium text-foreground/90">🚀 New contest: {c.contestName || c.name} — ${c.prizePool || c.prize} prize pool</span>
          ))}
          <span className="text-sm font-medium text-foreground/90">⚡ Live: {performace?.totalParticipants || displayLeaderboard.length} traders competing right now</span>
          
          {/* Duplicate for seamless loop */}
          {topWinners.slice(0, 2).map((w, i) => (
            <span key={`win-loop-${i}`} className="text-sm font-medium text-foreground/90">🔥 {w.name} is leading with +{w.amount}% profit!</span>
          ))}
        </div>
      </div>
      <button className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Dismiss">
        <Plus className="h-4 w-4 rotate-45" aria-hidden="true" />
      </button>
    </div>
  );
};

export default LiveTicker;
