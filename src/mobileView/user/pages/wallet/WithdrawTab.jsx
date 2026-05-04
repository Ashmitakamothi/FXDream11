import React from 'react';
import { Form, Input, message } from "antd";
import { Wallet as WalletIcon, ChevronDown } from "lucide-react";
import useWalletStore from "../../../../store/walletStore";

const WithdrawTab = ({ amount, setAmount, balance }) => {
    const [form] = Form.useForm();
    const { withdraw, loading ,fetchTransactions} = useWalletStore();

    const onFinish = async (values) => {
        const withdrawVal = Number(amount);
        if (withdrawVal <= 0) {
            return message.error("Please enter a valid amount");
        }
        if (withdrawVal > balance) {
            return message.error("Insufficient funds in wallet");
        }

        try {
            await withdraw({ ...values, amount: withdrawVal });
            message.success("Withdrawal request submitted successfully!");
            form.resetFields();
            setAmount("");
            fetchTransactions()
        } catch (error) {
            message.error(error.message || "Withdrawal failed");
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="space-y-5">
                <div className="rounded-xl p-4 text-center" style={{ background: "linear-gradient(135deg, #173027 0%, #12211c 100%)", border: "1px solid #2659474d" }}>
                    <p className="text-[10px] font-medium" style={{ color: "#7abda3" }}>Available for Withdrawal</p>
                    <p className="text-[24px] font-black mt-1" style={{ color: "#47d1a3" }}>${balance.toFixed(2)}</p>
                </div>

                <div className="rounded-3xl p-5 bg-cardM card-shadow border border-border">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Amount (USD)</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="w-full h-12 rounded-3xl bg-muted-soft bg-opacity-60 border border-border/50 text-center text-xl font-bold text-foreground mt-3 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" />
                </div>

                <div className="rounded-3xl p-4 bg-cardM card-shadow border border-border/50">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Withdraw To</label>
                    <div className="mt-3 flex items-center justify-between p-3 rounded-3xl bg-muted-soft bg-opacity-60 border border-border/50">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2d8665 0%, #276754 100%)" }}>
                                <WalletIcon size={14} className="text-[#ffffff]" />
                            </div>
                            <span className="text-[13px] font-semibold text-foreground">Bank Account</span>
                        </div>
                        <ChevronDown size={16} className="text-muted-foreground" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3.5 rounded-3xl text-[13px] font-bold active:scale-95 transition-transform disabled:opacity-50" style={{ background: "linear-gradient(135deg, #1ba170 0%, #1d7254 100%)", boxShadow: "0 6px 20px #1ba17040", color: "#ffffff", }}>
                    {loading ? "Processing..." : "Request Withdrawal"}
                </button>
                <p className="text-[10px] text-center text-muted-foreground">⏱ Processing time: 1–24 hours</p>
            </div>
        </Form>
    );
};

export default WithdrawTab;