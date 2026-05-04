import { ArrowLeft, Bell, Menu, Search } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSidebar } from './MobileLayout';

export default function HeaderAll({ path, search, menu = true, onMenuClick }) {
    const navigate = useNavigate();
    const { setIsSidebarOpen } = useSidebar() || {};

    return (
        <header className="sticky top-0 z-40 glass-effect border-b border-border/30">
            <div className="flex items-center justify-between px-5 py-3">
                <button onClick={menu ? (onMenuClick || (() => setIsSidebarOpen?.(true))) : () => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 border border-primary/10 active:scale-90 transition-transform duration-150"
                >
                    {menu ? <Menu size={18} className="text-primary" /> : <ArrowLeft size={18} className="text-primary" />}
                </button>
                <h1 className="text-[17px] font-extrabold text-foreground tracking-tight">{path}</h1>
                {search ?
                    (
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 border border-primary/10 active:scale-90 transition-transform duration-150">
                                <Search size={18} className="text-primary" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 border border-primary/10 relative active:scale-90 transition-transform duration-150">
                                <Bell size={18} className="text-primary" />
                                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-background animate-pulse" />
                            </button>
                        </div>
                    ) :
                    (<button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 border border-primary/10 relative active:scale-90 transition-transform duration-150">
                        <Bell size={18} className="text-primary" />
                    </button>)
                }

            </div>
        </header>
    )
}
