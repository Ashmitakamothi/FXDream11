import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useAuthStore from "../store/authStore";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
import { Grid } from "antd";
import MobileLayout from "../mobileView/common/MobileLayout";
import Navbar from "./components/Header";

const PrivateLayout = ({ title, children }) => {
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const { isLogin } = useAuthStore();
  const [collapsed, setCollapsed] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  if (!isLogin) return <Navigate to="/login" />;

  if (!screens.md && screens.md !== undefined) {
    return <MobileLayout>{children}</MobileLayout>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[60px] shrink-0">
        <Navbar />
      </div>

      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
