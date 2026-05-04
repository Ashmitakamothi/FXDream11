import React, { useLayoutEffect } from "react";
import axios from "axios";
import { api } from "../api";
import { logoutUser } from "../api/authApi";
import useAuthStore from "../store/authStore";

const SessionManager = ({ children }) => {
    // const navigate = useNavigate();
    const { logout, login } = useAuthStore();

    const logoutHandler = async () => {
        try {
            await logoutUser().catch(() => {});
        } finally {
            logout();
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.replace("/login");
        }
    };

    useLayoutEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Prevent infinite loops on refresh token endpoint or if already retried
                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    !originalRequest.url.includes("/auth/refresh-token")
                    && !originalRequest.url.includes("/auth/login") // Exclude login
                    && !originalRequest.url.includes("/auth/verify-login-otp") // Exclude all OTP verification endpoints
                    && !originalRequest.url.includes("/auth/logout") // Exclude logout to prevent infinite loops
                ) {
                    originalRequest._retry = true;
                    const refreshToken = localStorage.getItem("refreshToken");

                    if (refreshToken) {
                        try {
                            const baseURL = api.defaults.baseURL || import.meta.env.VITE_BASE_URL;
                            
                            // Use a fresh axios instance to avoid global interceptors for the refresh call
                            const response = await axios.post(`${baseURL}/auth/refresh-token`, {
                                refreshToken,
                            });

                            const responseData = response.data?.data || response.data;
                            const accessToken = responseData?.accessToken || responseData?.token;
                            const newRefreshToken = responseData?.refreshToken;

                            if (!accessToken) throw new Error("Refresh failed: No token");

                            // Update storage
                            localStorage.setItem("token", accessToken);
                            if (newRefreshToken) {
                                localStorage.setItem("refreshToken", newRefreshToken);
                            }

                            // Sync store
                            login(responseData);

                            // Retry original request
                            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                            return api(originalRequest);
                        } catch (refreshError) {
                            console.error("Session expired:", refreshError);
                            await logoutHandler();
                            return Promise.reject(refreshError);
                        }
                    } else {
                        await logoutHandler();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
        };
    }, [ logout, login]);

    return <>{children}</>;
};

export default SessionManager;