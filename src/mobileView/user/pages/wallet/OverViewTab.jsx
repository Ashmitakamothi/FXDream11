import TransectionList from "./TransectionList";
import { ChevronRight } from "lucide-react";

const OverviewTab = ({ transactions, setActiveTab }) => (
  <>
    <div className="flex justify-between items-center mb-4 mt-2">
      <h2 className="font-bold text-[14px] text-gray-900 dark:text-white">Recent Transactions</h2>
      <button onClick={() => setActiveTab("Transactions")} className="text-[11px] font-bold text-[#ffc433] flex items-center gap-0.5"> View All <ChevronRight size={14} strokeWidth={3} /> </button>
    </div>

    <TransectionList items={transactions?.slice(0, 5) || []} />
  </>
);

export default OverviewTab;