import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useProfileStore from "../store/profileStore";
import useTradingStore from "../store/tradingStore";
import useContestStore from "../store/contestStore";
import { socketService } from "../services/socketService";

const SocketManager = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const userProfile = useProfileStore((state) => state.userProfile);
  const account = useTradingStore((state) => state.account);
  const myContests = useContestStore((state) => state.myContests);

  useEffect(() => {
    // Make account optional since the API is returning 404 right now
    if (isLogin && userProfile && myContests?.length > 0) {
      const loginId = userProfile.id || userProfile.userId;
      
      // Try to get terminalId from account, fallback to loginId if not available
      const terminalId = account?.login || account?.mt5Id || account?.terminalId || account?.accountId || loginId;
      
      const activeContest = myContests[0];
      const contestId = activeContest.id || activeContest.contestId;

      if (loginId && terminalId && contestId) {
        socketService.connect({
          loginId,
          terminalId,
          contestId
        });
      }
    } else {
      socketService.disconnect();
    }

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, [isLogin, userProfile, account, myContests]);

  return null;
};

export default SocketManager;
