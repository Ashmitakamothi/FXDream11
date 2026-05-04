import React from 'react';
import { Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../layouts/components/ThemeToggle';
import { useTheme } from '../../ThemeContext';
import { User, Bell, Sun, Moon } from "lucide-react";
// const { useBreakpoint } = Grid;

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 glass-effect border-b border-border/30">
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => navigate("/profile")} aria-label="Open profile"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 border border-primary/10 active:scale-90 transition-transform duration-150"
        >
          <User size={18} className="text-primary" />
        </button>
        <div className="flex items-center">
          <span className="text-[17px] font-extrabold text-foreground tracking-tight">FX</span>
          <span className="text-[17px] font-extrabold text-primary tracking-tight">dream</span>
          <span className="text-[17px] font-extrabold text-foreground tracking-tight">11</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 border border-primary/10 relative active:scale-90 transition-transform duration-150">
            <Bell size={18} className="text-primary" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-background animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;