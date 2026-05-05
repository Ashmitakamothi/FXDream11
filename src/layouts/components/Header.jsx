import React, { useState, useEffect } from "react";
import { Layout, Button, Badge } from "antd";
import { MenuOutlined, BellOutlined, CloseOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { HiArrowTrendingUp } from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";
import { UserSidebar } from "./SidebarData";
import { useTheme } from "../../ThemeContext";
import useWalletStore from "../../store/walletStore";
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
  const currentPathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPathname]);

  return (
    <>
      <Header 
        className="sticky top-0 z-[100] border-b border-black/5 dark:border-white/5 px-0 transition-all duration-300"
        style={{ 
          background: theme === 'dark' ? '#0f172a' : '#ffffff', 
          height: 'auto',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
        }}
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
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 ${
                    active 
                    ? 'gradient-primary text-white shadow-glow' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white'
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

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-transparent text-gray-500 dark:text-gray-400 cursor-pointer transition-all duration-300 hover:bg-[#f59e0b] hover:text-white group">
              <Badge dot offset={[-2, 2]} color="#f59e0b">
                <BellOutlined className="text-lg transition-colors duration-300 group-hover:text-white" />
              </Badge>
            </div>

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

        {/* Mobile Menu Dropdown - Inline pushing content down exactly like mockup */}
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
                    className={`flex items-center px-4 py-2 text-sm font-bold transition-all duration-300 ${
                      active 
                      ? 'bg-[#00A5BE15] text-[#00A5BE] rounded-full' 
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
      
      {/* Backdrop for focus */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-black/5" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;