import React, { useEffect } from 'react';
import { Crown, Award, Trophy } from "lucide-react";
import useContestStore from '../../../../store/contestStore';

const rankColors = {
  1: { bg: "bg-gradient-to-br from-[#f5c518] to-[#b35d14]", border: "border-[#f7d14d]", text: "text-[#fff9eb]", icon: Crown },
  2: { bg: "bg-gradient-to-br from-[#b8b8b8] to-[#8c8b8b]", border: "border-[#c7c7c7]", text: "text-[#fafafa]", icon: Award },
  3: { bg: "bg-gradient-to-br from-[#cc7a33] to-[#964d2b]", border: "border-[#d9945c]", text: "text-[#fff2eb]", icon: Award },
};

const LeaderboardTab = ({id}) => {
    const { getLeaderboard, leaderboard, loading } = useContestStore();

  useEffect(() => {
    if (id) {
      getLeaderboard(id);
    }
  }, [id, getLeaderboard]);

  if (loading && (!leaderboard || leaderboard.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-[12px] text-muted-foreground animate-pulse">Loading rankings...</p>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-4">
        <Trophy size={32} className="text-[#8ca8a1]" />
        <p className="text-[14px] font-bold text-[#8ca8a1] max-w-[250px] leading-relaxed">
          Rankings will be available once the contest starts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {leaderboard?.map((player) => {
        const isTop3 = player.rank <= 3;
        const rc = rankColors[player.rank];
        const isProfitable = player.profit.startsWith("+");
        return (
          <div key={player.rank} className={`flex items-center gap-3 p-3 rounded-xl ${isTop3 ? "bg-primary/[0.04]" : "bg-card"}`} style={{ boxShadow: isTop3 ? "0 3px 12px rgba(0, 0, 0, 0.06)" : "0 1px 4px rgba(0, 0, 0, 0.03)" }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${rc ? `${rc.bg} ${rc.text}` : "bg-muted text-muted-foreground"}`}>
              {player.rank}
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
              {player.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-foreground truncate">{player.name}</p>
              <p className="text-[10px] text-muted-foreground">Rank #{player.rank}</p>
            </div>

            <div className="text-right shrink-0">
              <p className={`text-[12px] font-bold ${isProfitable ? "text-[#1ba170]" : "text-destructive"}`}>{player.profit}</p>
              <p className={`text-[10px] font-medium ${isProfitable ? "text-[#299e71]" : "text-destructive/70"}`}>{player.returnPct}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardTab;