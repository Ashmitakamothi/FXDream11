import { create } from 'zustand';
import * as api from '../api/generalApi';

const useContestStore = create    ((set, get) => ({
  contests: [],
  contestDetails: null,
  leaderboard: [],
  myContests: [],
  topPicks: [],
  rankings: [],
  myResult: null,
  loading: false,
  error: null,
  positions:[],
  trades:[],
  participantTradesLoading: false,
  participantPositionsLoading: false,
  tradingAccount:null,

  fetchContests: async () => {
    const { getContests, getMyContests , getMyTopPicks} = get();
    try {
      set({ loading: true });
      await Promise.all([
        getContests(),
        getMyContests(),
        getMyTopPicks(),
      ]);
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  getContests: async (data) => {
    set({ loading: true });
    try {
      // Request parameters: PageNumber, PageSize, SortBy, SortOrder, HasPreviousPage, status
      const response = await api.getContests(data);
      // We store the data payload. If the response is paginated, 'contests' will hold the items and metadata.
      set({ contests: response?.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  getContestByID: async (id) => {
    set({ loading: true });
    try {
      const res = await api.getContestByID(id);
      set({ contestDetails: res?.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  joinContest: async (id) => {
    set({ loading: true });
    try {
      await api.contestJoin(id);
      set({ loading: false });
    } catch (err) {
      set({ error: err, loading: false });
      throw err;
    }
  },

  getLeaderboard: async (id, params) => {
    set({ loading: true });
    try {
      const res = await api.getLeaderboard(id, params);
      set({ leaderboard: res?.data || [], loading: false });
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      set({ error: err, loading: false });
    }
  },

  getMyResult: async (id) => {
    set({ loading: true });
    try {
      const res = await api.getMyResult(id);
      set({ myResult: res?.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  getMyContests: async (params) => {
    set({ loading: true });
    try {
      const response = await api.getMyContest(params);
      set({ myContests: response?.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  getMyTopPicks: async (data) => {  
    set({ loading: true });
    try {
      const response = await api.getTopPicks(data);
      set({ topPicks: response?.data, loading: false });
    }
    catch (err) {
      set({ error: err, loading: false });
    }
  },

  getRanking: async (contestId, params) => {
    if (!contestId) return;
    set({ loading: true });
    try {
      const res = await api.getRanking(contestId, params);
      const payload = res?.data !== undefined ? res.data : res;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
          ? payload.items
          : [];
      set({ rankings: list, loading: false });
      return res;
    } catch (err) {
      set({ error: err, rankings: [], loading: false });
      throw err;
    }
  },

  getParticipentsByTrades: async (contestId, userId) => {
    if (!contestId || !userId) return;
    set({ participantTradesLoading: true });
    try {
      const res = await api.getParticipentsByTrades(contestId, userId);
      const payload = res?.data !== undefined ? res.data : res;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
          ? payload.items
          : [];
      set({ trades: list, participantTradesLoading: false });
      return res;
    } catch (err) {
      set({ error: err, trades: [], participantTradesLoading: false });
      throw err;
    }
  },

  getParticipentsByPositions: async (contestId, userId) => {
    if (!contestId || !userId) return;
    set({ participantPositionsLoading: true });
    try {
      const res = await api.getParticipentsByPositions(contestId, userId);
      const payload = res?.data !== undefined ? res.data : res;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
          ? payload.items
          : [];
      set({ positions: list, participantPositionsLoading: false });
      return res;
    } catch (err) {
      set({ error: err, positions: [], participantPositionsLoading: false });
      throw err;
    }
  },


  updateRankings: (data) => set({ rankings: data }),

  reset: () => set({
    contests: [],
    contestDetails: null,
    leaderboard: [],
    rankings: [],
    myContests: [],
    myResult: null,
    positions: [],
    trades: [],
    participantTradesLoading: false,
    participantPositionsLoading: false,
    loading: false,
    error: null
  }),
}));


export default useContestStore;