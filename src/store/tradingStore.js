import { create } from 'zustand';
import * as api from '../api/generalApi';
import useContestStore from './contestStore';

const useTradingStore = create((set, get) => ({
  account: null,
  groups: [],
  loading: false,
  tabLoading: false,
  closedTrades: [],
  openPositions: [],
  history: [],
  performace: null,
  loadedTabs: {
    open: false,
    closed: false,
    history: false,
    performance: false,
  },


  fetchTradingDetails: async () => {
    const { getTradingGroups, getTradingPerformance, getTradingAccount } = get();
    const { myContests } = useContestStore.getState();
    try {
      set({ loading: true });
      const calls = [getTradingGroups()];
      
      // If there's at least one active contest, fetch performance and account for it
      if (myContests && myContests.length > 0) {
        const activeId = myContests[0].id || myContests[0].contestId;
        if (activeId) {
          calls.push(getTradingPerformance(activeId));
          calls.push(getTradingAccount(activeId));
        }
      }

      await Promise.all(calls);
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      set({ loading: false });
    }
  },
  getTradingAccount: async (contestId, data) => {
    set({ loading: true });
    try {
      const res = await api.getTradingAccount(contestId, data);
      set({ account: res?.data || res, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getTradingGroups: async () => {
    set({ loading: true });
    try {
      const res = await api.getTradingGroups();
      set({ groups: res?.data || res, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  syncGroups: async () => {
    set({ loading: true });
    try {
      const res = await api.tradingGroupSync();
      set({ loading: false });
      return res
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  getTradingClosed: async (contestId) => {
    set({ tabLoading: true });
    try {
      const res = await api.getTradingClosed(contestId);
      const data = res?.data || res || [];
      set((state) => ({ closedTrades: Array.isArray(data) ? data : data?.data || [], tabLoading: false, loadedTabs: { ...state.loadedTabs, closed: true } }));
      return data;
    } catch (error) {
      set({ tabLoading: false });
      throw error;
    }
  },
  getTradingOpen: async (contestId) => {
    set({ tabLoading: true });
    try {
      const res = await api.getTradingOpen(contestId);
      const data = res?.data || res || [];
      set((state) => ({ openPositions: Array.isArray(data) ? data : data?.data || [], tabLoading: false, loadedTabs: { ...state.loadedTabs, open: true } }));
      return data;
    } catch (error) {
      set({ tabLoading: false });
      throw error;
    }
  },
  getTradingHistory: async (contestId) => {
    set({ tabLoading: true });
    try {
      const res = await api.getTradingHistory(contestId);
      const data = res?.data || res || [];
      set((state) => ({ history: Array.isArray(data) ? data : data?.data || [], tabLoading: false, loadedTabs: { ...state.loadedTabs, history: true } }));
      return data;
    } catch (error) {
      set({ tabLoading: false });
      throw error;
    }
  },
  getTradingPerformance: async (contestId) => {
    set({ tabLoading: true });
    try {
      const res = await api.getTradingPerformance(contestId);
      const data = res?.data || res || null;
      set((state) => ({ performace: data, tabLoading: false, loadedTabs: { ...state.loadedTabs, performance: true } }));
      return data;
    } catch (error) {
      set({ tabLoading: false });
      throw error;
    }
  },

  updateAccount: (data) => set((state) => ({ account: { ...state.account, ...data } })),
  updateOpenPositions: (data) => set({ openPositions: data }),

  reset: () => set({ account: null, groups: [], loading: false, tabLoading: false, closedTrades: [], openPositions: [], history: [], performace: null, loadedTabs: { open: false, closed: false, history: false, performance: false } }),
}));

export default useTradingStore;