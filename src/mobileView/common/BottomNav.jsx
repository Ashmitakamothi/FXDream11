import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { UserSidebar } from "../../layouts/components/SidebarData";
import { ChartColumn, Home, Trophy, Wallet, Award } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = useMemo(() => {
    // Commented out items that are in my code but not in the image
    // const items = UserSidebar.filter((item) => item.mobileNav);
    // return [
    //   ...items,
    //   { label: "Live", url: "/live", activeUrl: ["/live"], icon: <ChartColumn size={18} /> }
    // ];

    return [
      { label: "Home", url: "/dashboard", activeUrl: ["/", "/dashboard"], icon: <Home size={22} strokeWidth={1.5} /> },
      { label: "Contest", url: "/user/contests", activeUrl: ["/user/contests"], icon: <Trophy size={22} strokeWidth={1.5} /> },
      { label: "Wallet", url: "/wallet", activeUrl: ["/wallet"], icon: <Wallet size={22} strokeWidth={1.5} /> },
      { label: "My Contests", url: "/my-contests", activeUrl: ["/my-contests"], icon: <Award size={22} strokeWidth={1.5} /> },
      { label: "Live", url: "/live", activeUrl: ["/live"], icon: <ChartColumn size={22} strokeWidth={1.5} /> }
    ];
  }, []);

  const isActivePath = (paths = []) => {
    return paths.some((url) => {
      if (url === "/") return location.pathname === "/";
      return location.pathname === url || location.pathname.startsWith(url);
    });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0C1B14] via-[#0C1B14] to-[#0C1B14]/80 pt-1 pb-4">
      <div className="max-w-md mx-auto glass-effect rounded-[36px] border-none px-1.5 py-1.5 mx-3" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
        <div className="flex items-center justify-around">
          {navItems.map((tab) => {
            const active = isActivePath(tab.activeUrl);
            return (
              <button key={tab.label} onClick={() => navigate(tab.url)} className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 active:scale-90 ${active ? "bg-[#2aa880] text-white" : "text-[#75847F] hover:text-[#2aa880]"}`}>
                <div className={`${active ? "scale-105 mb-0.5" : "scale-100"} transition-transform duration-200`}>{tab.icon}</div>
                <span className={`text-[11px] font-semibold tracking-wide`}>{t(tab.label)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;