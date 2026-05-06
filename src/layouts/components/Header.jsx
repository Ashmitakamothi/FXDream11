import React, { useState, useEffect } from "react";
import { Layout, Badge, Modal, message } from "antd";
import { MenuOutlined, BellOutlined, CloseOutlined } from "@ant-design/icons";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { LogOut, AlertCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { UserSidebar } from "./SidebarData";
import { useTheme } from "../../ThemeContext";
import useWalletStore from "../../store/walletStore";
import useAuthStore from "../../store/authStore";
import * as authApi from "../../api/authApi";
import '../../web.css'

const { Header } = Layout;

const checkActive = (paths = [], currentPathname) => {
  return paths.some((url) => {
    if (url === "/") return currentPathname === "/";
    return currentPathname === url || currentPathname.startsWith(url);
  });
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { wallet } = useWalletStore();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      // 1. Fire and forget logout API 
      authApi.logoutUser().catch(err => console.error("Logout API failed:", err));

      // 2. Clear store and localStorage IMMEDIATELY
      useAuthStore.getState().logout();
      
      // 3. Force hard redirect to Login to kill all React cycles and state
      window.location.href = "/login";
      
    } catch (err) {
      console.error("Logout error:", err);
      useAuthStore.getState().logout();
      window.location.href = "/login";
    } finally {
      setLogoutLoading(false);
      setIsLogoutModalOpen(false);
    }
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPathname]);

  return (
    <>
      <Header 
        className="sticky top-0 z-[100] border-b border-black/5 px-0 transition-all duration-300 dark:border-white/10 bg-white/70 dark:bg-[#0b0f1a]/80 shadow-sm backdrop-blur-md backdrop-saturate-150"
        style={{ height: "auto" }}
      >
        <div className="custom-container flex h-16 items-center justify-between gap-4 px-4 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer outline-none">
            <div className="grid h-9 w-9 place-items-center rounded-3xl gradient-primary shadow-glow">
              <HiArrowTrendingUp className="text-white" fontSize='20px' />
            </div>

            <div className="leading-tight">
              <div className="text-base font-bold tracking-tight">
                FXdream<span className="text-primary">11</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">
                Trade · Compete · Win
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {UserSidebar.map((item, i) => {
              const active = checkActive(item.activeUrl, currentPathname);
              return (
                <Link 
                  key={i} 
                  to={item.url} 
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    active 
                    ? 'bg-[rgba(0,165,190,0.15)] text-primary dark:bg-primary/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Notification Bell Icon */}
            <Link
              to="/notifications"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 outline-none"
            >
              <Badge dot offset={[-2, 2]} color="#f59e0b">
                <BellOutlined className="text-lg" />
              </Badge>
            </Link>

            {/* Balance */}
            <div className="hidden sm:flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-700 pl-3 pr-1 py-1">
              <div className="text-right leading-tight">
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Balance</div>
                <div className="text-sm font-bold text-primary">
                  ${wallet?.balance?.toLocaleString() || '8,420.50'}
                </div>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-full gradient-primary text-[10px] font-black text-white shadow-glow">
                RP
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-transparent text-red-500 cursor-pointer transition-all duration-200 hover:bg-red-500/10 outline-none"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden flex items-center justify-center h-9 w-9 rounded-xl transition-all duration-300 outline-none ${
                isMobileMenuOpen 
                ? 'bg-[#f59e0b] text-white shadow-[0_4px_12px_-2px_rgba(245,158,11,0.3)]' 
                : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-[#f59e0b] hover:text-white'
              }`}
            >
              {isMobileMenuOpen ? <CloseOutlined className="text-base" /> : <MenuOutlined className="text-base" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 animate-slide-down">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                { label: 'Dashboard', url: '/dashboard', activeUrls: ['/', '/dashboard'] },
                { label: 'Wallet', url: '/wallet', activeUrls: ['/wallet'] },
                { label: 'My Contests', url: '/my-contests', activeUrls: ['/my-contests'] },
                { label: 'Explore', url: '/explore', activeUrls: ['/explore'] },
                { label: 'Live Contests', url: '/user/contests', activeUrls: ['/user/contests', '/contests'] },
                { label: 'Notifications', url: '/notifications', activeUrls: ['/notifications'] },
                { label: 'Support', url: '/support', activeUrls: ['/support'] },
                { label: 'Profile', url: '/profile', activeUrls: ['/profile'] },
              ].map((item, idx) => {
                const active = checkActive(item.activeUrls, currentPathname);
                return (
                  <Link 
                    key={idx} 
                    to={item.url} 
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      active 
                      ? 'bg-[rgba(0,165,190,0.1)] text-primary rounded-lg dark:bg-primary/20' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Header>
      
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-black/5" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 py-1">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/10 text-red-500">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold">Confirm Logout</span>
          </div>
        }
        open={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        footer={null}
        centered
        destroyOnClose
        width={360}
        styles={{
          content: { background: "var(--theme-bg)", border: "1px solid var(--border)", borderRadius: '20px' },
          header: { background: "transparent", borderBottom: "1px solid var(--border)", color: "var(--theme-text)" },
          body: { background: "transparent", paddingTop: 16 },
        }}
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Are you sure you want to logout from your account?
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 h-11 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex-1 h-11 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {logoutLoading ? "Logging out..." : "Yes, Logout"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;