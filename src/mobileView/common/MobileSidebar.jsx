import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserSidebar } from '../../layouts/components/SidebarData'; // Assuming SidebarData has the mobile navigation items
import useAuthStore from '../../store/authStore';
import { logoutUser } from '../../api/authApi';
import { errorToast } from '../../utils/utils';

const MobileSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuthStore();

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
            onClose();
        }
    };

    const isActivePath = (paths = []) => {
        return paths.some((url) => {
            if (url === "/") return location.pathname === "/";
            return location.pathname === url || location.pathname.startsWith(url);
        });
    };

    return (
        <>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />
            )}

            {/* Sidebar */}
            <motion.div initial={{ x: '-100%' }} animate={{ x: isOpen ? '0%' : '-100%' }} exit={{ x: '-100%' }} transition={{ duration: 0.2, ease: 'easeInOut' }} className="fixed top-0 left-0 h-full w-[75vw] max-w-[300px] bg-background shadow-lg z-[70] flex flex-col">
                <div className="flex items-center justify-between p-5 border-b border-border/30">
                    <div className="flex items-center">
                        <span className="text-[17px] font-extrabold text-foreground tracking-tight">FX</span>
                        <span className="text-[17px] font-extrabold text-primary tracking-tight">dream</span>
                        <span className="text-[17px] font-extrabold text-foreground tracking-tight">11</span>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-muted active:scale-90 transition-transform duration-150">
                        <X size={18} className="text-muted-foreground" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {UserSidebar.map((item) => {
                        const active = isActivePath(item.activeUrl);
                        return (
                            <button key={item.label} onClick={() => { navigate(item.url); onClose(); }}
                                className={`flex items-center w-full gap-3 p-3 rounded-lg text-left transition-colors duration-200 ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                            >
                                {item.icon && React.cloneElement(item.icon, { size: 18 })}
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 pb-12 border-t border-border/30">
                    <button onClick={logoutHandler} className="flex items-center w-full gap-3 p-3 rounded-lg text-left text-red-500 hover:bg-red-50 transition-colors duration-200">
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default MobileSidebar;