import { create } from "zustand";
import useWalletStore from "./walletStore";
import useContestStore from "./contestStore";
import useProfileStore from "./profileStore";
import useAdminStore from "./adminStore";
import useTradingStore from "./tradingStore";

const useAppStore = create((set) => ({
    loading: false,
    error: null,

    fetchAppData: async (isAdmin = false) => {
        const { fetchWalletDetails } = useWalletStore.getState();
        const { fetchContests } = useContestStore.getState();
        const { fetchProfile } = useProfileStore.getState();
        const { fetchTradingDetails } = useTradingStore.getState();
        const { fetAllAdminDashboardData } = useAdminStore.getState();
       
        try {
            set({ loading: true });
console.log(isAdmin);

            if (isAdmin) {
                await Promise.all([
                    // fetchProfile(),
                    fetAllAdminDashboardData(),
                    fetchTradingDetails()
                ]);
            } else {
                await Promise.all([
                    fetchWalletDetails(),
                    fetchContests(),
                    fetchProfile(),
                    fetchTradingDetails()
                ]);
            }
        }
        catch (error) {
            console.error("Error loading app data:", error);
            set({ error: error });
        } finally {
            set({ loading: false });
        }
    }
}))

export default useAppStore;