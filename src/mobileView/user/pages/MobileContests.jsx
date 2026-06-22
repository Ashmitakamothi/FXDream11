import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ContestCard from '../cards/ContestCard';
import useContestStore from '../../../store/contestStore';
import { Bell, Menu, Search, Trophy, ArrowLeft } from 'lucide-react';
import HeaderAll from '../../common/HeaderAll';

import { useSidebar } from '../../common/MobileLayout';

export default function MobileContests() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("All");
    const { contests, getContests } = useContestStore();
    const { setIsSidebarOpen } = useSidebar() || {};

    useEffect(() => {
        getContests({});
    }, [getContests]);

    const filteredContests = contests.filter(c => 
        activeFilter === "All" || c.status?.toLowerCase() === activeFilter.toLowerCase()
    );

    return (
        <>
            <div className="min-h-screen bg-background max-w-md mx-auto relative">

                <header className="sticky top-0 z-40 glass-effect pt-3 pb-2 px-5">
                    <div className="flex items-start justify-between">
                        <button onClick={() => navigate(-1)} className="mt-1 w-9 h-9 flex items-center justify-center rounded-full bg-[#111a15] border border-transparent active:scale-90 transition-transform duration-150">
                            <ArrowLeft size={18} className="text-[#2aa880]" />
                        </button>
                        
                        <div className="flex flex-col items-center flex-1 mx-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                                <h1 className="text-[18px] font-extrabold text-white tracking-tight">Live Contests</h1>
                            </div>
                            <p className="text-[11px] text-[#75847F] mt-0.5 text-center leading-tight">
                                Compete in real-time and climb the leaderboard
                            </p>
                        </div>

                        <button className="mt-1 w-9 h-9 flex items-center justify-center rounded-full bg-[#111a15] border border-transparent relative active:scale-90 transition-transform duration-150">
                            <Bell size={18} className="text-[#2aa880]" />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#e85c5c] rounded-full"></span>
                        </button>
                    </div>
                </header>
                <div className='flex flex-col gap-3'>
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar px-4 pb-3 pt-1" >
                        {["All", "Open", "Running", "Completed", 'Cancelled'].map((item) => (
                            <button key={item} onClick={() => setActiveFilter(item)}
                                className={`px-5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === item ? "bg-[#1C7E5F] text-white" : "bg-[#12231F] text-gray-400"}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="px-4 pb-28 flex flex-col gap-3 ">
                        {filteredContests.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[65vh] gap-2 opacity-60">
                                <Trophy size={36} className="text-gray-400" strokeWidth={1.5} />
                                <p className="text-[13px] font-bold text-gray-400">Contest Not Found</p>
                            </div>
                        ) : (

                            filteredContests.map((c, index) => (
                                <ContestCard key={c.contestId} contest={c} index={index} actionbtns={true} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}
