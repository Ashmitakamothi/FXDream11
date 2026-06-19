import { ArrowDownLeft, ArrowUpRight, Trophy, Zap } from "lucide-react";
import { formatDateTime } from "../../../../utils/formatDateTime";

const iconMap = {
  deposit: { Icon: ArrowDownLeft, bg: "#1b3d30", fg: "text-[#2aa880]" },
  withdrawal: { Icon: ArrowUpRight, bg: "#3d2222", fg: "text-[#e85c5c]" },
  prize: { Icon: Trophy, bg: "#3d321b", fg: "text-[#ffc433]" },
  entry: { Icon: Zap, bg: "#2a1b3d", fg: "text-[#a085e6]" },
};

const TransactionItem = ({ tx }) => {
  const typeKey = tx.type?.toLowerCase() || (tx.transactionType?.toLowerCase() === "deposit" ? "deposit" : "withdrawal");
  const { Icon, bg, fg } = iconMap[typeKey] || iconMap.deposit;
  const isPositive = typeKey === "deposit" || typeKey === "prize";

  return (
    <div className="flex items-center justify-between p-3 bg-[#111a15] rounded-2xl mb-2">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: bg }}>
          <Icon className={fg} size={18} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[13px] font-bold text-white capitalize">{tx.transactionType || tx.type}</p>
          <p className="text-[11px] text-[#8ca8a1] mt-0.5">{formatDateTime(tx.createdAt)}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={`text-[14px] font-bold ${isPositive ? "text-[#2aa880]" : "text-[#e85c5c]"}`}>
          {isPositive ? "+" : "-"}${Number(Math.abs(tx.amount || 0)).toFixed(2)}
        </p>
        <p className="text-[10px] font-semibold text-[#8ca8a1] mt-0.5 tracking-wider uppercase">
          {tx.ref || `TXN-${(tx.id || tx.transactionId || 19).toString().slice(-4)}`}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;