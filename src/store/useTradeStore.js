import { create } from 'zustand';
import * as api from '../api/generalApi';

const useTradeStore = create((set, get) => ({

    history: [],


    fetchTrades: async () => {

    }
}))