import React from 'react';
import { ChevronRight } from "lucide-react";
import {formatDateTime} from "../../../../utils/formatDateTime";
const OverviewTab = ({ contest }) => {
  return (
    <div className="space-y-3">
      <div className="bg-cardM rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)" }}>
        <h3 className="text-[13px] font-bold text-foreground mb-2">About This Contest</h3>
        <p className="text-[12px] text-muted-foreground leading-relaxed">{contest.description}</p>
      </div>

      <div className="bg-cardM rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)" }}>
        <h3 className="text-[13px] font-bold text-foreground mb-2">Rules</h3>
        <div className="space-y-1.5">
          {/* {contest.ruleText?.map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight size={12} className="text-primary mt-0.5 shrink-0" /> */}
              <span className="text-[12px] text-muted-foreground">{contest.rulesText}</span>
            {/* </div>
          ))} */}
        </div>
      </div>

      <div className="bg-cardM rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)" }}>
        <h3 className="text-[13px] font-bold text-foreground mb-2">Allowed Pairs</h3>
        <div className="flex flex-wrap gap-1.5">
          {contest.allowedTradingPairs.map((pair) => (
            <span key={pair} className="px-3 py-1 rounded-full bg-muted text-primary text-[11px] font-semibold">{pair}</span>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="bg-cardM rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)" }}>
        <h3 className="text-[13px] font-bold text-foreground mb-2">Duration</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-[11px] text-muted-foreground">Start</span>
            <span className="text-[11px] font-semibold text-foreground">{formatDateTime(contest.startDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] text-muted-foreground">End</span>
            <span className="text-[11px] font-semibold text-foreground">{formatDateTime(contest.endDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;