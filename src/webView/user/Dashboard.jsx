import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import DepositTab from './wallet/Deposit'
import WithdrawTab from './wallet/Withdraw'
import '../../web.css'
import useWalletStore from '../../store/walletStore'
import useContestStore from '../../store/contestStore'
import useProfileStore from '../../store/profileStore'
import useTradingStore from '../../store/tradingStore'

// Import Dashboard Sub-components
import LiveTicker from './dashboardComponents/LiveTicker'

import HeroBanner from './dashboardComponents/HeroBanner'
import StatsGrid from './dashboardComponents/StatsGrid'
import WinningHighlights from './dashboardComponents/WinningHighlights'
import ActiveContests from './dashboardComponents/ActiveContests'
import PerformanceCharts from './dashboardComponents/PerformanceCharts'
import RecentActivity from './dashboardComponents/RecentActivity'
import LiveLeaderboard from './dashboardComponents/LiveLeaderboard'

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
      
      <LiveTicker 
        topWinners={topWinners} 
        displayContests={displayContests} 
        performace={performace} 
        displayLeaderboard={displayLeaderboard} 
      />

      <HeroBanner />

      <StatsGrid 
        wallet={wallet}
        setAmount={setAmount}
        setIsDepositOpen={setIsDepositOpen}
        setIsWithdrawOpen={setIsWithdrawOpen}
        myContests={myContests}
        performace={performace}
        userProfile={userProfile}
      />

      <WinningHighlights topWinners={topWinners} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ActiveContests displayContests={displayContests} />

        <PerformanceCharts 
          performace={performace}
          chartRange={chartRange}
          setChartRange={setChartRange}
          chartData={chartData}
          myContests={myContests}
        />

        <RecentActivity 
          transactions={transactions}
          showAllActivity={showAllActivity}
          setShowAllActivity={setShowAllActivity}
        />
      </div>

      <LiveLeaderboard 
        activeContests={activeContests}
        performace={performace}
        displayLeaderboard={displayLeaderboard}
      />

      {/* Deposit Modal */}
      <Modal title="Deposit Funds" open={isDepositOpen} styles={modalStyles} onCancel={() => setIsDepositOpen(false)} footer={null} centered destroyOnClose>
        <DepositTab amount={amount} setAmount={setAmount} onSuccess={() => { setIsDepositOpen(false); setAmount(""); fetchWalletDetails(); }}/>
      </Modal>

      {/* Withdraw Modal */}
      <Modal title="Withdraw Funds" open={isWithdrawOpen} styles={modalStyles} onCancel={() => setIsWithdrawOpen(false)} footer={null} centered destroyOnClose>
        <WithdrawTab amount={amount} setAmount={setAmount} balance={wallet.balance || 0} onSuccess={() => { setIsWithdrawOpen(false); setAmount(""); fetchWalletDetails(); }}/>
      </Modal>
    </div>
  )
}

