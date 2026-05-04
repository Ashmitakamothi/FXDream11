import React from "react";
import { Layout, Button, Badge } from "antd";
import { MenuOutlined, BellOutlined,} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { HiArrowTrendingUp } from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";
import { UserSidebar } from "./SidebarData";
import { useTheme } from "../../ThemeContext";
import '../../web.css'

const { Header } = Layout;

const isActivePath = (paths = [], currentPathname) => {
  return paths.some((url) => {
    // Special handling for root path to avoid matching all paths
    if (url === "/") return currentPathname === "/";
    return currentPathname === url || currentPathname.startsWith(url);
  });
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <Header className="sticky top-0 z-50 !bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-0">
      <div className="custom-container flex h-16 items-center justify-between gap-4 px-4 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
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
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1"> {/* Use UserSidebar for navigation */}
          {UserSidebar.map((item, i) => {
            const active = isActivePath(item.activeUrl, currentPathname);
            return (
              <a
                key={i}
                href={item.url}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${active ? "bg-soft" : "text-gray-500 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"}`}
                style={active ? { boxShadow: '0 2px 10px #00A6BE40' } : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">

          {/* Theme Button */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>

          {/* Notification */}
          <Badge dot>
            <Button
              type="text"
              shape="circle"
              icon={<BellOutlined />}
            />
          </Badge>

          {/* Balance */}
          <div className="hidden sm:flex items-center gap-3 rounded-full backdrop-blur-md border border-gray-200 dark:border-gray-700 pl-3 pr-1 py-1">
            <div className="text-right leading-tight">
              <div className="text-xs text-gray-500">Balance</div>
              <div className="text-sm font-semibold text-blue-500">
                $8,420.50
              </div>
            </div>

            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-indigo-600 text-xs font-bold text-white">
              RP
            </div>
          </div>

          {/* Mobile Menu */}
          <Button
            type="text"
            shape="circle"
            icon={<MenuOutlined />}
            className="xl:hidden"
          />
        </div>
      </div>
    </Header>
  );
};

export default Navbar;