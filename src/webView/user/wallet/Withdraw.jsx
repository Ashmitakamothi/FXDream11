import React from "react";
import { Input, Button, Tag, Form, Typography, message } from "antd";
import { useTheme } from "../../../ThemeContext";
import { LuWallet } from "react-icons/lu";
import { HiUpload } from "react-icons/hi";
import useWalletStore from "../../../store/walletStore";

export default function WithdrawModal({ amount, setAmount, balance, onSuccess }) {
    const { theme } = useTheme();
    const [form] = Form.useForm();
    const { withdraw, loading, fetchTransactions, fetchWallet } = useWalletStore();
    const quickAmounts = [100, 250, 500, 1000];

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
            await Promise.all([fetchTransactions(), fetchWallet()]);
            onSuccess?.();
        } catch (error) {
            message.error(error?.response?.data?.message || error.message || "Withdrawal failed");
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="flex flex-col gap-4 py-2">
                <div className={`p-4 rounded-2xl border border-[var(--border)] flex justify-between items-center bg-gradient-to-r ${theme === "dark" ? "from-white/5 to-transparent" : "from-black/5 to-transparent"}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-cyan-500/10 grid place-items-center">
                            <LuWallet className="text-cyan-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 mb-0 uppercase tracking-widest font-bold">Available Balance</p>
                            <p className="text-2xl font-bold mb-0">${Number(balance).toFixed(2)}</p>
                        </div>
                    </div>
                    <Tag color="success" className="rounded-full border-none px-4 py-0.5 bg-green-500/10 text-green-500 font-bold uppercase text-[9px] tracking-widest">Verified</Tag>
                </div>

                <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]">
                    <Typography.Text className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2">
                        Amount to Withdraw
                    </Typography.Text>
                    <div className="flex items-center border border-[var(--border)] rounded-xl px-3 bg-[var(--theme-bg)]">
                        <span className="text-xl font-bold text-cyan-400 mr-2">$</span>
                        <Input variant="borderless" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="!p-0 h-11 text-2xl font-bold text-[var(--theme-text)] bg-transparent"/>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {quickAmounts.map((preset) => (
                        <Button key={preset} onClick={() => setAmount(String(preset))}
                            className={`rounded-xl h-9 px-4 !border-none hover:!opacity-80 ${Number(amount) === preset ? `card-gradient ${theme === "dark" ? "!text-black" : "!text-white"}` : "bg-[var(--muted)] text-[var(--theme-text)]"}`}
                        >
                            ${preset}
                        </Button>
                    ))}
                </div>


                <div className="p-4 rounded-2xl bg-[var(--muted)] border border-[var(--border)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 grid place-items-center">
                            <HiUpload className="text-blue-500 text-base" />
                        </div>
                        <div>
                            <p className="font-semibold mb-0 text-sm">Withdrawal processing</p>
                            <p className="text-[11px] text-gray-500 mb-0">Bank transfer in 24-48 hours after approval.</p>
                        </div>
                    </div>
                </div>

                <Button type="primary" htmlType="submit" loading={loading} disabled={Number(amount) > Number(balance) || !amount || Number(amount) <= 0}
                    className={`w-full h-10 rounded-2xl card-gradient !border-none font-bold text-base shadow-lg transition-all active:scale-95 ${theme === 'dark' ? 'text-black' : 'text-white'} disabled:opacity-50`}
                >
                    {Number(amount) > Number(balance) ? "Insufficient Balance" : "Request Withdrawal"}
                </Button>
            </div>
        </Form>

    );
}
