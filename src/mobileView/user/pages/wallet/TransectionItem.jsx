import { ArrowDownLeft, ArrowUpRight, Trophy, Zap } from "lucide-react";
import { formatDateTime } from "../../../../utils/formatDateTime";

const iconMap = {
  deposit: { Icon: ArrowDownLeft, color: "text-green-400" },
  withdrawal: { Icon: ArrowUpRight, color: "text-red-400" },
  prize: { Icon: Trophy, color: "text-yellow-400" },
  entry: { Icon: Zap, color: "text-purple-400" },
};

const TransactionItem = ({ tx }) => {
  const { Icon, color } = iconMap[tx.type] || iconMap.entry;
  const isPositive = tx.transactionType === "Deposit";

  return (
    <div className="flex items-center justify-between p-3 bg-cardM rounded-xl">
      <div className="flex items-center gap-3">
        <Icon className={color} size={18} />
        <div>
          <p className="text-sm font-semibold">{tx.transactionType}</p>
          <p className="text-xs text-muted-foreground">{formatDateTime(tx.createdAt)}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? "+" : ""}${Math.abs(tx.amount)}
        </p>
        <p className="text-xs text-muted-foreground">{tx.ref}</p>
      </div>
    </div>
  );
};

export default TransactionItem;