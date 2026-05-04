import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { HiOutlineSun } from "react-icons/hi2";
import { LuMoon } from "react-icons/lu";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <div onClick={toggleTheme} className={`w-6 h-6 flex items-center px-1  cursor-pointer transition-all duration-500 relative bg-body`}>
      <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-5 h-5 rounded-full flex items-center justify-center relative overflow-hidden bg-body">
        {/* Sun */}
        <motion.div initial={false} animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1, rotate: isDark ? 180 : 0, }} className="absolute text-sm">
          <HiOutlineSun fontSize={18}/>
        </motion.div>

        {/* Moon */}
        <motion.div initial={false} animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -180, }}className="absolute text-sm">
          <LuMoon fontSize={16}/>
        </motion.div>
      </motion.div>

      {/* Clouds */}
      {/* <div className="absolute w-full h-full pointer-events-none">
        {!isDark ? (
          <div className="absolute left-2 top-1 text-white text-xs">☁️ </div>
        ) : (
          <div className="absolute right-2 top-1 text-gray-300 text-xs">☁️</div>
        )}
      </div> */}
    </div>
  );
};

export default ThemeToggle;