import React from 'react';
import { Users, Crown } from 'lucide-react';

const LiveLeaderboard = ({ activeContests, performace, displayLeaderboard }) => {
  return (
    <section className="rounded-2xl border border-border gradient-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>🥇 Live Leaderboard</h2>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Top 10 traders {activeContests?.[0]?.contestName ? `in ${activeContests[0].contestName}` : 'this week'}
          </p>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <Users className="h-4 w-4" /> {activeContests?.[0]?.currentParticipants || performace?.totalParticipants || '0'} active
        </span>
      </div>
      
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {displayLeaderboard.slice(0, 3).map((trader, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-2xl p-5 border transition-all duration-300" 
               style={{ 
                 background: idx === 0 ? 'rgba(212, 175, 55, 0.15)' : idx === 1 ? 'rgba(249, 115, 22, 0.06)' : 'rgba(6, 182, 212, 0.06)',
                 borderColor: idx === 0 ? 'rgba(212, 175, 55, 0.25)' : idx === 1 ? 'rgba(249, 115, 22, 0.1)' : 'rgba(6, 182, 212, 0.1)'
               }}>
            <div className="absolute -right-4 -top-4 opacity-20">
              {idx === 0 ? (
                <Crown className="h-20 w-20 text-[#D4AF37]" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(71, 85, 105, 0.6)' }}>
                  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
                  <path d="M11 12 5.12 2.2"></path>
                  <path d="m13 12 5.88-9.8"></path>
                  <path d="M8 7h8"></path>
                  <circle cx="12" cy="17" r="5"></circle>
                  <path d="M12 18v-2h-.5"></path>
                </svg>
              )}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--muted-foreground)' }}>Rank #{idx + 1}</div>
            <div className="mt-1 text-lg font-bold" style={{ color: 'var(--foreground)' }}>{trader.name || trader.userName}</div>
            <div className="mt-2 text-2xl font-black text-primary">+{trader.profit || trader.pnlPercentage || '0'}%</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              <th className="pb-2 font-semibold">Rank</th>
              <th className="pb-2 font-semibold">Trader</th>
              <th className="pb-2 text-right font-semibold">Profit %</th>
            </tr>
          </thead>
          <tbody>
            {displayLeaderboard.slice(3, 10).map((item, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-2.5 font-semibold" style={{ color: 'var(--muted-foreground)' }}>#{item.rank || i + 4}</td>
                <td className="py-2.5" style={{ color: 'var(--foreground)' }}>{item.name || item.userName}</td>
                <td className="py-2.5 text-right font-semibold text-primary">+{item.profit || item.pnlPercentage || '0'}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiveLeaderboard;
