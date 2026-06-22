import { create } from 'zustand';
import { getWallet,  getWalletTransactions, walletDeposit, walletWithdraw } from '../api/generalApi.js';

const useWalletStore = create((set, get) => ({
    wallet: null,
    transactions: [],
    loading: false,
    error: null,

    fetchWalletDetails: async () => {
        const { fetchTransactions, fetchWallet } = get();
        try {
            set({ loading: true });
            await Promise.all([fetchWallet(), fetchTransactions({ page: 1, limit: 10 })]);
        }
        catch (error) {
            set({ error: error?.response?.data?.message || error?.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchWallet: async () => {
        set({ loading: true });
        try {
            const res = await getWallet();
            const payload = res?.data !== undefined ? res.data : res;
            set({ wallet: payload });
        }
        catch (error) {
            set({ error: error?.response?.data?.message || error?.message });
        } finally {
            set({ loading: false });
        }
    },
    deposit: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await walletDeposit(data);
            const payload = res?.data !== undefined ? res.data : res;
            set({ wallet: payload });
            return res;
        }
        catch (error) {
            set({ error: error?.response?.data?.message || error?.message });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    withdraw: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await walletWithdraw(data);
            const payload = res?.data !== undefined ? res.data : res;
            set({ wallet: payload });
            return res;
        }
        catch (error) {
            set({ error: error?.response?.data?.message || error?.message });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    fetchTransactions: async (params) => {
        set({ loading: true });
        try {
            const res = await getWalletTransactions(params);
            const payload = res?.data !== undefined ? res.data : res;
            const list = Array.isArray(payload) ? payload : Array.isArray(payload?.items) ? payload.items : [];
            set({ transactions: list });
        }
        catch (error) {
            set({ error: error?.response?.data?.message || error?.message });
        } finally {
            set({ loading: false });
        }
    },


}))

export default useWalletStore;