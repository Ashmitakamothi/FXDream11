import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserSidebar } from "../../layouts/components/SidebarData";
import { ChartColumn, Radio } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = useMemo(() => {
    const items = UserSidebar.filter((item) => item.mobileNav);
    return [
      ...items,
      { label: "Live", url: "/live", activeUrl: ["/live"], icon: <ChartColumn size={18} /> }
    ];
  }, []);

  const isActivePath = (paths = []) => {
    return paths.some((url) => {
      if (url === "/") return location.pathname === "/";
      return location.pathname === url || location.pathname.startsWith(url);
    });
  };

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-md mx-auto glass-effect rounded-2xl border-none px-1.5 py-1.5" style={{ boxShadow: '0 -2px 20px #0000000f, 0 4px 16px #00000014' }}>
        <div className="flex items-center justify-around">
          {navItems.map((tab) => {
            const active = isActivePath(tab.activeUrl);
            return (
              <button key={tab.label} onClick={() => navigate(tab.url)} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-90 ${active ? "bg-[#059669] text-white" : "text-muted-foreground hover:text-foreground/70"}`} style={active ? { boxShadow: '0 2px 10px rgba(5,150,105,0.25)' } : undefined }>
                <div className={`${active ? "scale-110" : "scale-100"} transition-transform duration-200`}>{tab.icon}</div>
                <span className={`text-[10px] font-semibold ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>{t(tab.label)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;