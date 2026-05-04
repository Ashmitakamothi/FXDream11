import { create } from "zustand";
import { getProfile } from "../api/authApi";

const useProfileStore = create((set) => ({
    userProfile: null,
    loading: false,
    error: null,
    fetchProfile: async () => {
        set({ loading: true });
        try {
            const res = await getProfile();
            set({ userProfile: res?.data });
        }
        catch (error) {
            console.error("Error fetching profile:", error);
            set({ error: error });
        }
        finally {
            set({ loading: false });
        }

    }
}));

export default useProfileStore;