import React from 'react';
import { Form, Input, Select, message } from "antd";
import { Wallet as WalletIcon, ChevronDown, Timer } from "lucide-react";
import useWalletStore from "../../../../store/walletStore";

const WithdrawTab = ({ amount, setAmount, balance }) => {
    const [form] = Form.useForm();
    const { withdraw, loading, fetchTransactions } = useWalletStore();

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
            <div className="space-y-4">
                <div className="rounded-[24px] p-6 text-center bg-white dark:bg-[#121c17] shadow-sm dark:shadow-none">
                    <p className="text-[12px] font-medium text-[#75847f]">Available for Withdrawal</p>
                    <p className="text-[32px] font-black mt-1 text-[#33e6a6]">${balance.toFixed(2)}</p>
                </div>

                <div className="rounded-[24px] p-5 bg-white dark:bg-[#121c17] shadow-sm dark:shadow-none">
                    <label className="text-[11px] font-bold text-[#75847f] uppercase tracking-wider">Amount (USD)</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount" 
                        className="w-full h-[52px] rounded-[20px] bg-gray-50 dark:bg-[#1b2622] text-center text-[18px] font-bold text-gray-900 dark:text-white mt-3 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-[#4d5d56] placeholder:font-bold border-none" 
                        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                    />
                </div>

                <div className="rounded-[24px] p-5 bg-white dark:bg-[#121c17] shadow-sm dark:shadow-none">
                    <label className="text-[11px] font-bold text-[#75847f] uppercase tracking-wider">Withdraw To</label>
                    <Form.Item name="withdrawMethod" initialValue="bank" noStyle>
                        <div className="bg-gray-50 dark:bg-[#1b2622] rounded-[20px] mt-3">
                            <Select 
                                bordered={false}
                                className="w-full h-[52px] [&_.ant-select-selection-item]:!text-gray-900 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:flex [&_.ant-select-selector]:!items-center [&_.ant-select-selection-item]:pl-1" 
                                dropdownStyle={{ borderRadius: '16px', backgroundColor: '#1b2622', border: 'none' }} 
                                suffixIcon={<ChevronDown size={16} className="text-[#75847f] mr-2" />}
                            >
                                <Select.Option value="bank">
                                    <div className="flex items-center gap-3 py-1.5 pl-2">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1fa97a]">
                                            <WalletIcon size={14} className="text-white" />
                                        </div>
                                        <span className="text-[14px] font-bold text-gray-900 dark:text-white">Bank Account</span>
                                    </div>
                                </Select.Option>
                            </Select>
                        </div>
                    </Form.Item>
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 rounded-[24px] text-[15px] font-bold active:scale-95 transition-transform disabled:opacity-50 text-white bg-[#1fa97a] mt-2"
                >
                    {loading ? "Processing..." : "Request Withdrawal"}
                </button>
                <div className="flex justify-center items-center gap-1.5 mt-2">
                    <Timer size={12} className="text-[#75847f]" />
                    <span className="text-[11px] text-[#75847f]">Processing time: 1–24 hours</span>
                </div>
            </div>
        </Form>
    );
};

export default WithdrawTab;