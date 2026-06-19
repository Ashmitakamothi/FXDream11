import { LiaDownloadSolid } from "react-icons/lia";
import { IoTrophyOutline, IoCompassOutline, IoWalletOutline } from "react-icons/io5";
import { GoShieldLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: LiaDownloadSolid,
    label: "Deposit",
    bgColor: "bg-[#1f2b5a]", // navy blue
    glowColor: "rgba(31,43,90,0.3)",
    fontSize: "18px",
    link:'/wallet'
  },
  {
    icon: IoTrophyOutline,
    label: "My Contest",
    bgColor: "bg-[#815523]", // bronze orange
    glowColor: "rgba(129,85,35,0.3)",
    fontSize: "16px",
    link:'/my-contests'
  },
  {
    icon: IoCompassOutline,
    label: "Explore",
    bgColor: "bg-[#28564a]", // matte green
    glowColor: "rgba(40,86,74,0.3)",
    fontSize: "17px",
    link:'/explore'
  },
  {
    icon: IoWalletOutline,
    label: "Wallet",
    bgColor: "bg-[#5e286d]", // matte purple
    glowColor: "rgba(94,40,109,0.3)",
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
              <div className={`w-[62px] h-[62px] rounded-2xl ${action.bgColor} flex items-center justify-center relative overflow-hidden active:scale-90 transition-all duration-150`}  style={{boxShadow: `0 4px 14px ${action.glowColor}, 0 1px 3px rgba(0,0,0,0.15)`, }}>
                {/* <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" /> */}

                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative z-10">
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