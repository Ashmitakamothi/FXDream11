import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { HiOutlineSun } from "react-icons/hi2";
import { LuMoon } from "react-icons/lu";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <div 
      onClick={toggleTheme} 
      className="flex h-9 w-9 items-center justify-center rounded-xl bg-transparent text-gray-500 dark:text-gray-400 cursor-pointer transition-all duration-300 hover:bg-[#f59e0b] hover:text-white hover:scale-105 active:scale-95 hover:shadow-[0_8px_32px_-10px_rgba(245,158,11,0.5)]"
    >
      <motion.div 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }} 
        className="flex items-center justify-center relative"
      >
        {/* Sun */}
        <motion.div 
          initial={false} 
          animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1, rotate: isDark ? 90 : 0 }} 
          className="absolute"
        >
          <HiOutlineSun fontSize={20} />
        </motion.div>
        
        {/* Moon */}
        <motion.div 
          initial={false} 
          animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90 }} 
          className="absolute"
        >
          <LuMoon fontSize={18} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThemeToggle;