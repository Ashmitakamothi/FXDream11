import { request } from "./index.js";

// Authentication
export const registerUser = (data) => {  // done
  return request("POST", "/auth/register", data);
};

export const loginUser = (data) => {  // done
  return request("POST", "/auth/login", data);
};

export const verifyLoginOtp = (data) => { // done
  return request("POST", "/auth/verify-login-otp", data);
};

export const enable2FA = () => { // done
  return request("POST", "/auth/2fa", {});
};

export const verifyEnable2FA = (data) => { // done
  return request("POST", "/auth/2fa/verify", data);
};

export const disable2FA = () => { // done
  return request("DELETE", "/auth/2fa");
};

export const verifyDisable2FA = (data) => { // done
  return request("POST", "/auth/2fa/disable/verify", data);
};

export const logoutUser = () => { // done
  return request("POST", "/auth/logout");
};

export const refreshToken = (data) => {
  return request("POST", "/auth/refresh-token", data);
};


// Password recovery
export const forgotPassword = (data) => { // done
  return request("POST", "/auth/forgot-password", data);
};

export const resetPassword = (data) => {
  return request("POST", "/auth/reset-password", data);
};

export const verifyEmail = (token) => {
  return request("GET", "/auth/verify-email", { token });
};

export const verifyOtp = (data) => {
  return request("POST", "/auth/verify-otp", data);
};

export const resendOtp = (data) => {
  return request("POST", "/auth/resend-otp", data);
};

export const getProfile = () => {  // done
  return request("GET", "/auth/profile");
};

export const updateProfile = (data) => {
  return request("POST", "/auth/profile", data);
};

export const changePassword = (data) => { //done
  return request("POST", "/auth/change-password", data);
};

export const fetchCountriesApi = () => {
  return request("GET", "/country");
}