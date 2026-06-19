import { FaClock } from "react-icons/fa";
import useContestStore from "../../../store/contestStore";
import ContestCard from "./ContestCard";

const ActiveContests = () => {
    const { contests } = useContestStore()

    return (
        <div className="px-4">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-bold">Active Contests</h2>
                {/* <button className="text-xs font-semibold text-blue-500">See All</button> */}
                <button className="text-xs font-semibold text-[#059669]">See All</button>
            </div>

            <div className="flex flex-col gap-3">
                {contests.map((c, index) => (
                    <ContestCard key={c.contestId} contest={c} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ActiveContests;