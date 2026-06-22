import TransectionList from "./TransectionList";

const TransactionsTab = ({ transactions }) => (
  <div className="space-y-4">
    <h2 className="text-[18px] font-bold text-white mt-2">All Transactions</h2>
    <TransectionList items={transactions} />
  </div>
);

export default TransactionsTab;