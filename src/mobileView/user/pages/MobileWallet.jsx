import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Plus, ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon, DollarSign, ChevronRight, CreditCard, ChevronDown, Trophy, Zap, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WalletTabs from "./wallet/WalletTabs";
import DepositTab from "./wallet/DepositTab";
import WithdrawTab from "./wallet/WithdrawTab";
import OverviewTab from "./wallet/OverViewTab";
import TransactionsTab from "./wallet/TransactionsTab";
import useWalletStore from "../../../store/walletStore";
import { formatDateTime } from "../../../utils/formatDateTime";
import HeaderAll from "../../common/HeaderAll";


const MobileWallet = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Overview");
    const [depositAmount, setDepositAmount] = useState("100");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const { wallet, loading: walletLoading, fetchWalletDetails, fetchTransactions, transactions, loading: transactionsLoading } = useWalletStore();

    useEffect(() => {
        fetchWalletDetails();
        fetchTransactions();
    }, [fetchWalletDetails, fetchTransactions]);

    const renderTab = () => {
        switch (activeTab) {
            case "Deposit":
                return <DepositTab amount={depositAmount} setAmount={setDepositAmount} />;
            case "Withdraw":
                return <WithdrawTab amount={withdrawAmount} setAmount={setWithdrawAmount} balance={wallet?.balance || 0} />;
            case "Transactions":
                return <TransactionsTab transactions={transactions || []} />;
            default:
                return <OverviewTab transactions={transactions || []} setActiveTab={setActiveTab} />;
        }
    };
    return (
        <div className="min-h-screen bg-background max-w-md mx-auto relative">

            <HeaderAll path="Wallet" />

            {/* Hero Wallet Card */}
            <div className="px-5 mt-2">
                <div className="relative rounded-2xl p-5 overflow-hidden" style={{ background: "linear-gradient(135deg, #141b27 0%, #19273c 40%, #192533 70%, #3c3521 100%)", boxShadow: "0 8px 32px #0f151f80, 0 0 60px #ffbc0014", }}>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl opacity-30" style={{ background: "radial-gradient(ellipse at 30% 20%, #ffca331f 0%, transparent 60%)" }} />
                    <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(180deg, #ffffff0a 0%, transparent 40%)" }} />

                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <p className="text-[11px] font-medium tracking-wider uppercase" style={{ color: "#a3b3c2" }}>Available Balance</p>
                            <p className="text-[32px] font-black mt-1 leading-tight" style={{ color: "#ffc433", textShadow: "0 0 24px #ffbd1a59" }}>
                                ${(wallet?.balance || 0).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <Clock size={10} style={{ color: "#6e8091" }} />
                                <p className="text-[10px] font-medium" style={{ color: "#6e8091" }}>{formatDateTime(wallet?.updatedAt)}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-1">
                            <button onClick={() => setActiveTab("Deposit")} className="flex items-center gap-1.5 px-3.5 py-2 rounded-3xl text-[11px] font-bold transition-all active:scale-90" style={{ background: "linear-gradient(135deg, #ffb500 0%, #da910b 100%)", color: "#1f1a14", boxShadow: "0 4px 16px #ffb5004d", }}>
                                <Plus size={13} strokeWidth={3} /> Deposit
                            </button>
                            <button onClick={() => setActiveTab("Withdraw")} className="flex items-center gap-1.5 px-3.5 py-2 rounded-3xl text-[11px] font-bold transition-all active:scale-90" style={{ background: "#242e4299", border: "1px solid #475a6e", color: "#ccd6e0", }}>
                                <ArrowUpRight size={13} strokeWidth={3} /> Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="px-5 mt-4 pb-28">
                {renderTab()}
            </div>

        </div>
    );
};



export default MobileWallet;