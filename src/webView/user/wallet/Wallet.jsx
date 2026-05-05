import React, { useEffect, useState } from "react";
import { Card, Button, Input, Table, Tag } from "antd";
import { SearchOutlined, CalendarOutlined } from "@ant-design/icons";
import { LuWallet } from "react-icons/lu";
import { HiArrowTrendingUp, HiMiniArrowTrendingDown } from "react-icons/hi2";
import { GoTrophy } from "react-icons/go";
import { HiDownload, HiUpload } from "react-icons/hi";
import useWalletStore from "../../../store/walletStore";
import { formatDate } from "../../../utils/formatDateTime";
import dayjs from "dayjs";


const typeTag = (type = "") => {
    const normalized = type.toLowerCase();
    const map = {
        deposit: { color: "gold", icon: <HiDownload />, },
        winning: { color: "cyan", icon: <GoTrophy />, },
        withdraw: { color: "blue", icon: <HiUpload />, },
        withdrawal: { color: "blue", icon: <HiUpload />, },
        losing: { color: "red", icon: <HiMiniArrowTrendingDown />, },
    };

    const item = map[normalized] || {};

    return (
        <Tag color={item.color} icon={item.icon} className="!text-[9px] font-bold flex items-center gap-1 w-fit px-3 py-0.5 rounded-full">{type?.toUpperCase()}</Tag>
    );
};

const columns = [
    { title: "TYPE", dataIndex: "transactionType", render: (t) => typeTag(t),},
    { title: "DESCRIPTION", dataIndex: "description", render: (t, record) => <span className=" font-medium">{t || record.transactionType}</span>,},
    { title: "DATE", dataIndex: "createdAt", render: (date) => formatDate(date),},
    { title: "STATUS", dataIndex: "status", render: (s) => <Tag color={s === "Completed" || s === "Success" ? "success" : "processing"}>{s}</Tag>},
    {
        title: "AMOUNT",
        dataIndex: "amount",
        render: (amt, record) => {
            const type = record.transactionType?.toLowerCase();
            const isNegative = type === "withdrawal" || type === "withdraw" || type === "losing";
            return (<span className={`font-semibold ${isNegative ? "text-red-400" : "text-cyan-400"}`}>{isNegative ? "-" : "+"}${Number(amt).toFixed(2)}</span>);
        },
    },
];

