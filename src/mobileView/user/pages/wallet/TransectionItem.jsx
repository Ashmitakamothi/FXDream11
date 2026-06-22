import { ArrowDownLeft, ArrowUpRight, Trophy, Zap } from "lucide-react";
import { formatDateTime } from "../../../../utils/formatDateTime";

const iconMap = {
  deposit: { Icon: ArrowDownLeft, bg: "#1d3d2e", fg: "text-[#33e6a6]" },
  withdrawal: { Icon: ArrowUpRight, bg: "#3d2424", fg: "text-[#ef4444]" },
  prize: { Icon: Trophy, bg: "#4d3a14", fg: "text-[#eab308]" },
  entry: { Icon: Zap, bg: "#2e204d", fg: "text-[#a855f7]" },
};

const TransactionItem = ({ tx }) => {
  const typeKey = tx.type?.toLowerCase() || (tx.transactionType?.toLowerCase() === "deposit" ? "deposit" : "withdrawal");
  const { Icon, bg, fg } = iconMap[typeKey] || iconMap.deposit;
  const isPositive = typeKey === "deposit" || typeKey === "prize";

  let title = tx.description || tx.transactionType || tx.type || "Transaction";
  if (!tx.description) {
      if (typeKey === "deposit") title = `Deposit of $${Number(Math.abs(tx.amount || 0)).toFixed(0)} confirmed`;
      else if (typeKey === "withdrawal") title = `Withdrawal processed`;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-[#121c17] rounded-[24px] mb-3">
      <div className="flex items-center gap-4">
        <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
          <Icon className={fg} size={20} strokeWidth={2} />
        </div>
        <div>
          <p className="text-[14px] font-bold text-white capitalize">{title}</p>
          <p className="text-[12px] text-[#75847f] mt-0.5">{formatDateTime(tx.createdAt)}</p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-[15px] font-bold ${isPositive ? "text-[#33e6a6]" : "text-[#ef4444]"}`}>
          {isPositive ? "+" : ""}${Number(Math.abs(tx.amount || 0)).toFixed(2)}
        </p>
        <p className="text-[10px] font-semibold text-[#75847f] mt-1 tracking-wider uppercase">
          {tx.ref || `TXN-${(tx.id || tx.transactionId || 49201).toString().slice(-4)}`}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;