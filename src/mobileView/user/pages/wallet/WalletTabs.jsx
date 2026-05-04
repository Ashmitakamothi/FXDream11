const tabs = ["Overview", "Deposit", "Withdraw", "Transactions"];

const WalletTabs = ({ activeTab, setActiveTab }) => (
  <div className="px-5 mt-5">
    <div className="flex gap-1 p-1 rounded-3xl bg-muted-soft">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-2xl text-xs font-semibold ${activeTab === tab ? "bg-cardM text-foreground" : "text-muted-foreground" }`}>
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default WalletTabs;