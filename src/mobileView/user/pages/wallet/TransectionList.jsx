import TransactionItem from "./TransectionItem";

const TransactionList = ({ items }) => (
  <div className="space-y-2">
    {items && items.length > 0 ? (
      items.map((tx) => (
        <TransactionItem key={tx.id || tx.transactionId} tx={tx} />
      ))
    ) : (
      <div className="py-10 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">No transactions found</p>
      </div>
    )}
  </div>
);

export default TransactionList;