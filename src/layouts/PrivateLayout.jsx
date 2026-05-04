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
    <div className="min-h-screen">
      <div className="flex">
        {/* <motion.div animate={{ x: collapsed ? 0 : -230 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="h-full w-[230px] fixed top-0 left-0 z-10 hidden lg:block">
          <Sidebar />
        </motion.div> */}

        <div className={`w-full h-full transition-all duration-300 ease-in-out`}>
          <div className="h-[60px]">
            <Navbar title={title} collapsed={collapsed} setCollapsed={setCollapsed} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
          </div>

          <div className="h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] overflow-auto ">
            <div className={`min-h-fit h-full w-full ${location.pathname.includes("/view_ticket") ? "" : "bg-light "}`}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* <AnimatePresence>
        {isDrawerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="h-full w-full fixed top-0 left-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} >

            <motion.div initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ duration: 0.3 }} className="h-full w-[260px] bg-body shadow-xl" onClick={(e) => e.stopPropagation()}>
              <Sidebar setIsDrawerOpen={setIsDrawerOpen} />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default PrivateLayout;
