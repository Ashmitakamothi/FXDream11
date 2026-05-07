import "./App.css";
import { useTheme } from './ThemeContext';
import { getColor } from "./utils/utils";
import { Toaster } from "react-hot-toast";
import { ConfigProvider, theme as antdTheme } from "antd";
import AppRoutes from './routes/AppRoutes';
import useAuthStore from "./store/authStore";
import useAppStore from "./store/useAppStore";
import { useEffect } from "react";
import SessionManager from "./components/SessionManager";
import GlobalLoader from "./components/loader/GlobalLoader";
import SocketManager from "./components/SocketManager";

function App() {
  const { theme } = useTheme();
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);
  const { loading, fetchAppData } = useAppStore();

  useEffect(() => {
    if (isLogin) {
      fetchAppData(!!user?.isAdmin);
    }
  }, [isLogin, user?.isAdmin, fetchAppData]);

  // if (loading) return <GlobalLoader isSuspense={true} />;

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: getColor("--theme-primary"),
            fontFamily: "Inter, sans-serif",
            controlOutline: "none",
          },
          components: {
            Switch: {
              handleBg: 'var(--foreground)',
            },
          },
          algorithm:
            theme === "dark"
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
        componentSize="large"
      >
        <SocketManager />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <SessionManager>
          <AppRoutes />
        </SessionManager>
      </ConfigProvider>
    </>
  )
}

export default App
