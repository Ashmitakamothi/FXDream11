import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const PerformanceCharts = ({ 
  performace, 
  chartRange, 
  setChartRange, 
  chartData, 
  myContests 
}) => {
  return (
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
  );
};

export default PerformanceCharts;
