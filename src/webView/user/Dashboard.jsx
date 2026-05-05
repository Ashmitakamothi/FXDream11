import React from 'react'
import '../../web.css'
import { Wallet, Trophy, Activity, Zap, Download, Upload, Plus, ArrowRight, ArrowUp, TrendingUp, TrendingDown, ArrowDownToLine, Crown, Medal, Users } from 'lucide-react'
import HeroBanner from '../../assets/hero-banner.jpg'

export default function Dashboard() {
  return (
    <div className='custom-container flex flex-col gap-6 pt-6 pb-12'>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[200px] w-full border border-black/5 dark:border-white/5 bg-[var(--banner-bg)] transition-colors duration-300">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{ backgroundImage: `url(${HeroBanner})` }}
        ></div>
        
        {/* The Missing "Shade" / Gradient Overlay */}
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
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-11 px-8 text-base rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-[#22D3EE]/70 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.65)] hover:scale-[1.02] transition-all duration-300">
                Join Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="hidden md:block relative z-10 pr-4 lg:pr-12 xl:pr-16">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-11 px-8 text-base rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-[#22D3EE]/70 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.65)] hover:scale-[1.02] transition-all duration-300">
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
            $8,420.50
          </div>
          
          <div className="relative grid grid-cols-2 gap-2.5 mt-auto">
            <div className="inset-tile px-3 py-2.5 text-center cursor-pointer transition-colors">
              <div className="flex justify-center mb-1" style={{ color: 'var(--muted-foreground)' }}><Download className="w-3.5 h-3.5"/></div>
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Deposit</div>
              <div className="mt-1 font-bold text-base" style={{ color: 'var(--foreground)' }}>$12,500</div>
            </div>
            <div className="inset-tile px-3 py-2.5 text-center cursor-pointer transition-colors">
              <div className="flex justify-center mb-1" style={{ color: 'var(--muted-foreground)' }}><Upload className="w-3.5 h-3.5"/></div>
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Withdraw</div>
              <div className="mt-1 font-bold text-base" style={{ color: 'var(--foreground)' }}>$4,080</div>
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
              <div className="mt-1 text-xl font-bold" style={{ color: 'var(--foreground)' }}>142</div>
            </div>
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Total Winning</div>
              <div className="mt-1 text-xl font-bold" style={{ color: 'var(--foreground)' }}>$6.2K</div>
            </div>
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Win Ratio</div>
              <div className="mt-1 text-xl font-bold text-cyan-500">68%</div>
            </div>
            <div className="inset-tile px-3 py-2.5">
              <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Rank</div>
              <div className="mt-1 text-xl font-bold text-[#FACC15]">#24</div>
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
              <span className="font-bold text-[13px]" style={{ color: 'var(--foreground)' }}>37</span>
            </div>
            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(128,128,128,0.15)' }}>
              <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>My Rank</span>
              <span className="font-bold text-[13px] text-[#FACC15]">#24</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>Running PnL</span>
              <div className="flex items-center gap-1 text-green-500 font-bold text-[13px]">
                <Activity className="w-3.5 h-3.5" />
                <span>+$379.73</span>
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
            <div className="inset-tile py-3.5 flex flex-col items-center justify-center cursor-pointer gap-1.5 transition-colors">
              <Download className="w-4 h-4 text-amber-500/80" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--foreground)' }}>Deposit</span>
            </div>
            <div className="inset-tile py-3.5 flex flex-col items-center justify-center cursor-pointer gap-1.5 transition-colors">
              <Upload className="w-4 h-4 text-amber-500/80" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--foreground)' }}>Withdraw</span>
            </div>
            <div className="inset-tile py-3.5 flex flex-col items-center justify-center cursor-pointer gap-1.5 transition-colors">
              <Plus className="w-4 h-4 text-amber-500/80" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--foreground)' }}>Join</span>
            </div>
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
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Live wins from the community</p>
        </div>
        <div className="mt-3">
          <div className="group relative overflow-hidden">
            <div className="flex w-max gap-3 animate-marquee-slow group-hover:[animation-play-state:paused]">
              {[...winners, ...winners].map((w, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-3 min-w-[240px] rounded-[14px] px-4 py-3 overflow-hidden transition-all duration-300 hover:-translate-y-[3px]
                    border border-[#E2E8F0] bg-white shadow-[0_2px_8px_-4px_rgba(15,23,42,0.08)]
                    hover:bg-[#F8FAFC] hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_8px_20px_-8px_rgba(212,175,55,0.30)]
                    dark:border-white/[0.06] dark:bg-[#1C2433]
                    dark:hover:bg-[#232E41] dark:hover:border-white/10"
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(34,197,94,0.03) 50%, transparent 80%)' }}
                  />
                  <div
                    className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-[#FFF7E6] border-[rgba(212,175,55,0.25)] dark:bg-white/[0.04] dark:border-white/[0.08]"
                    style={{ boxShadow: '0 0 10px -2px rgba(212,175,55,0.35)' }}
                  >
                    <Trophy className="h-4 w-4" style={{ color: '#D4AF37' }} strokeWidth={1.75} />
                  </div>
                  <div className="relative leading-tight whitespace-nowrap flex-1">
                    <div className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{w.name}</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{w.time}</div>
                  </div>
                  <div className="relative ml-2 inline-flex items-center gap-1 text-sm font-bold text-[#16A34A] dark:text-[#22C55E]">
                    <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />
                    ${w.amount}
                  </div>
                </div>
              ))}
            </div>
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: 'linear-gradient(to right, var(--theme-bg), transparent)' }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: 'linear-gradient(to left, var(--theme-bg), transparent)' }} />
          </div>
        </div>
      </section>

      {/* Lower Dashboard: Active Contests + Charts + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Active Contests - col 5 */}
        <div className="lg:col-span-5 rounded-2xl border border-border gradient-card shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Active Contests</h2>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Join live now</p>
            </div>
            <a href="/explore" className="text-xs font-semibold text-primary hover:underline">View all →</a>
          </div>
          <div className="mt-4 space-y-2.5">
            {contests.map((c, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[18px] p-3.5 transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'var(--lovable-card)' }}>
                <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
                <div className="relative flex items-center gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="gold-badge shrink-0" style={{ height: 40, width: 40 }}>
                      <Trophy className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{c.name}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                        <span>{c.pair}</span><span className="opacity-40">•</span>
                        <span>Entry ${c.entry}</span><span className="opacity-40">•</span>
                        {c.status === 'live'
                          ? <span className="inline-flex items-center gap-1 font-bold text-red-500"><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>LIVE</span>
                          : <span className="font-semibold" style={{ color: 'var(--muted-foreground)' }}>Upcoming</span>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Prize Pool</div>
                    <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>${c.prize}</div>
                  </div>
                </div>
                <div className="relative mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                      <span>{c.joined}/{c.total} joined</span>
                      <span className="font-semibold" style={{ color: 'var(--foreground)', opacity: 0.7 }}>{c.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: 'linear-gradient(90deg,#06B6D4,#0891B2)', boxShadow: '0 0 8px rgba(6,182,212,0.4)' }} />
                    </div>
                  </div>
                  <button className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110" style={{ background: 'linear-gradient(135deg,#06B6D4,#0891B2)' }}>Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Equity Curve + Contest Participation */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Equity Curve */}
          <div className="rounded-2xl border border-border gradient-card shadow-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Equity Curve</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">+212%</span>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>last 30d</span>
                </div>
              </div>
              <div className="flex gap-1 rounded-full p-1 text-[11px] font-semibold" style={{ background: '#eef2f6', border: '1px solid rgba(0,0,0,0.05)' }}>
                <button className="rounded-full px-3 py-1 bg-white shadow-sm" style={{ color: '#0f172a' }}>30D</button>
                <button className="px-3 py-1" style={{ color: '#64748b' }}>90D</button>
                <button className="px-3 py-1" style={{ color: '#64748b' }}>1Y</button>
              </div>
            </div>
            <div className="mt-3 h-[200px]">
              <svg viewBox="0 0 600 220" className="w-full h-full">
                <defs>
                  <linearGradient id="eqFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="16" x2="584" y1="55" y2="55" stroke="rgba(128,128,128,0.08)" strokeDasharray="4 6" />
                <line x1="16" x2="584" y1="110" y2="110" stroke="rgba(128,128,128,0.08)" strokeDasharray="4 6" />
                <line x1="16" x2="584" y1="165" y2="165" stroke="rgba(128,128,128,0.08)" strokeDasharray="4 6" />
                
                {/* Area Fill Path (Teal) */}
                <path d="M16,160 L75,155 L135,135 L195,125 L255,128 L315,105 L375,95 L435,85 L495,65 L555,45 L584,20 L584,210 L16,210 Z" fill="url(#eqFill)" />
                
                {/* Top Border Path (Teal) */}
                <path d="M16,160 L75,155 L135,135 L195,125 L255,128 L315,105 L375,95 L435,85 L495,65 L555,45 L584,20" fill="none" stroke="#06B6D4" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                
                {/* Final Teal Point */}
                <circle cx="584" cy="20" r="4.5" fill="#06B6D4" />
                <circle cx="584" cy="20" r="10" fill="#06B6D4" opacity="0.15">
                  <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>

          {/* Contest Participation */}
          <div className="rounded-2xl border border-border gradient-card shadow-card p-5">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Contest Participation</h3>
            <div className="mt-4 space-y-3">
              {participation.map((item, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span style={{ color: 'var(--muted-foreground)' }}>{item.label}</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 rounded-2xl border border-border gradient-card shadow-card p-5">
          <div>
            <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Recent Activity</h2>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Last 24h</p>
          </div>
          <ul className="mt-4 space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg shrink-0" style={{ background: a.bg, color: a.color }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-medium" style={{ color: 'var(--foreground)' }}>{a.label}</div>
                  <div className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>{a.time}</div>
                </div>
                <div className="text-sm font-bold shrink-0" style={{ color: a.color }}>{a.amount}</div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Live Leaderboard */}
      <section className="rounded-2xl border border-border gradient-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>🥇 Live Leaderboard</h2>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Top 10 traders this week</p>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <Users className="h-4 w-4" /> 12,481 active
          </span>
        </div>
        
        {/* Top 3 Grid */}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {/* Rank 1 */}
          <div className="relative overflow-hidden rounded-2xl p-5 border transition-all duration-300" 
               style={{ 
                 background: 'rgba(212, 175, 55, 0.15)',
                 borderColor: 'rgba(212, 175, 55, 0.25)'
               }}>
            <div className="absolute -right-4 -top-4 opacity-20">
              <Crown className="h-20 w-20 text-[var(--gold)]" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--muted-foreground)' }}>Rank #1</div>
            <div className="mt-1 text-lg font-bold" style={{ color: 'var(--foreground)' }}>Aarav M.</div>
            <div className="mt-2 text-2xl font-black text-primary">+38.4%</div>
          </div>
          
          {/* Rank 2 */}
          <div className="relative overflow-hidden rounded-2xl p-5 border transition-all duration-300"
               style={{ 
                 background: 'rgba(249, 115, 22, 0.06)',
                 borderColor: 'rgba(249, 115, 22, 0.1)'
               }}>
            <div className="absolute -right-4 -top-4 opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(71, 85, 105, 0.6)' }}>
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
                <path d="M11 12 5.12 2.2"></path>
                <path d="m13 12 5.88-9.8"></path>
                <path d="M8 7h8"></path>
                <circle cx="12" cy="17" r="5"></circle>
                <path d="M12 18v-2h-.5"></path>
              </svg>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--muted-foreground)' }}>Rank #2</div>
            <div className="mt-1 text-lg font-bold" style={{ color: 'var(--foreground)' }}>Diya S.</div>
            <div className="mt-2 text-2xl font-black text-primary">+34.1%</div>
          </div>
          
          {/* Rank 3 */}
          <div className="relative overflow-hidden rounded-2xl p-5 border transition-all duration-300"
               style={{ 
                 background: 'rgba(6, 182, 212, 0.06)',
                 borderColor: 'rgba(6, 182, 212, 0.1)'
               }}>
            <div className="absolute -right-4 -top-4 opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(71, 85, 105, 0.6)' }}>
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
                <path d="M11 12 5.12 2.2"></path>
                <path d="m13 12 5.88-9.8"></path>
                <path d="M8 7h8"></path>
                <circle cx="12" cy="17" r="5"></circle>
                <path d="M12 18v-2h-.5"></path>
              </svg>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--muted-foreground)' }}>Rank #3</div>
            <div className="mt-1 text-lg font-bold" style={{ color: 'var(--foreground)' }}>Rohan K.</div>
            <div className="mt-2 text-2xl font-black text-primary">+29.7%</div>
          </div>
        </div>
        
        {/* Leaderboard Table */}
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
              {leaderboard.map((item, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="py-2.5 font-semibold" style={{ color: 'var(--muted-foreground)' }}>#{item.rank}</td>
                  <td className="py-2.5" style={{ color: 'var(--foreground)' }}>{item.name}</td>
                  <td className="py-2.5 text-right font-semibold text-primary">+{item.profit}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

const winners = [
  { name: 'R*** Patel',  time: '2h ago', amount: '1,200' },
  { name: 'A*** Khan',   time: '3h ago', amount: '850'   },
  { name: 'M*** Singh',  time: '4h ago', amount: '2,100' },
  { name: 'S*** Verma',  time: '5h ago', amount: '540'   },
  { name: 'K*** Rao',    time: '6h ago', amount: '3,300' },
  { name: 'P*** Shah',   time: '7h ago', amount: '980'   },
  { name: 'N*** Iyer',   time: '8h ago', amount: '1,750' },
  { name: 'T*** Das',    time: '9h ago', amount: '460'   },
]

const contests = [
  { name: 'Forex Frenzy', pair: 'EUR/USD', entry: 25,  prize: '5,000',  joined: 482, total: 753,  pct: 64, status: 'live'     },
  { name: 'Pip Hunters',  pair: 'GBP/JPY', entry: 10,  prize: '2,000',  joined: 318, total: 757,  pct: 42, status: 'live'     },
  { name: 'Gold Rush',    pair: 'XAU/USD', entry: 50,  prize: '12,000', joined: 712, total: 5933, pct: 12, status: 'upcoming' },
  { name: 'USD Sprint',   pair: 'USD/JPY', entry: 5,   prize: '800',    joined: 211, total: 240,  pct: 88, status: 'live'     },
  { name: 'Cable Clash',  pair: 'GBP/USD', entry: 20,  prize: '3,500',  joined: 256, total: 826,  pct: 31, status: 'live'     },
]

const participation = [
  { label: 'Forex',   value: 78, color: '#06B6D4' },
  { label: 'Crypto',  value: 54, color: '#0891B2' },
  { label: 'Metals',  value: 32, color: '#D4AF37' },
  { label: 'Indices', value: 18, color: '#f97316' },
]

const recentActivity = [
  { label: 'Won Forex Frenzy', time: '2m ago', amount: '+$320', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',  icon: <TrendingUp  className="h-4 w-4" /> },
  { label: 'Deposit',          time: '1h ago', amount: '+$500', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',  icon: <ArrowDownToLine className="h-4 w-4" /> },
  { label: 'Lost Pip Hunters', time: '3h ago', amount: '$25',   color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  icon: <TrendingDown className="h-4 w-4" /> },
  { label: 'Won USD Sprint',   time: '3h ago', amount: '+$140', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',  icon: <TrendingUp  className="h-4 w-4" /> },
  { label: 'Deposit',          time: '1d ago', amount: '+$200', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',  icon: <ArrowDownToLine className="h-4 w-4" /> },
  { label: 'Lost Cable Clash', time: '2d ago', amount: '$50',   color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  icon: <TrendingDown className="h-4 w-4" /> },
]

const leaderboard = [
  { rank: 4,  name: 'Isha P.',    profit: '25.2' },
  { rank: 5,  name: 'Vivaan R.',  profit: '22.8' },
  { rank: 6,  name: 'Anaya T.',   profit: '19.5' },
  { rank: 7,  name: 'Kabir N.',   profit: '17'   },
  { rank: 8,  name: 'Mira J.',    profit: '14.6' },
  { rank: 9,  name: 'Arjun L.',   profit: '12.3' },
  { rank: 10, name: 'Sara V.',    profit: '9.1'  },
]
