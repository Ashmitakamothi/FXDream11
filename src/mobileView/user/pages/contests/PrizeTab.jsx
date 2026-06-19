import React from 'react';
import { Trophy } from "lucide-react";

const PrizeTab = ({ contest }) => {
  return (
    <div className="space-y-4">
      <div className="bg-[#121a16] rounded-2xl py-6 px-4 text-center">
        <Trophy size={28} className="text-[#20b281] mx-auto mb-3" />
        <p className="text-[11px] font-bold text-[#8ca8a1] uppercase tracking-widest mb-1.5">Total Prize Pool</p>
        <p className="text-[26px] font-extrabold text-[#ffffff]">${Number(contest.prizePool || 0).toFixed(2)}</p>
      </div>

      <div className="bg-[#121a16] rounded-2xl p-4">
        <h3 className="text-[14px] font-extrabold text-[#ffffff] mb-4">Prize Distribution</h3>
        <div className="space-y-3">
          {contest.prizeDistribution.map((item, i) => {
            const isFirst = i === 0;
            const isSecond = i === 1;
            const isThird = i === 2;
            
            let rankBg = "bg-[#25392f] text-[#8ca8a1]";
            if (isFirst) rankBg = "bg-[#d9963e] text-[#ffffff]";
            else if (isSecond) rankBg = "bg-[#9ba3a0] text-[#ffffff]";
            else if (isThird) rankBg = "bg-[#b87645] text-[#ffffff]";

            return (
              <div key={item.rankFrom} className="flex items-center justify-between p-3 rounded-2xl bg-[#14261e]">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold ${rankBg}`}>
                    {item.rankFrom === item.rankTo ? `#${item.rankFrom}` : `#${item.rankFrom}-${item.rankTo}`}
                  </div>
                  <span className="text-[13px] font-bold text-[#ffffff]">{item.prizePercentage}%</span>
                </div>
                <span className="text-[14px] font-extrabold text-[#ffffff]">${Number(item.prizeAmount || 0).toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrizeTab;