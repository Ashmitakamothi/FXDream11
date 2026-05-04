import TransectionList from "./TransectionList";

const TransactionsTab = ({ transactions }) => (
  <div className="space-y-4">
    <h2 className="text-[14px] font-bold text-foreground">All Transactions</h2>
    <TransectionList items={transactions} />
  </div>
);

export default TransactionsTab;