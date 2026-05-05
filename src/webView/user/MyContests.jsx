import React, { useState, useEffect } from 'react'
import { Trophy, Share2, Eye, Award, Clock, CheckCircle2 } from 'lucide-react'
import useContestStore from '../../store/contestStore'

export default function MyContests() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { myContests, loading, fetchContests } = useContestStore();

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  const filtered = myContests.filter(c => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Upcoming') return c.status === 'Open';
    if (activeFilter === 'Live') return c.status === 'Live';
    if (activeFilter === 'Completed') return c.status === 'Completed';
    return true;
  });

  if (loading && myContests.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium">Loading Your Contests...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-6 animate-fade-in">
        <header>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>My Contests</h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Your trading battles, performance and history.</p>
        </header>

        {/* Performance Section */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border gradient-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Contest Performance</h2>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ color: '#0891B2' }}>+$0.00</span>
                  <span className="text-xs text-muted-foreground">net profit · 30d</span>
                </div>
              </div>
              <div className="flex gap-1 rounded-lg bg-muted p-1 text-[11px] font-semibold">
                <button className="rounded-md bg-card px-2 py-1 text-foreground shadow-sm">30D</button>
                <button className="px-2 py-1 text-muted-foreground">90D</button>
                <button className="px-2 py-1 text-muted-foreground">1Y</button>
              </div>
            </div>
            <div className="mt-3 h-[220px]">
              <svg viewBox="0 0 600 220" className="w-full h-full">
                <defs>
                  <linearGradient id="eqFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0891B2" stopOpacity="0.45"></stop>
                    <stop offset="100%" stopColor="#0891B2" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="eqStroke" x1="0" x2="1">
                    <stop offset="0%" stopColor="#0E7490"></stop>
                    <stop offset="100%" stopColor="#0891B2"></stop>
                  </linearGradient>
                </defs>
                <line x1="16" x2="584" y1="55" y2="55" stroke="var(--border)" strokeDasharray="4 6"></line>
                <line x1="16" x2="584" y1="110" y2="110" stroke="var(--border)" strokeDasharray="4 6"></line>
                <line x1="16" x2="584" y1="165" y2="165" stroke="var(--border)" strokeDasharray="4 6"></line>
                <path d="M16,204 L45.8,196.9 L75.7,199.5 L105.6,186.2 L135.5,175.6 L165.4,179.1 L195.3,164.0 L225.2,150.7 L255.1,152.5 L285.0,140.1 L314.9,125.9 L344.8,119.7 L374.7,106.4 L404.6,94.0 L434.5,86.9 L464.4,72.7 L494.3,62.1 L524.2,48.8 L554.1,35.5 L584,16 L584,204 L16,204 Z" fill="url(#eqFill)"></path>
                <path d="M16,204 L45.8,196.9 L75.7,199.5 L105.6,186.2 L135.5,175.6 L165.4,179.1 L195.3,164.0 L225.2,150.7 L255.1,152.5 L285.0,140.1 L314.9,125.9 L344.8,119.7 L374.7,106.4 L404.6,94.0 L434.5,86.9 L464.4,72.7 L494.3,62.1 L524.2,48.8 L554.1,35.5 L584,16" fill="none" stroke="url(#eqStroke)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"></path>
                <circle cx="584" cy="16" r="5" fill="#0891B2"></circle>
                <circle cx="584" cy="16" r="10" fill="#0891B2" opacity="0.25">
                  <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"></animate>
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"></animate>
                </circle>
              </svg>
            </div>
          </div>

          <div className="rounded-2xl border border-border gradient-card p-5 shadow-card">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Win / Loss Ratio</h2>
            <div className="mt-3 grid place-items-center">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="56" stroke="var(--muted)" strokeWidth="14" fill="none"></circle>
                <circle cx="80" cy="80" r="56" stroke="#0891B2" strokeWidth="14" fill="none" strokeDasharray="239.2 112.5" strokeDashoffset="87.9" strokeLinecap="round" transform="rotate(-90 80 80)"></circle>
                <text x="80" y="76" textAnchor="middle" className="fill-foreground" fontSize="22" fontWeight="700" style={{ fill: 'var(--foreground)' }}>0%</text>
                <text x="80" y="96" textAnchor="middle" className="fill-muted-foreground" fontSize="10" style={{ fill: 'var(--muted-foreground)' }}>Win Rate</text>
              </svg>
            </div>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 rounded-xl bg-[#e6f7f9] dark:bg-[#0891B2]/10 p-3 shadow-sm transition-all">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Wins</div>
                <div className="mt-1 text-xl font-bold text-primary">0</div>
              </div>
              <div className="flex-1 rounded-xl bg-[#fff1f1] dark:bg-[#f04438]/10 p-3 shadow-sm transition-all">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Losses</div>
                <div className="mt-1 text-xl font-bold text-destructive">0</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Upcoming', 'Live', 'Completed'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${activeFilter === f ? 'gradient-primary text-white shadow-glow' : 'bg-muted text-muted-foreground hover:bg-muted/70'}`}>{f}</button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length > 0 ? filtered.map((c, i) => (
            <div key={c.id || i} className="rounded-2xl border border-border gradient-card p-5 shadow-card hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-bold" style={{ color: 'var(--foreground)' }}>{c.contestName}</div>
                  <div className="text-xs text-muted-foreground">{c.allowedTradingPairs?.[0] || 'Multi-Pair'}</div>
                </div>
                {c.status === 'Live' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2 py-1 text-[11px] font-bold text-destructive"><span className="live-dot"></span>LIVE</span>
                ) : c.status === 'Open' ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-2 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-500"><Clock className="w-3 h-3" />Upcoming</span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground"><CheckCircle2 className="w-3 h-3" />Done</span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-muted/50 dark:bg-white/5 px-2 py-2"><div className="text-muted-foreground">Entry</div><div className="font-semibold text-foreground text-sm">${c.entryFee}</div></div>
                <div className="rounded-lg bg-muted/50 dark:bg-white/5 px-2 py-2"><div className="text-muted-foreground">Prize</div><div className="font-semibold text-primary text-sm">${c.prizePool?.toLocaleString()}</div></div>
                <div className="rounded-lg bg-muted/50 dark:bg-white/5 px-2 py-2"><div className="text-muted-foreground">Players</div><div className="font-semibold text-foreground text-sm">{c.currentParticipants}</div></div>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11px] text-muted-foreground"><span>Participation</span><span>{Math.round(((c.currentParticipants || 0)/(c.maxParticipants || 1))*100)}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted dark:bg-white/10">
                  <div className="h-full gradient-primary" style={{ width: `${Math.round(((c.currentParticipants || 0)/(c.maxParticipants || 1))*100)}%` }}></div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="h-8 px-3 text-xs flex-1 gradient-primary text-white shadow-glow rounded-md font-medium">View</button>
                <button className="h-8 px-3 text-xs glass border border-border text-foreground rounded-md font-medium">Share</button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-muted-foreground font-medium">
              No contests found for this category.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
