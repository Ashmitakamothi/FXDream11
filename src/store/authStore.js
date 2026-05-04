import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { fetchCountriesApi } from '../api/authApi';


const useAuthStore = create(
  persist(
    (set) => ({
      // State
      loginDetails: null,
      isLogin: false,
      user: null,
      countries: [],

      // Actions
      setLoginDetails: (loginDetails) => set({ loginDetails }),

      setIsLogin: (isLogin) => set({ isLogin }),

      fetchCountries: async () => {
        try {
          const res = await fetchCountriesApi();
          set({ countries: res?.data || res });
        } catch (error) {
          console.error('Error fetching countries:', error);
          throw error;
        }
      },

      login: (user) => {
        // Explicitly store token data in localStorage as requested
        if (user?.token) localStorage.setItem('token', user.token);
        if (user?.refreshToken) localStorage.setItem('refreshToken', user.refreshToken);
        if (user?.expiry) localStorage.setItem('tokenExpiry', user.expiry);

        set({ user, isLogin: true });
      },

      logout: () => {
        // Clear individual localStorage keys
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');

        // // Reset business logic stores
        // useContestStore.getState().reset();
        // useWalletStore.getState().reset();
        // useTradingStore.getState().reset();

        set({
          loginDetails: null,
          isLogin: false,
          user: null,
          userProfile: null,
        });
      },

      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        loginDetails: state.loginDetails,
        isLogin: state.isLogin,
        user: state.user,
        countries: state.countries,
      }),
    }
  )
);

export default useAuthStore;