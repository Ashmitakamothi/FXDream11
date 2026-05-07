import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const ActiveContests = ({ displayContests }) => {
  return (
    <div className="lg:col-span-5 rounded-2xl border border-border gradient-card shadow-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Active Contests</h2>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Join live now</p>
        </div>
        <Link to="/explore" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
      </div>
      <div className="mt-4 space-y-2.5">
        {displayContests.length > 0 ? displayContests.map((c, i) => (
          <div key={i} className="group relative overflow-hidden rounded-[18px] p-3.5 transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'var(--lovable-card)' }}>
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
            <div className="relative flex items-center gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="gold-badge shrink-0" style={{ height: 40, width: 40 }}>
                  <Trophy className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{c.contestName}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                    <span>{c.allowedTradingPairs?.[0] === 'All' ? 'Multi-Pair' : c.allowedTradingPairs?.[0]}</span><span className="opacity-40">•</span>
                    <span>Entry ${c.entryFee}</span><span className="opacity-40">•</span>
                    {c.status === 'Open' 
                      ? <span className="font-semibold" style={{ color: 'var(--muted-foreground)' }}>Upcoming</span>
                      : c.status === 'Completed'
                        ? <span className="text-gray-400">Completed</span>
                        : <span className="inline-flex items-center gap-1 font-bold text-red-500"><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>LIVE</span>
                    }
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Prize Pool</div>
                <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>${c.prizePool?.toLocaleString()}</div>
              </div>
            </div>
            <div className="relative mt-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                  <span>{c.currentParticipants}/{c.maxParticipants} joined</span>
                  <span className="font-semibold" style={{ color: 'var(--foreground)', opacity: 0.7 }}>{Math.round(((c.currentParticipants || 0)/(c.maxParticipants || 1))*100)}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ 
                      width: `${Math.round(((c.currentParticipants || 0)/(c.maxParticipants || 1))*100)}%`, 
                      background: 'linear-gradient(90deg, #22D3EE, #06B6D4)',
                      boxShadow: '0 0 12px rgba(34, 211, 238, 0.5)'
                    }} 
                  />
                </div>
              </div>
              <button className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110" style={{ background: 'linear-gradient(135deg,#06B6D4,#0891B2)' }}>Join</button>
            </div>
          </div>
        )) : (
          <div className="py-12 text-center text-sm font-medium text-muted-foreground">No active contests found. Check back later!</div>
        )}
      </div>
    </div>
  );
};

export default ActiveContests;
