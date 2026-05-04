import { LiaDownloadSolid } from "react-icons/lia";
import { IoTrophyOutline, IoCompassOutline, IoWalletOutline } from "react-icons/io5";
import { GoShieldLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: LiaDownloadSolid,
    label: "Deposit",
    gradient: "from-[#1e3a8a] to-[#1e293b]", // blue
    glowColor: "rgba(59,130,246,0.15)",
    fontSize: "18px",
    link:'/wallet'
  },
  {
    icon: IoTrophyOutline,
    label: "My Contest",
    gradient: "from-[#b45309] to-[#7c2d12]", // gold/orange
    glowColor: "rgba(245,158,11,0.15)",
    fontSize: "16px",
    link:'/my-contests'
  },
  {
    icon: GoShieldLock,
    label: "Profile",
    gradient: "from-[#065f46] to-[#134e4a]", // teal
    glowColor: "rgba(16,185,129,0.15)",
    fontSize: "17px",
    link:'/profile'
  },
  {
    icon: IoWalletOutline,
    label: "Wallet",
    gradient: "from-[#6b21a8] to-[#581c87]", // purple
    glowColor: "rgba(168,85,247,0.15)",
    fontSize: "18px",
    link:'/wallet'
  },
];

const QuickActions = () => {
  const navigate  = useNavigate()
  return (
    <div className="px-4 py-5">
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button key={action.label} className="flex flex-col items-center gap-3 group" onClick={()=>navigate(action.link)}>
              <div className={`w-[62px] h-[62px] rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center relative overflow-hidden active:scale-90 transition-all duration-150`}  style={{boxShadow: `0 4px 14px ${action.glowColor}, 0 1px 3px rgba(0,0,0,0.15)`, }}>
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" />

                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center relative z-10">
                  <Icon size={action.fontSize} className="text-white" />
                </div>
              </div>

              <span className="text-[11px] font-bold  leading-none">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;