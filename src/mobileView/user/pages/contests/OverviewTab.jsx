import React from 'react';
import { ChevronRight } from "lucide-react";
import { formatDateTime } from "../../../../utils/formatDateTime";

const OverviewTab = ({ contest }) => {
  return (
    <div className="space-y-4">
      {/* About This Contest */}
      <div className="bg-[#121a16] rounded-2xl p-4">
        <h3 className="text-[14px] font-extrabold text-[#ffffff] mb-3">About This Contest</h3>
        <p className="text-[12px] text-[#8ca8a1] leading-relaxed whitespace-pre-wrap">{contest.description}</p>
      </div>

      {/* Rules */}
      <div className="bg-[#121a16] rounded-2xl p-4">
        <h3 className="text-[14px] font-extrabold text-[#ffffff] mb-3">Rules</h3>
        <div className="space-y-2">
          {contest.rulesText?.split('\n').filter(Boolean).map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight size={14} className="text-[#1fa97a] mt-[2px] shrink-0" />
              <span className="text-[12px] text-[#8ca8a1] leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Allowed Pairs */}
      <div className="bg-[#121a16] rounded-2xl p-4">
        <h3 className="text-[14px] font-extrabold text-[#ffffff] mb-3">Allowed Pairs</h3>
        <div className="flex flex-wrap gap-3">
          {contest.allowedTradingPairs?.map((pair) => (
            <span key={pair} className="text-[#20b281] text-[13px] font-bold tracking-wide">
              {pair}
            </span>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="bg-[#121a16] rounded-2xl p-4">
        <h3 className="text-[14px] font-extrabold text-[#ffffff] mb-3">Duration</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#8ca8a1]">Start</span>
            <span className="text-[12px] font-bold text-[#ffffff]">{formatDateTime(contest.startDate)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#8ca8a1]">End</span>
            <span className="text-[12px] font-bold text-[#ffffff]">{formatDateTime(contest.endDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;