export default function Wallet() {
    const { wallet, fetchWalletDetails, fetchTransactions, transactions, loading: transactionsLoading } = useWalletStore();
    const [searchText, setSearchText] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isLast30Days, setIsLast30Days] = useState(false);

    useEffect(() => {
        fetchWalletDetails();
        fetchTransactions();
    }, [fetchWalletDetails, fetchTransactions]);

    // Filtering Logic
    const filteredTransactions = (transactions || []).filter((item) => {
        const type = item.transactionType?.toLowerCase() || "";
        const desc = item.description?.toLowerCase() || "";
        const search = searchText.toLowerCase();

        const matchesSearch = !searchText || type.includes(search) || desc.includes(search);

        const matchesCategory = activeFilter === "All" || 
            (activeFilter === "Withdraw" ? (type === "withdraw" || type === "withdrawal") : type === activeFilter.toLowerCase());

        const matchesDate = !isLast30Days || 
            dayjs(item.createdAt).isAfter(dayjs().subtract(30, 'day'));

        return matchesSearch && matchesCategory && matchesDate;
    });

    const totals = (transactions || []).reduce((acc, curr) => {
        const type = curr.transactionType?.toLowerCase();
        const amount = Number(curr.amount) || 0;
        if (type === "deposit") acc.deposit += amount;
        else if (type === "withdrawal" || type === "withdraw") acc.withdraw += amount;
        else if (type === "winning") acc.winning += amount;
        else if (type === "losing") acc.losing += amount;
        return acc;
    }, { deposit: 0, withdraw: 0, winning: 0, losing: 0 });

    const stats = [
        {
            title: "CURRENT BALANCE",
            value: wallet.balance ? `$${wallet.balance.toFixed(2)}` : "$0.00",
            sub: "+4.2% today",
            color: "from-cyan-500 to-teal-600",
            icon: <LuWallet />,
        },
        {
            title: "TOTAL DEPOSIT",
            value: `$${totals.deposit.toFixed(2)}`,
            color: "text-orange-400",
            icon: <HiDownload />,
        },
        {
            title: "TOTAL WITHDRAW",
            value: `$${totals.withdraw.toFixed(2)}`,
            color: "text-gray-300",
            icon: <HiUpload />,
        },
        {
            title: "TOTAL WINNING",
            value: `$${totals.winning.toFixed(2)}`,
            color: "text-yellow-400",
            icon: <GoTrophy fontSize={12.5} />,
        },
        {
            title: "TOTAL LOSING",
            value: `$${totals.losing.toFixed(2)}`,
            color: "text-red-400",
            icon: <HiDownload />,
        },
    ];
    return (
        <div className="custom-container px-4 py-6 lg:px-8 pb-6 md:pb-10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-0.3">
                    <h1 className="text-2xl font-bold tracking-tight mb-0">Wallet</h1>
                    <p className="text-gray-400 text-sm mb-0">Track every move of your money.</p>
                </div>

                <div className="flex gap-3">
                    <Button icon={<HiDownload />} type="primary" className="rounded-xl card-gradient !border-none hover:!border-none px-6 h-11">
                        Deposit
                    </Button>
                    <Button icon={<HiUpload />} className="rounded-xl gradient-card !border-none hover:!border-none  px-6 h-11 hover:bg-[var(--muted)] text-[var(--theme-text)] hover:!text-[var(--theme-text)]">
                        Withdraw
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {stats.map((item, i) => (
                    <Card key={i} bordered={false} className={`rounded-3xl border border-[var(--border)] transition-all duration-300 hover:-translate-y-2 neon-cyan-card cursor-pointer ${i === 0 ? "card-gradient text-black" : "gradient-card"}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs tracking-widest">{item.title}</span>
                            <span className={`grid h-8 w-8 place-items-center rounded-full ${i === 0 ? "bg-white/20" : "bg-[var(--muted)]"}`}>
                                {item.icon}
                            </span>
                        </div>

                    <h2 className={`text-2xl font-bold mb-0 ${i === 0 ? "" : item.color}`}>{item.value}</h2>
                        {item.sub && (<p className="text-xs mt-0 text-lighter flex items-center gap-1"><HiArrowTrendingUp />{item.sub}</p>)}
                    </Card>
                ))}
            </div>

            {/* Transactions */}
            <Card bordered={false} className="rounded-2xl gradient-card border border-[var(--border)]">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-sm">Transactions</h2>

                    <div className="flex gap-3">
                        <Input  placeholder="Search..."  prefix={<SearchOutlined />}  className="bg-[var(--input)] border-none text-[var(--theme-text)] rounded-full h-9"  value={searchText}onChange={(e) => setSearchText(e.target.value)}/>
                        <Button  icon={<CalendarOutlined />} onClick={() => setIsLast30Days(!isLast30Days)}
                            className={`bg-[var(--input)] !border-none hover:!border-none text-xs rounded-full h-9 !shadow-none text-[var(--theme-text)] hover:!text-[var(--theme-text)] ${isLast30Days ? "card-gradient !text-black" : ""}`}
                        >
                            Last 30 days
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-4">
                    {["All", "Deposit", "Withdraw", "Winning", "Losing"].map(
                        (f, i) => (
                            <Button  key={i}  size="small"  onClick={() => setActiveFilter(f)}
                                className={`rounded-full text-xs px-4 ${activeFilter === f ? "card-gradient" : "bg-[var(--muted)]"} hover:!bg-[var(--muted)] hover:!opacity-80 !border-none hover:!border-none text-[var(--theme-text)] hover:!text-[var(--theme-text)]`}
                            >
                                {f}
                            </Button>
                        )
                    )}
                </div>

                {/* Table */}
                <Table columns={columns} dataSource={filteredTransactions} pagination={false} className="custom-table" rowKey={(record, index) => record.transactionId || index} loading={transactionsLoading}/>
            </Card>


        </div>
    );
}