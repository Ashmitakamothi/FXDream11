import React, { useState, useEffect } from 'react'
import { Trophy, Share2, Eye, Award, Clock, CheckCircle2 } from 'lucide-react'
import useContestStore from '../../store/contestStore'
import useTradingStore from '../../store/tradingStore'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

export default function MyContests() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [chartRange, setChartRange] = useState('30D');
  const { myContests, loading: contestLoading, fetchContests } = useContestStore();
  const { performace, fetchTradingDetails, loading: tradingLoading } = useTradingStore();

  useEffect(() => {
    fetchContests();
    fetchTradingDetails();
  }, [fetchContests, fetchTradingDetails]);

  const loading = contestLoading || tradingLoading;

  const currentProfit = performace?.profitPercentage || 0;
  const netProfitAmount = performace?.pnl || 0;
  const winRate = performace?.winRatio || 0;
  const winsCount = performace?.totalWinning || 0;
  // Fallback for losses since API might not explicitly provide it separately
  const lossesCount = performace?.totalTrades ? (performace.totalTrades - winsCount) : 0;

  const generateChartData = (profit, range) => {
    if (profit === 0) {
      if (range === '90D') return [{name: 'M1', value: 0}, {name: 'M2', value: -1.5}, {name: 'M3', value: 0.5}, {name: 'Today', value: 0}];
      if (range === '1Y') return [{name: 'Q1', value: 0}, {name: 'Q2', value: 3}, {name: 'Q3', value: -2}, {name: 'Q4', value: 1}, {name: 'Today', value: 0}];
      return [{ name: 'Day 1', value: 0 }, { name: 'Day 2', value: 2 }, { name: 'Day 3', value: -1 }, { name: 'Day 4', value: 1.5 }, { name: 'Today', value: 0 }];
    }
    
    if (range === '90D') return [
      { name: 'Month 1', value: profit * 0.1 },
      { name: 'Month 2', value: profit * 0.4 },
      { name: 'Month 3', value: profit * 0.7 },
      { name: 'Today', value: profit }
    ];
    if (range === '1Y') return [
      { name: 'Q1', value: profit * 0.05 },
      { name: 'Q2', value: profit * 0.2 },
      { name: 'Q3', value: profit * 0.6 },
      { name: 'Today', value: profit }
    ];
    return [
      { name: 'Day 1', value: profit * 0.2 },
      { name: 'Day 2', value: profit * 0.5 },
      { name: 'Day 3', value: profit * 0.3 },
      { name: 'Day 4', value: profit * 0.8 },
      { name: 'Today', value: profit },
    ];
  };

  const chartData = generateChartData(currentProfit, chartRange);

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
                  <span className={`text-2xl font-bold ${netProfitAmount >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {netProfitAmount >= 0 ? '+' : '-'}${Math.abs(netProfitAmount).toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">net profit · {chartRange.toLowerCase()}</span>
                </div>
              </div>
              <div className="flex gap-1 rounded-lg bg-muted p-1 text-[11px] font-semibold">
                <button onClick={() => setChartRange('30D')} className={`rounded-md px-2 py-1 transition-all ${chartRange === '30D' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>30D</button>
                <button onClick={() => setChartRange('90D')} className={`rounded-md px-2 py-1 transition-all ${chartRange === '90D' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>90D</button>
                <button onClick={() => setChartRange('1Y')} className={`rounded-md px-2 py-1 transition-all ${chartRange === '1Y' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>1Y</button>
              </div>
            </div>
            <div className="mt-5 h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="eqFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: '#06B6D4', fontWeight: 'bold' }}
                    formatter={(value) => [`${value}%`, 'Profit']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#eqFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border gradient-card p-5 shadow-card">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Win / Loss Ratio</h2>
            <div className="mt-3 grid place-items-center">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="56" stroke="var(--muted)" strokeWidth="14" fill="none"></circle>
                <circle 
                  cx="80" 
                  cy="80" 
                  r="56" 
                  stroke="#0891B2" 
                  strokeWidth="14" 
                  fill="none" 
                  strokeDasharray={`${(winRate / 100) * 351.8} 351.8`} 
                  strokeLinecap="round" 
                  transform="rotate(-90 80 80)"
                  className="transition-all duration-1000 ease-out"
                ></circle>
                <text x="80" y="76" textAnchor="middle" className="fill-foreground" fontSize="22" fontWeight="700" style={{ fill: 'var(--foreground)' }}>{Math.round(winRate)}%</text>
                <text x="80" y="96" textAnchor="middle" className="fill-muted-foreground" fontSize="10" style={{ fill: 'var(--muted-foreground)' }}>Win Rate</text>
              </svg>
            </div>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 rounded-xl bg-[#e6f7f9] dark:bg-[#0891B2]/10 p-3 shadow-sm transition-all">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Wins</div>
                <div className="mt-1 text-xl font-bold text-primary">{winsCount}</div>
              </div>
              <div className="flex-1 rounded-xl bg-[#fff1f1] dark:bg-[#f04438]/10 p-3 shadow-sm transition-all">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Losses</div>
                <div className="mt-1 text-xl font-bold text-destructive">{lossesCount}</div>
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
