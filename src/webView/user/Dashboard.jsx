import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import DepositTab from './wallet/Deposit'
import WithdrawTab from './wallet/Withdraw'
import '../../web.css'
import { Link } from 'react-router-dom'
import { Wallet, Trophy, Activity, Zap, Download, Upload, Plus, ArrowRight, ArrowUp, TrendingUp, TrendingDown, ArrowDownToLine, Crown, Medal, Users } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import HeroBanner from '../../assets/hero-banner.jpg'
import useWalletStore from '../../store/walletStore'
import useContestStore from '../../store/contestStore'
import useProfileStore from '../../store/profileStore'
import useTradingStore from '../../store/tradingStore'

export default function Dashboard() {
  const { wallet, transactions, fetchWalletDetails } = useWalletStore();
  const { contests: activeContests, leaderboard: liveLeaderboard, myContests, fetchContests, getLeaderboard } = useContestStore();
  const { userProfile, fetchProfile } = useProfileStore();
  const { performace, fetchTradingDetails } = useTradingStore();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [chartRange, setChartRange] = useState('30D');
  const [showAllActivity, setShowAllActivity] = useState(false);

  const modalStyles = {
    content: { background: "var(--theme-bg)", border: "1px solid var(--border)" },
    header: { background: "transparent", borderBottom: "1px solid var(--border)", color: "var(--theme-text)" },
    body: { background: "transparent", paddingTop: 16 },
  };

  useEffect(() => {
    fetchWalletDetails();
    fetchContests();
    fetchProfile();
    fetchTradingDetails();
  }, [fetchWalletDetails, fetchContests, fetchProfile, fetchTradingDetails]);

  // Fetch leaderboard when contests are loaded
  useEffect(() => {
    if (activeContests && activeContests.length > 0) {
      const firstContestId = activeContests[0].id || activeContests[0].contestId;
      if (firstContestId) {
        getLeaderboard(firstContestId);
      }
    }
  }, [activeContests, getLeaderboard]);

  const displayContests = activeContests || [];
  const displayLeaderboard = liveLeaderboard || [];
  
  const defaultWinners = [
    { name: 'Waiting for data...', amount: '0', time: 'Just now' },
    { name: 'Join a contest', amount: '0', time: 'Just now' }
  ];

  const topWinners = displayLeaderboard.length > 0 ? displayLeaderboard.slice(0, 8).map(u => ({
    name: u.name || u.userName,
    amount: u.profit || u.pnlPercentage || '0',
    time: 'Recent'
  })) : defaultWinners;

  // Generate dynamic chart data based on current profit and selected range
  const currentProfit = performace?.profitPercentage || 0;
  
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

  return (
    <div className='custom-container flex flex-col gap-6 pt-6 pb-12'>

      {/* Live Ticker Alert */}
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

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[200px] w-full border border-black/5 dark:border-white/5 bg-[var(--banner-bg)] transition-colors duration-300">
        <div 
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{ backgroundImage: `url(${HeroBanner})` }}
        ></div>
        <div className="absolute inset-y-0 left-0 w-[85%] md:w-[65%] transition-colors duration-300" style={{ background: 'linear-gradient(to right, var(--banner-bg), color-mix(in srgb, var(--banner-bg) 90%, transparent), transparent)' }}></div>
        <div className="wave-overlay relative z-10"></div>
        <div className="relative z-10 flex h-full w-full items-center justify-between gap-4 px-5 md:px-9">
          <div className="max-w-[60%] md:max-w-[58%]">
            <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur transition-colors duration-300" style={{ backgroundColor: 'var(--banner-badge-bg)', borderColor: 'var(--banner-badge-border)', color: 'var(--banner-badge-text)' }}>
              <Trophy className="h-3 w-3 text-[#F6C453]" aria-hidden="true" />
              Mega Contest
            </div>
            <h2 className="mt-2 text-xl md:text-[28px] font-bold leading-tight tracking-tight transition-colors duration-300">
              <span style={{ color: 'var(--banner-text)' }}>Forex Champions League · <span className="text-[#22D3EE]">$50K Prize</span></span>
            </h2>
            <p className="mt-1 text-xs md:text-sm transition-colors duration-300" style={{ color: 'var(--banner-desc)' }}>Join the season's biggest trading battle. Entry from $10.</p>
            <div className="mt-3 md:hidden">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-11 px-8 text-base rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-[#22D3EE]/70 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.65)] hover:scale-[1.02] transition-all duration-300">
                Join Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="hidden md:block relative z-10 pr-4 lg:pr-12 xl:pr-16">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-11 px-8 text-base rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-[#22D3EE]/70 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.65)] hover:scale-[1.02] transition-all duration-300">
              Join Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: My Wallet */}
        <div className="premium-card relative overflow-hidden rounded-[20px] p-6 flex flex-col justify-between">
          <div className="wave-overlay"></div>
          <div className="relative flex items-start justify-between">
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide" style={{ color: 'var(--foreground)' }}>My Wallet</h3>
              <p className="mt-0.5 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Current Balance</p>
            </div>
            <div className="gold-badge">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="relative text-[2rem] font-bold my-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
            ${wallet?.balance?.toLocaleString() || '0.00'}
          </div>
          <div className="relative grid grid-cols-2 gap-2.5 mt-auto">
            <div onClick={() => { setAmount("100"); setIsDepositOpen(true); }} className="inset-tile px-3 py-2.5 text-center cursor-pointer transition-colors hover:bg-[var(--muted)]">
              <div className="flex justify-center mb-1" style={{ color: 'var(--muted-foreground)' }}><Download className="w-3.5 h-3.5"/></div>
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Deposit</div>
              <div className="mt-1 font-bold text-base" style={{ color: 'var(--foreground)' }}>${wallet?.totalDeposit?.toLocaleString() || '0'}</div>
            </div>
            <div onClick={() => { setAmount(""); setIsWithdrawOpen(true); }} className="inset-tile px-3 py-2.5 text-center cursor-pointer transition-colors hover:bg-[var(--muted)]">
              <div className="flex justify-center mb-1" style={{ color: 'var(--muted-foreground)' }}><Upload className="w-3.5 h-3.5"/></div>
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Withdraw</div>
              <div className="mt-1 font-bold text-base" style={{ color: 'var(--foreground)' }}>${wallet?.totalWithdrawal?.toLocaleString() || '0'}</div>
            </div>
          </div>
        </div>

        {/* Card 2: My Contest Analysis */}
        <div className="premium-card relative overflow-hidden rounded-[20px] p-6 flex flex-col justify-between">
          <div className="wave-overlay"></div>
          <div className="relative flex items-start justify-between">
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide" style={{ color: 'var(--foreground)' }}>My Contest Analysis</h3>
              <p className="mt-0.5 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Performance summary</p>
            </div>
            <div className="gold-badge">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-2 gap-2.5">
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Total Contests</div>
              <div className="mt-1 text-xl font-bold" style={{ color: 'var(--foreground)' }}>{myContests?.length || 0}</div>
            </div>
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Total Winning</div>
              <div className="mt-1 text-xl font-bold" style={{ color: 'var(--foreground)' }}>${performace?.totalWinning?.toLocaleString() || '0'}</div>
            </div>
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Win Ratio</div>
              <div className="mt-1 text-xl font-bold text-cyan-500">{performace?.winRatio || '0'}%</div>
            </div>
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Rank</div>
              <div className="mt-1 text-xl font-bold text-[#FACC15]">#{performace?.rank || userProfile?.rank || '--'}</div>
            </div>
          </div>
        </div>

        {/* Card 3: My Live Score */}
        <div className="premium-card relative overflow-hidden rounded-[20px] p-6 flex flex-col justify-between">
          <div className="wave-overlay"></div>
          <div className="relative flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide" style={{ color: 'var(--foreground)' }}>My Live Score</h3>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="live-dot"></div>
                <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Live now</p>
              </div>
            </div>
            <div className="gold-badge">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="relative space-y-4 mt-auto">
            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(128,128,128,0.15)' }}>
              <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Total Participates</span>
              <span className="font-bold text-[13px]" style={{ color: 'var(--foreground)' }}>{performace?.totalParticipants || '--'}</span>
            </div>
            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(128,128,128,0.15)' }}>
              <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>My Rank</span>
              <span className="font-bold text-[13px] text-[#FACC15]">#{performace?.rank || userProfile?.rank || '--'}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Running PnL</span>
              <div className={`flex items-center gap-1 font-bold text-[13px] ${performace?.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <Activity className="w-3.5 h-3.5" />
                <span>{performace?.pnl >= 0 ? '+' : ''}${performace?.pnl?.toLocaleString() || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Quick Actions */}
        <div className="premium-card relative overflow-hidden rounded-[20px] p-6 flex flex-col justify-between">
          <div className="wave-overlay"></div>
          <div className="relative flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide" style={{ color: 'var(--foreground)' }}>Quick Actions</h3>
              <p className="mt-0.5 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Shortcuts</p>
            </div>
            <div className="gold-badge">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="relative grid grid-cols-3 gap-2.5 mb-5 mt-auto">
            <div onClick={() => { setAmount("100"); setIsDepositOpen(true); }} className="inset-tile py-3.5 flex flex-col items-center justify-center cursor-pointer gap-1.5 transition-colors hover:bg-[var(--muted)]">
              <Download className="w-4 h-4 text-amber-500/80" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--foreground)' }}>Deposit</span>
            </div>
            <div onClick={() => { setAmount(""); setIsWithdrawOpen(true); }} className="inset-tile py-3.5 flex flex-col items-center justify-center cursor-pointer gap-1.5 transition-colors hover:bg-[var(--muted)]">
              <Upload className="w-4 h-4 text-amber-500/80" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--foreground)' }}>Withdraw</span>
            </div>
            <Link to="/explore" className="inset-tile py-3.5 flex flex-col items-center justify-center cursor-pointer gap-1.5 transition-colors hover:bg-[var(--muted)]">
              <Plus className="w-4 h-4 text-amber-500/80" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--foreground)' }}>Join</span>
            </Link>
          </div>
          <div className="relative text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
            <span className="text-amber-500/80 font-medium">Tip:</span> Daily bonus available for the next 4h.
          </div>
        </div>
      </div>

      {/* Winning Highlights */}
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

      {/* Lower Dashboard: Active Contests + Charts + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Active Contests */}
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

        {/* Middle: Equity Curve + Contest Participation */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-2xl border border-border gradient-card shadow-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Equity Curve</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">+{performace?.profitPercentage || '0'}%</span>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>last 30d</span>
                </div>
              </div>
              <div className="flex gap-1 rounded-full p-1 text-[11px] font-semibold" style={{ background: '#eef2f6', border: '1px solid rgba(0,0,0,0.05)' }}>
                <button onClick={() => setChartRange('30D')} className={`rounded-full px-3 py-1 transition-all ${chartRange === '30D' ? 'bg-white shadow-sm' : 'hover:bg-black/5'}`} style={{ color: chartRange === '30D' ? '#0f172a' : '#64748b' }}>30D</button>
                <button onClick={() => setChartRange('90D')} className={`rounded-full px-3 py-1 transition-all ${chartRange === '90D' ? 'bg-white shadow-sm' : 'hover:bg-black/5'}`} style={{ color: chartRange === '90D' ? '#0f172a' : '#64748b' }}>90D</button>
                <button onClick={() => setChartRange('1Y')} className={`rounded-full px-3 py-1 transition-all ${chartRange === '1Y' ? 'bg-white shadow-sm' : 'hover:bg-black/5'}`} style={{ color: chartRange === '1Y' ? '#0f172a' : '#64748b' }}>1Y</button>
              </div>
            </div>
            <div className="mt-5 h-[200px] w-full">
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

          <div className="rounded-2xl border border-border gradient-card shadow-card p-5">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Contest Participation</h3>
            <div className="mt-4 space-y-3">
              {(() => {
                const stats = { Forex: 0, Crypto: 0, Metals: 0, Indices: 0 };
                myContests?.forEach(c => {
                  const pair = c.allowedTradingPairs?.[0]?.toUpperCase() || '';
                  if (pair.includes('XAU') || pair.includes('XAG') || pair.includes('GOLD') || pair.includes('SILVER')) stats.Metals++;
                  else if (pair.includes('BTC') || pair.includes('ETH') || pair.includes('SOL')) stats.Crypto++;
                  else if (pair.includes('US30') || pair.includes('NAS') || pair.includes('DE40')) stats.Indices++;
                  else stats.Forex++;
                });

                const total = myContests?.length || 1;
                return [
                  { label: 'Forex',   value: stats.Forex,   color: '#06B6D4' },
                  { label: 'Crypto',  value: stats.Crypto,  color: '#0891B2' },
                  { label: 'Metals',  value: stats.Metals,  color: '#D4AF37' },
                  { label: 'Indices', value: stats.Indices, color: '#f97316' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span style={{ color: 'var(--muted-foreground)' }}>{item.label}</span>
                      <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                      <div className="h-full rounded-full transition-all duration-700" 
                           style={{ 
                             width: `${(item.value / total) * 100}%`, 
                             background: item.color 
                           }} />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 rounded-2xl border border-border gradient-card shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Recent Activity</h2>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Last 24h</p>
            </div>
            {transactions && transactions.length > 5 && (
              <button 
                onClick={() => setShowAllActivity(!showAllActivity)} 
                className="text-xs font-semibold text-primary hover:underline transition-colors"
              >
                {showAllActivity ? 'Show Less' : `View all (${transactions.length}) →`}
              </button>
            )}
          </div>
          <ul className="mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {transactions && transactions.length > 0 ? transactions.slice(0, showAllActivity ? transactions.length : 5).map((t, i) => {
              const isPositive = t.type?.toLowerCase() === 'deposit' || t.amount > 0;
              return (
                <li key={i} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg shrink-0" 
                       style={{ 
                         background: isPositive ? 'rgba(6,182,212,0.12)' : 'rgba(239,68,68,0.12)', 
                         color: isPositive ? '#06B6D4' : '#ef4444' 
                       }}>
                    {t.type?.toLowerCase() === 'deposit' ? <ArrowDownToLine className="h-4 w-4" /> : 
                     t.type?.toLowerCase() === 'withdrawal' ? <Upload className="h-4 w-4" /> : 
                     isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {t.remark || t.description || t.type || t.category || (isPositive ? 'Deposit' : 'Withdrawal')}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                      {t.createdAt ? new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </div>
                  </div>
                  <div className="text-sm font-bold shrink-0" style={{ color: isPositive ? '#06B6D4' : '#ef4444' }}>
                    {isPositive ? '+' : ''}${Math.abs(t.amount)}
                  </div>
                </li>
              )
            }) : (
              <div className="py-10 text-center text-xs text-muted-foreground">No recent activity</div>
            )}
          </ul>
        </div>
      </div>

      {/* Live Leaderboard */}
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
      {/* Deposit Modal */}
      <Modal title="Deposit Funds" open={isDepositOpen} styles={modalStyles} onCancel={() => setIsDepositOpen(false)} footer={null} centered destroyOnClose>
        <DepositTab amount={amount} setAmount={setAmount} onSuccess={() => { setIsDepositOpen(false); setAmount(""); fetchWalletDetails(); }}/>
      </Modal>

      {/* Withdraw Modal */}
      {/* Withdraw Modal */}
      <Modal title="Withdraw Funds" open={isWithdrawOpen} styles={modalStyles} onCancel={() => setIsWithdrawOpen(false)} footer={null} centered destroyOnClose>
        <WithdrawTab amount={amount} setAmount={setAmount} balance={wallet.balance || 0} onSuccess={() => { setIsWithdrawOpen(false); setAmount(""); fetchWalletDetails(); }}/>
      </Modal>
    </div>
  )
}

