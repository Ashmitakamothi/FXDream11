import { ArrowLeft, Bell, Menu, Search } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSidebar } from './MobileLayout';

export default function HeaderAll({ path, search, menu = true, onMenuClick }) {
    const navigate = useNavigate();
    const { setIsSidebarOpen } = useSidebar() || {};

    return (
        <header className="sticky top-0 z-40 glass-effect">
            <div className="flex items-center justify-between px-5 py-2">
                <button onClick={menu ? (onMenuClick || (() => setIsSidebarOpen?.(true))) : () => navigate(-1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#111a15] border border-transparent active:scale-90 transition-transform duration-150"
                >
                    {menu ? <Menu size={18} className="text-[#2aa880]" /> : <ArrowLeft size={18} className="text-[#2aa880]" />}
                </button>
                <h1 className="text-[16px] font-extrabold text-white tracking-tight">{path}</h1>
                {search ?
                    (
                        <div className="flex items-center gap-3">
                            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#111a15] border border-transparent active:scale-90 transition-transform duration-150">
                                <Search size={18} className="text-[#2aa880]" />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#111a15] border border-transparent relative active:scale-90 transition-transform duration-150">
                                <Bell size={18} className="text-[#2aa880]" />
                                {/* Red dot for notification indicator from screenshot */}
                                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#e85c5c] rounded-full"></span>
                            </button>
                        </div>
                    ) :
                    (<button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#111a15] border border-transparent relative active:scale-90 transition-transform duration-150">
                        <Bell size={18} className="text-[#2aa880]" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#e85c5c] rounded-full"></span>
                    </button>)
                }

            </div>
        </header>
    )
}
