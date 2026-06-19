const tabs = ["Overview", "Deposit", "Withdraw", "Transactions"];

const WalletTabs = ({ activeTab, setActiveTab }) => (
  <div className="px-5 mt-5">
    <div className="flex items-center justify-between">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${activeTab === tab ? "bg-[#131d18] text-white border border-[#203227]" : "text-[#8ca8a1]" }`}>
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default WalletTabs;