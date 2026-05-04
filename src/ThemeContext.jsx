import { createContext, useEffect, useState, useContext } from "react";
import { getDefaultTheme, setLocalItem } from "./utils/utils";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getDefaultTheme());

  const applyTheme = (theme) => {
    const themes = window.theme;
    const selectedTheme = themes?.[theme];

    if (selectedTheme) {
      Object.entries(selectedTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    setLocalItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    return setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
