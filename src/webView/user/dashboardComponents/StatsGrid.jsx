import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Trophy, Activity, Zap, Download, Upload, Plus } from 'lucide-react';

const StatsGrid = ({ 
  wallet, 
  setAmount, 
  setIsDepositOpen, 
  setIsWithdrawOpen, 
  myContests, 
  performace, 
  userProfile 
}) => {
  return (
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
  );
};

export default StatsGrid;
