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
                <div className="rounded-[24px] p-5 bg-[#121c17]">
                    <label className="text-[11px] font-bold text-[#75847f] uppercase tracking-wider">Amount (USD)</label>
                    <div className="flex items-center justify-between bg-[#1b2622] rounded-[24px] p-2 mt-3">
                        <button type="button" onClick={() => setAmount(String(Math.max(0, Number(amount) - 10)))} className="w-10 h-10 rounded-full bg-[#121c17] flex items-center justify-center text-[#75847f] font-bold text-lg active:scale-90 transition-transform">−</button>
                        <div className="flex-1 flex justify-center items-center">
                            <span className="text-[#75847f] font-bold text-lg mr-1.5">$</span>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-20 bg-transparent text-center text-[22px] font-bold text-white focus:outline-none p-0 border-none m-0 appearance-none" style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} />
                        </div>
                        <button type="button" onClick={() => setAmount(String(Number(amount) + 10))} className="w-10 h-10 rounded-full bg-[#121c17] flex items-center justify-center text-[#75847f] font-bold text-lg active:scale-90 transition-transform">+</button>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {quickAmounts.map((q) => (
                            <button key={q} type="button" onClick={() => setAmount(String(q))} className={`flex-1 py-2.5 rounded-full text-[12px] font-bold transition-all active:scale-90 ${amount === String(q) ? "bg-[#1fa97a] text-white" : "bg-[#1b2622] text-[#1fa97a]"}`}>
                                ${q}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-[24px] p-5 bg-[#121c17]">
                    <label className="text-[11px] font-bold text-[#75847f] uppercase tracking-wider">Payment Method</label>
                    <Form.Item name="paymentMethod" noStyle>
                        <div className="bg-[#1b2622] rounded-[20px] mt-3">
                            <Select 
                                bordered={false}
                                className="w-full h-[52px] [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:flex [&_.ant-select-selector]:!items-center [&_.ant-select-selection-item]:pl-1" 
                                dropdownStyle={{ borderRadius: '16px', backgroundColor: '#1b2622', border: 'none' }} 
                                suffixIcon={<ChevronDown size={16} className="text-[#75847f] mr-2" />}
                            >
                                <Select.Option value="bank">
                                    <div className="flex items-center gap-3 py-1.5 pl-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#3b82f6]">
                                            <Landmark size={14} className="text-white" />
                                        </div>
                                        <span className="text-[13px] font-bold text-white">Bank Transfer</span>
                                    </div>
                                </Select.Option>
                                <Select.Option value="card">
                                    <div className="flex items-center gap-3 py-1.5 pl-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#4f46e5]">
                                            <CreditCard size={14} className="text-white" />
                                        </div>
                                        <span className="text-[13px] font-bold text-white">Credit Card</span>
                                    </div>
                                </Select.Option>
                                <Select.Option value="upi">
                                    <div className="flex items-center gap-3 py-1.5 pl-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#1fa97a]">
                                            <Smartphone size={14} className="text-white" />
                                        </div>
                                        <span className="text-[13px] font-bold text-white">UPI / Instant Pay</span>
                                    </div>
                                </Select.Option>
                            </Select>
                        </div>
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