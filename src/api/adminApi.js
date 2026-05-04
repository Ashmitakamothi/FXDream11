import { request } from "./index.js";

export const getAdminDashboard = () => { // done
  return request("GET", "/admin/dashboard");
};
export const getAdminSettings = () => { // done
  return request("GET", "/admin/settings");
}
export const updateAdminSettings = (data) => { //done
  return request("PUT", "/admin/settings", data);
}
export const getContests = (data) => { // done
  return request("GET", "/admin/contests", data);
}
export const createContest = (data) => { // done
  return request("POST", "/admin/contests", data);
}
export const getContestByID = (id) => { // done
  return request("GET", `/admin/contests/${id}`);
}
export const updateContestById = (id, data) => { // done
  return request("PUT", `/admin/contests/${id}`, data);
}
export const deleteContestById = (id) => {// done
  return request("DELETE", `/admin/contests/${id}`);
}
export const getAdminContestsByIdJobStatus = (id) => {  // done
  return request("GET", `/admin/contests/${id}/job-status`);
}
export const postAdminContestsByIdPublish = (id) => { // done 
  return request("POST", `/admin/contests/${id}/publish`);
}
export const postAdminContestsByIdComplete = (id) => { // done
  return request("POST", `/admin/contests/${id}/complete`);
}
export const updateAdminContestsByIdPrizeDistribution = (id, data) => { // done
  return request("PUT", `/admin/contests/${id}/prize-distribution`, data);
}
export const getParticipants = (id, data) => { // done
  return request("GET", `/admin/contests/${id}/participants`, data);
}
export const getResults = (id, data) => { // done
  return request("GET", `/admin/contests/${id}/results`, data);
}
export const getClients = (data) => { //done
  return request("GET", `/admin/clients`, data);
}
export const getRevenue = () => {  //done
  return request("GET", `/admin/revenue`);
}
export const getAuditLogs = (id) => { // done
  return request("GET", `/admin/contests/${id}/audit-logs`,);
}
export const getMT5AccountsExecutions = (id) => { //done
  return request("GET", `/admin/contests/${id}/mt5-accounts/executions`);
}
export const getMT5accountsExecutionByID = (contestId, executionId) => { // done
  return request("GET", `/admin/contests/${contestId}/mt5-accounts/executions/${executionId}`);
}
export const mT5AccountsRerun = (id) => { //done
  return request("POST", `/admin/contests/${id}/mt5-accounts/rerun`);
}
export const mt5JobsList = (data) => { // done
  return request("GET", `/admin/mt5-jobs/list`, data);
}
export const mt5JobsStale = (data) => { // done
  return request("GET", `/admin/mt5-jobs/stale`, data);
}
export const cleanUpStale =(staleHours) =>{
  return request("POST", `/admin/mt5-jobs/cleanup-stale`,staleHours);
}
export const markFailedById = (executionId, reason) => {  // done
  const payload = typeof reason === "string" ? { reason } : reason;
  return request("POST", `/admin/mt5-jobs/${executionId}/mark-failed`, payload);
}