import { create } from 'zustand';
import * as adminApi from '../api/adminApi';

const useAdminStore = create((set, get) => ({
    dashboardData: null,
    settings: null,
    contests: [],
    totalContests: [],
    contestDetails: null,
    participants: [],
    results: [],
    resultsPagination: null,
    clients: [],
    revenue: [],
    mt5ExecutionsGroup: [],
    mt5AccountsExecutions: [],
    mt5AccountsExecutionsLoading: false,
    mt5ExecutionDetail: null,
    mt5ExecutionDetailLoading: false,
    mt5Jobs: [],
    mt5StaleJobs: null,
    loading: false,
    error: null,
    auditLogs: [],
    prizeData: [],
    jobStatus: null,


    fetAllAdminDashboardData: async () => {
        set({ loading: true, error: null });
        try {
            const { fetchAdminDashboard, fetchAdminSettings, getRevenueDetail, fetchClients, fetchJobs } = get();
            await Promise.all([
                fetchAdminDashboard(),
                fetchAdminSettings(),
                getRevenueDetail(),
                fetchClients(),
                fetchJobs(),
            
            ]);
            set({ loading: false });
        } catch (error) {
            console.error("Error fetching admin dashboard data:", error);
            set({ error: error?.message || "Failed to fetch dashboard data", loading: false });
        }
    },

    fetchAdminDashboard: async () => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getAdminDashboard();
            set({ dashboardData: res?.data, loading: false });
        } catch (error) {
            console.error("Error fetching admin dashboard:", error);
            set({ error: error?.message || "Failed to fetch dashboard data", loading: false });
        }
    },

    fetchAdminSettings: async () => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getAdminSettings();
            set({ settings: res?.data, loading: false });
        } catch (error) {
            console.error("Error fetching admin settings:", error);
            set({ error: error?.message || "Failed to fetch settings", loading: false });
        }
    },

    updateAdminSettings: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.updateAdminSettings(data);
            set({ settings: res?.data, loading: false });
            return res; // Return response for UI feedback
        } catch (error) {
            console.error("Error updating admin settings:", error);
            set({ error: error?.message || "Failed to update settings", loading: false });
            throw error; // Re-throw to allow component to handle
        }
    },

    // Contest Management Actions
    fetchAdminContests: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getContests(params);
            set({
                contests: res?.data?.items || (Array.isArray(res?.data) ? res.data : []),
                totalContests: res?.data?.totalCount || (Array.isArray(res?.data) ? res.data.length : 0),
                loading: false
            });
        } catch (error) {
            console.error("Error fetching admin contests:", error);
            set({ error: error?.message || "Failed to fetch contests", loading: false });
        }
    },

    createAdminContest: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.createContest(data);
            // Optionally, refresh the list of contests after creation
            // get().fetchAdminContests();
            set({ loading: false });
            return res;
        } catch (error) {
            console.error("Error creating contest:", error);
            set({ error: error?.message || "Failed to create contest", loading: false });
            throw error;
        }
    },

    fetchAdminContestByID: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getContestByID(id);
            set({ contestDetails: res?.data, loading: false });
        } catch (error) {
            console.error("Error fetching contest details:", error);
            set({ error: error?.message || "Failed to fetch contest details", loading: false });
        }
    },

    getRevenueDetail: async () => {
        try {
            const res = await adminApi.getRevenue();
            set({ revenue: res?.data, loading: false });

        }
        catch (error) {
            console.error("Error fetching revenue details:", error);
            set({ error: error?.message || "Failed to fetch revenue details", loading: false });
        }
    },

    fetchClients: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getClients(params);
            set({
                clients: res?.data?.items || (Array.isArray(res?.data) ? res.data : []),
                loading: false
            });
        } catch (error) {
            console.error("Error fetching admin clients:", error);
            set({ error: error?.message || "Failed to fetch clients", loading: false });
        }
    },

    fetchJobs: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.mt5JobsList(params)
            set({ mt5Jobs: res, loading: false })
        }
        catch (error) {
            set({ error: error?.message || "Failed to fetch jobs", loading: false });
        }
    },

    fetchStaleJobs: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.mt5JobsStale(params);
            set({ mt5StaleJobs: res?.data, loading: false });
        } catch (error) {
            set({ error: error?.message || "Failed to fetch stale jobs", loading: false });
        }
    },

    fetchMT5AccountsExecutions: async (contestId) => {
        if (!contestId) return;
        set({ mt5AccountsExecutionsLoading: true, error: null });
        try {
            const res = await adminApi.getMT5AccountsExecutions(contestId);
            let list = [];
            const payload = res?.data !== undefined ? res.data : res;
            if (Array.isArray(payload)) {
                list = payload;
            } else if (Array.isArray(payload?.items)) {
                list = payload.items;
            } else if (Array.isArray(payload?.data)) {
                list = payload.data;
            }
            set({ mt5AccountsExecutions: list, mt5AccountsExecutionsLoading: false });
            return res;
        } catch (error) {
            console.error("Error fetching MT5 accounts executions:", error);
            set({
                error: error?.message || "Failed to fetch MT5 accounts executions",
                mt5AccountsExecutions: [],
                mt5AccountsExecutionsLoading: false,
            });
        }
    },

    fetchMT5ExecutionById: async (contestId, executionId) => {
        if (!contestId || !executionId) return;
        set({ mt5ExecutionDetailLoading: true, error: null, mt5ExecutionDetail: null });
        try {
            const res = await adminApi.getMT5accountsExecutionByID(contestId, executionId);
            const payload = res?.data !== undefined ? res.data : res;
            set({ mt5ExecutionDetail: payload, mt5ExecutionDetailLoading: false });
            return res;
        } catch (error) {
            console.error("Error fetching MT5 execution detail:", error);
            set({
                error: error?.message || "Failed to fetch execution detail",
                mt5ExecutionDetail: null,
                mt5ExecutionDetailLoading: false,
            });
        }
    },

    rerunMT5Accounts: async (contestId) => {
        if (!contestId) return null;
        try {
            const res = await adminApi.mT5AccountsRerun(contestId);
            return res;
        } catch (error) {
            console.error("Error rerunning MT5 accounts:", error);
            throw error;
        }
    },

    markFailedMT5Execution: async (executionId, reason) => {
        if (!executionId) return null;
        set({ loading: true, error: null });
        try {
            const res = await adminApi.markFailedById(executionId, reason);
            set({ loading: false });
            return res;
        } catch (error) {
            console.error("Error marking MT5 execution as failed:", error);
            set({ error: error?.message || "Failed to mark execution as failed", loading: false });
            throw error;
        }
    },

    fetchParticipants: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getParticipants(id, data);
            set({ participants: res, loading: false })
        } catch (error) {
            console.error("Error fetching admin participants:", error);
            set({ error: error?.message || "Failed to fetch participants", loading: false });
        }
    },

    fetchContestResults: async (id, params) => {
        const raw = params || {};
        const PageNumber = raw.PageNumber ?? raw.pageNumber ?? 1;
        const PageSize = raw.PageSize ?? raw.pageSize ?? 10;
        const { pageNumber: _pn, pageSize: _ps, ...rest } = raw;
        const query = { ...rest, PageNumber, PageSize };

        set({ loading: true, error: null });
        try {
            const res = await adminApi.getResults(id, query);
            let list = [];
            if (Array.isArray(res)) {
                list = res;
            } else if (Array.isArray(res?.data)) {
                list = res.data;
            } else if (Array.isArray(res?.data?.items)) {
                list = res.data.items;
            }

            const p = res?.pagination;
            const resultsPagination = p
                ? {
                      pageNumber: p.pageNumber ?? PageNumber,
                      pageSize: p.pageSize ?? PageSize,
                      totalPages: p.totalPages ?? 0,
                      totalCount: p.totalCount ?? list.length,
                      hasPreviousPage: !!p.hasPreviousPage,
                      hasNextPage: !!p.hasNextPage,
                  }
                : {
                      pageNumber: PageNumber,
                      pageSize: PageSize,
                      totalPages: list.length ? 1 : 0,
                      totalCount: list.length,
                      hasPreviousPage: false,
                      hasNextPage: false,
                  };

            set({ results: list, resultsPagination, loading: false });
            return res;
        } catch (error) {
            console.error("Error fetching contest results:", error);
            set({
                error: error?.message || "Failed to fetch contest results",
                results: [],
                resultsPagination: null,
                loading: false,
            });
        }
    },

    updatePrizeDistribution: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.updateAdminContestsByIdPrizeDistribution(id, data);
            const updatedContest = res?.data || res;

            set((state) => ({
                prizeData: updatedContest,
                contests: (state.contests || []).map((contest) =>
                    String(contest?.contestId) === String(id)
                        ? { ...contest, ...updatedContest }
                        : contest
                ),
                contestDetails:
                    state.contestDetails && String(state.contestDetails?.contestId) === String(id)
                        ? { ...state.contestDetails, ...updatedContest }
                        : state.contestDetails,
                loading: false
            }));

            return updatedContest;
        } catch (error) {
            console.error("Error updating prize distribution:", error);
            set({ error: error?.message || "Failed to update prize distribution", loading: false });
            throw error;
        }
    },

    deleteAdminContestByID: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.deleteContestById(id);

            set((state) => ({
                contests: (state.contests || []).filter(
                    (contest) => String(contest?.contestId) !== String(id)
                ),
                contestDetails:
                    state.contestDetails && String(state.contestDetails?.contestId) === String(id)
                        ? null
                        : state.contestDetails,
                totalContests:
                    typeof state.totalContests === "number" && state.totalContests > 0
                        ? state.totalContests - 1
                        : state.totalContests,
                dashboardData: state.dashboardData
                    ? {
                        ...state.dashboardData,
                        totalContests:
                            typeof state.dashboardData?.totalContests === "number" && state.dashboardData.totalContests > 0
                                ? state.dashboardData.totalContests - 1
                                : state.dashboardData.totalContests,
                    }
                    : state.dashboardData,
                loading: false,
            }));

            return res?.data || res;
        } catch (error) {
            console.error("Error deleting contest:", error);
            set({ error: error?.message || "Failed to delete contest", loading: false });
            throw error;
        }
    },

    publishAdminContestByID: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.postAdminContestsByIdPublish(id);
            const publishedContest = res?.data && typeof res.data === "object" ? res.data : null;

            set((state) => ({
                contests: (state.contests || []).map((contest) =>
                    String(contest?.contestId) === String(id)
                        ? { ...contest, ...(publishedContest || {}), status: publishedContest?.status || "open" }
                        : contest
                ),
                contestDetails:
                    state.contestDetails && String(state.contestDetails?.contestId) === String(id)
                        ? { ...state.contestDetails, ...(publishedContest || {}), status: publishedContest?.status || "open" }
                        : state.contestDetails,
                loading: false,
            }));

            return res?.data || res;
        } catch (error) {
            console.error("Error publishing contest:", error);
            set({ error: error?.message || "Failed to publish contest", loading: false });
            throw error;
        }
    },

    completeAdminContestByID: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.postAdminContestsByIdComplete(id);
            const completedContest = res?.data && typeof res.data === "object" ? res.data : null;

            set((state) => ({
                contests: (state.contests || []).map((contest) =>
                    String(contest?.contestId) === String(id)
                        ? { ...contest, ...(completedContest || {}), status: completedContest?.status || "completed" }
                        : contest
                ),
                contestDetails:
                    state.contestDetails && String(state.contestDetails?.contestId) === String(id)
                        ? { ...state.contestDetails, ...(completedContest || {}), status: completedContest?.status || "completed" }
                        : state.contestDetails,
                loading: false,
            }));

            return res?.data || res;
        } catch (error) {
            console.error("Error completing contest:", error);
            set({ error: error?.message || "Failed to complete contest", loading: false });
            throw error;
        }
    },

    fetchAuditLogs: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await adminApi.getAuditLogs(id);
            set({ auditLogs: res?.data, loading: false })
        } catch (error) {
            console.error("Error fetching audit logs:", error);
            set({ error: error?.message || "Failed to fetch audit logs", loading: false });
        }
    },

    fetchJobStatus: async (id) => {
        set({ loading: true, error: null, jobStatus: null });
        try {
            const res = await adminApi.getAdminContestsByIdJobStatus(id);
            const payload = res?.data;
            const jobStatus =
                payload && typeof payload === "object" && !Array.isArray(payload) ? payload : null;
            set({ jobStatus, loading: false });
            return res;
        } catch (error) {
            console.error("Error fetching job status:", error);
            set({
                error: error?.message || "Failed to fetch job status",
                jobStatus: null,
                loading: false,
            });
        }
    },

    // Utility to reset store state
    reset: () => set({
        dashboardData: null, settings: null, contests: [], contestDetails: null,
        participants: [], results: [], resultsPagination: null, clients: [], revenue: null, auditLogs: [],
        mt5ExecutionsGroup: [], mt5AccountsExecutions: [], mt5AccountsExecutionsLoading: false,
        mt5ExecutionDetail: null, mt5ExecutionDetailLoading: false,
        mt5Jobs: [], mt5StaleJobs: null,
        jobStatus: null,
        loading: false, error: null
    }),
}));

export default useAdminStore;