import React from 'react';
import { ArrowDownToLine, Upload, TrendingUp, TrendingDown } from 'lucide-react';

const RecentActivity = ({ transactions, showAllActivity, setShowAllActivity }) => {
  return (
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
  );
};

export default RecentActivity;
