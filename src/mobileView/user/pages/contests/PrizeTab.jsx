import React from 'react';
import { Trophy } from "lucide-react";

const PrizeTab = ({ contest }) => {
  
  return (
    <div className="space-y-3">
      <div className={`bg-muted-soft rounded-2xl p-5 text-center relative overflow-hidden card-shine`} style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.07)" }}>
        <Trophy size={28} className="text-primary mx-auto mb-2" />
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Total Prize Pool</p>
        <p className="text-[28px] font-extrabold text-foreground">${contest.prizePool.toLocaleString()}</p>
      </div>

      <div className="bg-cardM rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)" }}>
        <h3 className="text-[13px] font-bold text-foreground mb-3">Prize Distribution</h3>
        <div className="space-y-2">
          {contest.prizeDistribution.map((item, i) => {
            const isTop3 = i < 2;
            return (
              <div key={item.rankFrom} className={`flex items-center justify-between p-3 rounded-xl ${isTop3 ? "bg-muted" : "bg-muted-soft"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-16 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${ i === 0 ? "bg-gradient-to-br from-[#f5c518] to-[#b35d14] text-[#ffffff]" : i === 1 ? "bg-gradient-to-br from-[#b8b8b8] to-[#8c8b8b] text-[#ffffff]" : i === 2 ? "bg-gradient-to-br from-[#cc7a33] to-[#964d2b] text-[#ffffff]" : "bg-muted text-muted-foreground"}`}>
                    {item.rankFrom === item.rankTo ? `#${item.rankFrom}` : `#${item.rankFrom}-${item.rankTo}`}
                  </div>
                  <span className="text-[12px] font-semibold text-foreground">{item.prizePercentage}%</span>
                </div>
                <span className="text-[14px] font-extrabold text-foreground">${item.prizeAmount.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrizeTab;