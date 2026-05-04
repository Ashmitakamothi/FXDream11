import React, { useEffect } from 'react';
import useContestStore from '../../../../store/contestStore';
import { Spin } from 'antd';
import { Trophy } from "lucide-react";

const MyResultsTab = ({ id }) => {
  const { myResult, loading: pageLoading, getMyResult } = useContestStore();

  useEffect(() => {
    if (id) {
      getMyResult(id);
    }
  }, [id, getMyResult]);


  if (pageLoading && !myResult) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Spin size="large" />
        <span className=" text-xs animate-pulse ">Fetching your results...</span>
      </div>
    );
  }

  if (!myResult || Object.keys(myResult).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <Trophy size={36} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-[15px] font-bold text-foreground">No results data</p>
          <p className="text-[12px] text-muted-foreground">Rankings will appear once the contest starts and participants begin trading.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-3">
      <div className={`bg-cardM rounded-2xl p-5 text-center relative overflow-hidden card-shine`} style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.07)" }}>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Your Rank</p>
        <p className="text-[36px] font-extrabold text-foreground leading-none">#{myResult?.rank}</p>
        <p className="text-[11px] text-muted-foreground mt-1">out of {myResult?.totalParticipants} participants</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Net Profit", value: myResult?.profitPercent, color: "text-[#1ba170]" },
          { label: "Return %", value: myResult?.returnPct, color: "text-[#1ba170]" },
          { label: "Final Balance", value: myResult?.finalBalance, color: "text-foreground" },
          { label: "Prize Earned", value: myResult?.prizeEarned, color: "text-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="bg-cardM rounded-xl p-3 text-center" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}>
            <p className={`text-[16px] font-extrabold ${stat.color} leading-none`}>{stat.value}</p>
            <p className="text-[9px] font-medium text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-cardM rounded-2xl p-4 flex items-center justify-between" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}>
        <span className="text-[12px] font-semibold text-foreground">Payout Status</span>
        <span className="px-3 py-1 rounded-full bg-[#fdf3e1] dark:bg-[#392e19] text-[#b87a14] dark:text-[#d9a459] text-[11px] font-bold">
          {myResult?.status}
        </span>
      </div>
    </div>
  );
};

export default MyResultsTab;