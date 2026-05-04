import TransectionList from "./TransectionList";

const OverviewTab = ({ transactions, setActiveTab }) => (
  <>
    <div className="flex justify-between items-center mb-3">
      <h2 className="font-bold text-sm">Recent Transactions</h2>
      <button onClick={() => setActiveTab("Transactions")} className="text-xs text-yellow-400"> View All  </button>
    </div>

    <TransectionList items={transactions?.slice(0, 5) || []} />
  </>
);

export default OverviewTab;