import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserSidebar, AdminSidebar } from "./SidebarData";
import { Button, Popover } from "antd";
import useAuthStore from "../../store/authStore";
import { logoutUser } from "../../api/authApi";
import { errorToast } from "../../utils/utils";
import { LuLogOut } from "react-icons/lu";
import { useTranslation } from "react-i18next";
const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const userName = user?.firstName ? `${user.firstName} ${user.lastName || ""}` : t("User");

  const sidebarItems = useMemo(() => {
    if (user?.isAdmin) {
      return AdminSidebar;
    }
    return UserSidebar;
  }, [user]);

  const isActivePath = (paths = []) => {
    return paths.some((url) => {
      if (url === "/") return pathname === "/";
      return pathname === url || pathname.startsWith(url);
    });
  };
  const logoutHandler = async () => {
    try {
      await logoutUser();
    } catch (error) {
      errorToast("Logout failed!", error?.message || error);
    } finally {
      logout();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="relative h-full w-full flex flex-col justify-between border-r border-[var(--theme-border)] bg-[linear-gradient(180deg,rgba(35,40,70,0.95)_0%,rgba(20,23,40,0.98)_100%)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[var(--theme-primary-light)]/20 to-transparent" />
      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar px-3 py-4">
        <div className="px-2 pb-4 border-b border-white/10">
          <div className="h-full flex flex-col items-center justify-center">
            <img className="h-14 w-auto drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]" src="/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="pt-5">
          <div className="mx-1 mb-4 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            <p className="text-[10px] uppercase tracking-widest mb-1 text-gray-300/90">{t("Welcomeback")}</p>
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
          </div>

          <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.15em] text-gray-300/80 font-semibold">
            {user?.roleName === "admin" ? t("AdminPanel") : t("UserPanel")}
          </div>

          {sidebarItems.map((item, index) => {
            const itemActive = isActivePath(item?.activeUrl);
            const itemClasses = `w-full flex items-center gap-3 rounded-xl border-none px-4 py-2.5 text-[13px] font-medium transition-all duration-200
  focus:outline-none focus:ring-0 active:outline-none
  ${itemActive
                ? "text-white shadow-[0_6px_14px_rgba(0,0,0,0.2)]"
                : "text-gray-200 hover:bg-white/10"
              }`;

            return (
              <div key={index} className="mb-1">
                {item?.children && item?.children.length > 0 ? (
                  <Popover
                    placement="rightTop"
                    trigger="hover"
                    content={
                      <div className="flex flex-col gap-1 min-w-[180px]">
                        {item.children.map((child, childIndex) => (
                          <button
                            key={child?.url || childIndex}
                            className={`w-full flex items-center gap-3 rounded-lg border-none text-xs font-medium px-3 py-2  cursor-pointer transition-all ${isActivePath(child?.activeUrl) ? "text-white" : "text-gray-700 hover:bg-black/5"
                              }`}
                            style={isActivePath(child?.activeUrl) ? { background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)", border: "none", outline: "none" } : {}}
                            onClick={(e) => { e.currentTarget.blur(); navigate(child?.url) }}
                          >
                            <div className="text-sm">{child?.icon}</div>
                            <span>{t(child?.label)}</span>
                          </button>
                        ))}
                      </div>
                    }
                  >
                    <button className={itemClasses} style={itemActive ? { background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)", border: "none", outline: "none" } : {}} onClick={(e) => { e.currentTarget.blur(); navigate(item?.url); }}>
                      <div className={`text-base ${itemActive ? "opacity-100" : "opacity-85"}`}>{item?.icon}</div>
                      <span>{t(item?.label)}</span>
                    </button>
                  </Popover>
                ) : (
                  <button className={itemClasses} style={itemActive ? { background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)", border: "none", outline: "none" } : {}} onClick={(e) => { e.currentTarget.blur(); navigate(item?.url); }}>
                    <div className={`text-base ${itemActive ? "opacity-100" : "opacity-85"}`}>{item?.icon}</div>
                    <span>{t(item?.label)}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 p-3 border-t border-white/10 bg-black/10">
        <Button
          danger
          type="text"
          className="w-full !h-11 !rounded-full flex items-center justify-start gap-3 !text-red-200 hover:!text-red-100 hover:!bg-red-500/20"
          onClick={logoutHandler}
        >
          <div className="opacity-80">
            <LuLogOut size={18} />
          </div>
          <span className="text-[13px] font-medium">{t("signOut")}</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
