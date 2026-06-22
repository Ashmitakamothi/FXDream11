import { request } from "./index.js";

// Contest APIs - 
export const getContests = (data) => {// done 
  return request("GET", "/trader/contest", data);
};
export const getContestByID = (id) => {// done 
  return request("GET", `/trader/contest/${id}`);
}
export const getLeaderboard = (id, data) => {// done 
  return request("GET", `/contests/${id}/leaderboard`, data);
}
export const contestJoin = (id) => { // left 
  return request("POST", `/contests/${id}/join`);
}
export const getMyContest = (data) => {// done 
  return request("GET", "/trader/contest/my-contests", data);
}
export const getMyResult = (id) => { // done 
  return request("GET", `/contests/${id}/my-result`);
}
export const getTopPicks = (data) => {// done 
  return request("GET", "/trader/contest/winning-highlights", data);
}
export const getRanking = (contestId, data) => { // use left 
  return request("GET", `/contests/${contestId}/rankings`, data);
}
export const getParticipentsByTrades = (contestId, userId) => { // done 
  return request("GET", `/contests/${contestId}/participants/${userId}/trades`);
}
export const getParticipentsByPositions = (contestId, userId) => { // done 
  return request("GET", `/contests/${contestId}/participants/${userId}/positions`);
}



// Trading APIs
export const tradingGroupSync = () => { // done
  return request("POST", "/groups/sync");
}
export const getTradingAccount = (contestId) => {
  return request("GET", `/trading/contests/${contestId}/account`,);
}
export const getTradingGroups = () => { // done
  return request("GET", `/admin/mt5-group`);
}
export const getTradingClosed = (contestId) => {
  return request("GET", `/trading/contests/${contestId}/closed`);
}
export const getTradingOpen = (contestId) => {
  return request("GET", `/trading/contests/${contestId}/open`);
}
export const getTradingHistory = (contestId) => {
  return request("GET", `/trading/contests/${contestId}/history`);
}
export const getTradingPerformance = (contestId) => {
  return request("GET", `/trading/contests/${contestId}/performance`);
}

// Wallet APIs - all done
export const getWallet = () => {
  return request("GET", "/wallet");
};
export const walletDeposit = (data) => {
  return request("POST", "/wallet/deposit", data);
};
export const walletWithdraw = (data) => {
  return request("POST", "/wallet/withdraw", data);
};
export const getWalletTransactions = (data) => {
  return request("GET", "/wallet/transactions", data);
}

//Country
export const getCountries = () => {
  return request("GET", "/country");
}