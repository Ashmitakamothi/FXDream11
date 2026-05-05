import React from "react";
import { Input, Button, Form, message, Typography } from "antd";
import { useTheme } from "../../../ThemeContext";
import { HiDownload } from "react-icons/hi";
import useWalletStore from "../../../store/walletStore";

export default function Deposit({ amount, setAmount }) {
    const { theme } = useTheme();
    const presets = [50, 100, 250, 500];
    const [form] = Form.useForm();
    const { deposit, fetchTransactions } = useWalletStore();
    // const paymentMethod = Form.useWatch('paymentMethod', form);

    const onFinish = async (values) => {
        try {
            await deposit({ ...values, amount: Number(amount) });
            message.success("Deposit request initiated successfully!");
            form.resetFields();
            fetchTransactions()
        } catch (error) {
            message.error(error.message || "Failed to process deposit");
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ paymentMethod: 'bank' }}>

            <div className="flex flex-col gap-6 py-4">

                <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]">
                    <Typography.Text className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2">Enter Deposit Amount</Typography.Text>
                    <div className="flex items-center border border-[var(--border)] rounded-xl px-3 bg-[var(--theme-bg)]">
                        <span className="text-xl font-bold text-cyan-400 mr-2">$</span>
                        <Input variant="borderless" placeholder="Enter amount"  value={amount} onChange={(e) => setAmount(e.target.value)} className="p-0 text-3xl font-bold text-[var(--theme-text)] placeholder:text-gray-600 focus:shadow-none bg-transparent"   />
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {presets.map((p) => (
                        <Button key={p} onClick={() => setAmount(p)} bordered={false} variant="outlined" color="prmary"
                            className={`rounded-xl px-3 h-7 !border-none transition-all  ${amount === p ? `card-gradient ${theme === 'dark' ? 'text-black' : 'text-white'}` : 'bg-[var(--muted)] text-[var(--theme-text)]'}`}
                        >
                            ${p}
                        </Button>
                    ))}
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold ml-1">Select Payment Mode</p>
                    <div className="flex items-center justify-between p-4 rounded-3xl bg-[var(--muted)] border border-cyan-500/20 cursor-pointer hover:border-cyan-500 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 grid place-items-center">
                                <HiDownload className="text-cyan-500 text-lg" />
                            </div>
                            <div>
                                <p className="font-bold mb-0 text-sm">UPI / Net Banking</p>
                                <p className="text-[10px] text-gray-500 mb-0 uppercase tracking-tighter font-medium">Instant Credit • Secure</p>
                            </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full bg-cyan-500" />
                        </div>
                    </div>
                </div>

                <Button type="primary" htmlType="submit"
                    className={`w-full h-12 rounded-2xl card-gradient !border-none font-bold text-base shadow-lg transition-all active:scale-95 ${theme === 'dark' ? 'text-black' : 'text-white'}`}
                >
                    Confirm Deposit
                </Button>
            </div>
        </Form>

    );
}
