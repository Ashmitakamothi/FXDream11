const tabs = ["Overview", "Deposit", "Withdraw", "Transactions"];

const WalletTabs = ({ activeTab, setActiveTab }) => (
  <div className="px-5 mt-5">
    <div className="flex gap-1 p-1.5 rounded-full bg-gray-100 dark:bg-[#1b2521]">
      {tabs.map((tab) => (
        <button 
          key={tab} 
          onClick={() => setActiveTab(tab)} 
          className={`flex-1 py-2.5 outline-none border-none rounded-full text-[12px] font-bold transition-all duration-200 ${
            activeTab === tab 
              ? "bg-white text-gray-900 shadow-sm dark:bg-[#111815] dark:text-white" 
              : "text-gray-500 hover:text-gray-700 dark:text-[#75847f] dark:hover:text-white/70"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default WalletTabs;