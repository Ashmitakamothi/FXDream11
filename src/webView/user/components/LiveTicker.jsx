import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const marqueeData = [
  "🔥 R*** Patel won $1,200 in Forex Frenzy!",
  "🚀 New contest: EUR/USD Sprint — $10,000 prize pool",
  "🎉 A*** Khan climbed to Rank #1 this week",
  "💰 Daily deposit bonus is live — claim now",
  "⚡ Live: 2,431 traders competing right now",
];

const LiveTicker = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 glass-card">
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40 gradient-primary"></div>

      <div className="relative flex items-center gap-3 px-4 py-2.5">
        
        {/* Live Badge */}
        <span className="live-dot shrink-0"></span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-yellow-600 shrink-0">
          Live
        </span>

        {/* Marquee */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {[...marqueeData, ...marqueeData].map((item, i) => (
              <span
                key={i}
                className="text-sm font-medium text-gray-800/90"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          className="shrink-0 text-gray-500 hover:bg-gray-100 hover:text-black"
        />
      </div>
    </div>
  );
};

export default LiveTicker;