import React, { useEffect, useState } from 'react';
import { Search, Trophy, Users, Zap, Funnel, ArrowRight } from 'lucide-react';
import useContestStore from '../../store/contestStore';

const Explore = () => {
  const { contests, loading, fetchContests, joinContest } = useContestStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Only fetch if data isn't already available
    if (!contests || contests.length === 0) {
      fetchContests();
    }
  }, [fetchContests, contests]);

  const categories = ['All', 'Forex', 'Metals', 'Crypto', 'Indices'];

  // Handle empty or paginated data
  const contestList = Array.isArray(contests) ? contests : contests?.items || [];
  
  const filteredContests = contestList.filter(c => {
    const matchesSearch = (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (c.symbol || c.pair || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || (c.category || '').toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-6 animate-fade-in">
        
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Explore Contests</h1>
            <p className="text-sm text-muted-foreground">
              Find your next win. {filteredContests.length} contests available now.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
              <input 
                placeholder="Search contests..." 
                className="h-10 w-72 rounded-full border border-cyan-500/20 bg-white dark:bg-gray-900/50 pl-11 pr-4 text-sm outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-gray-400 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="h-10 px-5 flex items-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-cyan-500/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.98] shadow-sm">
              <Funnel className="h-4 w-4 text-gray-400" /> 
              <span>Filters</span>
            </button>
          </div>
        </header>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat 
                ? 'gradient-primary text-white shadow-glow' 
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contest Grid */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[200px] rounded-2xl bg-muted/50 animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredContests.length > 0 ? filteredContests.map((c, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-border gradient-card p-5 shadow-card hover-lift transition-all duration-300">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">{c.contestName || 'Contest'}</div>
                    <div className="text-xs text-muted-foreground">{c.allowedTradingPairs?.[0] === 'All' ? 'Multi-Pair' : c.allowedTradingPairs?.[0]}</div>
                  </div>
                  {c.status === 'Open' ? (
                    <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-bold text-cyan-600 dark:text-cyan-400">Upcoming</span>
                  ) : c.status === 'Completed' ? (
                    <span className="rounded-full bg-gray-500/10 px-2 py-0.5 text-[11px] font-bold text-gray-500">Completed</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold text-destructive">
                      <span className="live-dot" /> LIVE
                    </span>
                  )}
                </div>

                <div className="relative mt-4 grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded-2xl bg-[#F1F5F9] dark:bg-white/5 px-3 py-2.5">
                    <div className="text-[#64748B] dark:text-slate-400 font-medium">Entry</div>
                    <div className="font-bold text-[#0F172A] dark:text-white mt-0.5">${c.entryFee || '0'}</div>
                  </div>
                  <div className="rounded-2xl bg-[#E0F2FE] dark:bg-cyan-900/20 px-3 py-2.5">
                    <div className="text-[#0284C7] dark:text-cyan-400 font-medium inline-flex items-center gap-1">
                      <Trophy className="h-3 w-3" /> Prize
                    </div>
                    <div className="font-bold text-[#0369A1] dark:text-cyan-300 mt-0.5">${c.prizePool?.toLocaleString() || '0'}</div>
                  </div>
                  <div className="rounded-2xl bg-[#F1F5F9] dark:bg-white/5 px-3 py-2.5">
                    <div className="text-[#64748B] dark:text-slate-400 font-medium inline-flex items-center gap-1">
                      <Users className="h-3 w-3" /> Players
                    </div>
                    <div className="font-bold text-[#0F172A] dark:text-white mt-0.5">{c.currentParticipants || '0'}</div>
                  </div>
                </div>

                <button 
                  onClick={() => joinContest(c.contestId)}
                  disabled={c.status === 'Completed'}
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 mt-4 w-full ${c.status === 'Completed' ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'gradient-primary text-white shadow-glow hover:brightness-110'}`}
                >
                  {c.status === 'Completed' ? 'Ended' : 'Join Contest'}
                </button>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-lg font-semibold text-muted-foreground">No contests found</div>
                <p className="text-sm text-muted-foreground/60">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Explore;
