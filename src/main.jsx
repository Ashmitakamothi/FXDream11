import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ThemeContext.jsx";
import "./i18n";
import "./index.css";
import "antd/dist/reset.css";
import './App.css'

const loadConfig = async () => {
  try {
    const response = await fetch(`/config.json`);
    if (!response.ok) throw new Error("Failed to load config.");
    return await response.json();
  } catch (error) {
    console.error("Error loading config: ", error);
    return null;
  }
};

const initApp = async () => {
  const config = await loadConfig();

  if (config) {
    if (config?.name) document.title = config?.name;
    window.env = config?.env || {};
    window.theme = config?.theme || {};
  }

  // Dynamically import App after config setup
  const { default: App } = await import("./App.jsx");

  createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

initApp();
