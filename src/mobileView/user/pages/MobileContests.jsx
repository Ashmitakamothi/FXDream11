import React, { useState } from 'react'
import ContestCard from '../cards/ContestCard';
import useContestStore from '../../../store/contestStore';
import { Bell, Menu, Search, Trophy } from 'lucide-react';
import HeaderAll from '../../common/HeaderAll';

export default function MobileContests() {
    const [activeFilter, setActiveFilter] = useState("All");
    const { contests } = useContestStore()

    const filteredContests = contests.filter(c => 
        activeFilter === "All" || c.status?.toLowerCase() === activeFilter.toLowerCase()
    );

    return (
        <>
            <div className="min-h-screen bg-background max-w-md mx-auto relative">

               <HeaderAll path='Contests' search={true} menu={false} />
                <div className='flex flex-col gap-3'>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" >
                        {["All", "Open", "Running", "Completed", 'Cancelled'].map((item) => (
                            <button key={item} onClick={() => setActiveFilter(item)} style={activeFilter === item ? { boxShadow: "0 3px 12px #1FA97A40" } : undefined}
                                className={`px-5 py-2 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === item ? "bg-gradient-to-r from-primary to-[#19766F] text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="px-4 pb-28 flex flex-col gap-3 ">
                        {filteredContests.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                    <Trophy size={36} className="text-muted-foreground" />
                                </div>
                                <p className="text-[15px] font-semibold text-foreground">No contests available</p>
                                <p className="text-[13px] text-muted-foreground text-center">There are no contests in this category right now.</p>
                                <button style={{ boxShadow: '0 3px 12px #1ba17040' }}  onClick={() => setActiveFilter("All")}
                                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-[#19766F] text-primary-foreground text-[13px] font-bold active:scale-95 transition-transform"
                                >
                                    Browse All Contests
                                </button>
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
