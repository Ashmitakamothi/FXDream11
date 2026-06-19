import React, { useState, useEffect } from 'react'
import ContestCard from '../cards/ContestCard';
import useContestStore from '../../../store/contestStore';
import { Bell, Menu, Search, Trophy } from 'lucide-react';
import HeaderAll from '../../common/HeaderAll';

export default function MobileContests() {
    const [activeFilter, setActiveFilter] = useState("All");
    const { contests, getContests } = useContestStore();

    useEffect(() => {
        getContests({});
    }, [getContests]);

    const filteredContests = contests.filter(c => 
        activeFilter === "All" || c.status?.toLowerCase() === activeFilter.toLowerCase()
    );

    return (
        <>
            <div className="min-h-screen bg-background max-w-md mx-auto relative">

               <HeaderAll path='Contest' search={true} menu={false} />
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
