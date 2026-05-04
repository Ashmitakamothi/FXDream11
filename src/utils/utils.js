import dayjs from "dayjs";
import toast from "react-hot-toast";

export const setLocalItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeLocalItem = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const successToast = (message) => {
  toast.success(message);
};

export const errorToast = (message) => {
  toast.error(message);
};

export const qs = (params) => {
  if (!params || typeof params !== "object") return "";
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${queryString}` : "";
};

export const formateProfit = (number) => {
  if (!number) return "$0";
  const formattedNumber = Number(Math.abs(number)).toFixed(2);
  if (number < 0) return `-$${formattedNumber}`;
  else return `$${formattedNumber}`;
};

export const sortByNumber = (data, key, order = "desc") => {
  if (!Array.isArray(data) || !data.length) return [];

  return [...data].sort((a, b) => {
    const valueA = a[key] || 0;
    const valueB = b[key] || 0;

    return order === "asc" ? valueA - valueB : valueB - valueA;
  });
};

export const formatDate = (date, format = "DD-MM-YYYY, hh:mm A") => {
  if (!date) return null;
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format(format) : null;
};

export const getInitials = (name) => {
  if (!name) return null;

  const nameParts = name.trim()?.split(" ");
  if (nameParts) {
    const initials = nameParts[0][0] + nameParts[nameParts.length - 1][0];
    return initials.toUpperCase();
  }
};

export const getSystemTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
};

export const getDefaultTheme = () => {
  if (getLocalItem("theme")) return getLocalItem("theme");
  return getSystemTheme();
};

export const getColor = (name) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

export const getAmountRules = (methodObj) => {
  const [min, max] = methodObj?.minMaxAmt
    ? methodObj.minMaxAmt
        .split("-")
        .map((v) => Number(v.replace("$", "").trim()))
    : [0, Infinity];

  return [
    {
      validator(_, value) {
        if (!value) return Promise.reject(new Error("Please enter amount"));

        const num = Number(value);

        if (num < min)
          return Promise.reject(new Error(`Amount must be at least $${min}`));
        if (num > max)
          return Promise.reject(new Error(`Amount must not exceed $${max}`));

        return Promise.resolve();
      },
    },
  ];
};
export const formatCurrency = (value) => {
  const n = Number(value ?? 0);
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

export const formatPercent = (value) => {
  const n = Number(value ?? 0);
  return `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;
};

