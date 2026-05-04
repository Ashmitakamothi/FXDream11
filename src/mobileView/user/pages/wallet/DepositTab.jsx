import React from 'react';
import { Form, Input, Select, message } from "antd";
import { CreditCard, ChevronDown, Landmark, Smartphone } from "lucide-react";
import useWalletStore from "../../../../store/walletStore";

const DepositTab = ({ amount, setAmount }) => {
    const [form] = Form.useForm();
    const { deposit, loading,fetchTransactions } = useWalletStore();
    const paymentMethod = Form.useWatch('paymentMethod', form);

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

    const quickAmounts = [50, 100, 250, 500];
    return (
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ paymentMethod: 'bank' }}>
            <div className="space-y-5">
                <div className="rounded-3xl p-5 bg-cardM card-shadow border border-border/50">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Amount (USD)</label>
                    <div className="flex items-center gap-3 mt-3">
                        <button type="button" onClick={() => setAmount(String(Math.max(0, Number(amount) - 10)))} className="w-10 h-10 rounded-3xl bg-muted-soft flex items-center justify-center text-foreground font-bold text-lg active:scale-90 transition-transform">−</button>
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">$</span>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full h-12 rounded-3xl bg-muted-soft bg-opacity-60 border border-border/50 text-center text-xl font-bold text-foreground pl-7 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                        </div>
                        <button type="button" onClick={() => setAmount(String(Number(amount) + 10))} className="w-10 h-10 rounded-3xl bg-muted-soft flex items-center justify-center text-foreground font-bold text-lg active:scale-90 transition-transform">+</button>
                    </div>
                    <div className="flex gap-2 mt-3">
                        {quickAmounts.map((q) => (
                            <button key={q} type="button" onClick={() => setAmount(String(q))} className={`flex-1 py-2 rounded-3xl text-[11px] font-semibold transition-all active:scale-90 ${amount === String(q) ? "bg-primary text-primary-foreground" : "bg-muted-soft text-muted-foreground"}`}>
                                ${q}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl p-4 bg-cardM card-shadow border border-border/50">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Payment Method</label>
                    <Form.Item name="paymentMethod" noStyle>
                        <Select className="w-full mt-3 h-14 border-none bg-muted-soft rounded-3xl" dropdownStyle={{ borderRadius: '20px' }} suffixIcon={<ChevronDown size={16} className="text-muted-foreground" />}>
                            <Select.Option value="bank">
                                <div className="flex items-center gap-2.5 py-1">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10">
                                        <Landmark size={14} className="text-blue-500" />
                                    </div>
                                    <span className="text-[13px] font-semibold text-foreground">Bank Transfer</span>
                                </div>
                            </Select.Option>
                            <Select.Option value="card">
                                <div className="flex items-center gap-2.5 py-1">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10">
                                        <CreditCard size={14} className="text-indigo-500" />
                                    </div>
                                    <span className="text-[13px] font-semibold text-foreground">Credit Card</span>
                                </div>
                            </Select.Option>
                            <Select.Option value="upi">
                                <div className="flex items-center gap-2.5 py-1">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10">
                                        <Smartphone size={14} className="text-emerald-500" />
                                    </div>
                                    <span className="text-[13px] font-semibold text-foreground">UPI / Instant Pay</span>
                                </div>
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                {paymentMethod && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        {paymentMethod === 'bank' && (
                            <div className="p-4 bg-muted-soft bg-opacity-30 rounded-2xl border border-border/30">
                                <p className="text-[10px] text-primary font-bold uppercase mb-2 tracking-wider">Account details</p>
                                <div className="flex flex-col gap-2 text-foreground/80 p-3 rounded-xl bg-background/50 text-[12px]">
                                    <p><span className="opacity-60">Acc Holder:</span> <span className="font-bold">TerioPay Admin</span></p>
                                    <p><span className="opacity-60">Acc No:</span> <span className="font-mono font-bold tracking-wider">1234 5678 9012</span></p>
                                    <p><span className="opacity-60">IFSC:</span> <span className="font-mono font-bold tracking-wider">TPAY0001234</span></p>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                            <div className="space-y-3">
                                <Form.Item name="cardNumber" rules={[{ required: true, message: 'Required' }]} noStyle>
                                    <Input placeholder="Card Number" className="h-12 rounded-2xl bg-muted-soft bg-opacity-60 border-border/50 text-foreground" />
                                </Form.Item>
                                <div className="grid grid-cols-2 gap-3">
                                    <Form.Item name="expiry" rules={[{ required: true, message: 'Required' }]} noStyle>
                                        <Input placeholder="MM/YY" className="h-12 rounded-2xl bg-muted-soft bg-opacity-60 border-border/50 text-foreground" />
                                    </Form.Item>
                                    <Form.Item name="cvv" rules={[{ required: true, message: 'Required' }]} noStyle>
                                        <Input.Password placeholder="CVV" className="h-12 rounded-2xl bg-muted-soft bg-opacity-60 border-border/50 text-foreground" />
                                    </Form.Item>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'upi' && (
                            <Form.Item name="upiId" rules={[{ required: true, message: 'Required' }]} noStyle>
                                <Input placeholder="username@bank" className="h-12 rounded-2xl bg-muted-soft bg-opacity-60 border-border/50 text-foreground" />
                            </Form.Item>
                        )}
                    </div>
                )}

                <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-3xl text-[13px] font-bold active:scale-95 transition-transform disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #ffb500 0%, #c5830a 100%)", boxShadow: "0 6px 24px #ffb5004d", color: "#1f1a14" }}
                >
                    {loading ? "Processing..." : `Deposit $${amount || "0"}`}
                </button>
            </div>
        </Form>
    );
};
export default DepositTab;