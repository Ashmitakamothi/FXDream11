import axios from "axios";
import { getAppConfig } from "../config/appConfig";

const api = axios.create({
    baseURL: getAppConfig().VITE_BASE_URL || import.meta.env.VITE_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const request = async (method, url, payload = null, config = {}) => {
    try {
        const isGet = method.toUpperCase() === "GET";
        const response = await api({
            method,
            url,
            data: isGet ? null : payload,
            params: isGet ? payload : null,
            ...config,
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { api };