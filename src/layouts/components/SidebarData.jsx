import { LiaClipboardListSolid } from "react-icons/lia";
import { LuLayoutDashboard, LuSettings, } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { GoShieldLock } from "react-icons/go";
import { AiOutlineFileDone } from "react-icons/ai";
import { RxFileText } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiDatabaseLight, PiGoogleCardboardLogo, PiStarLight } from "react-icons/pi";
import { m } from "framer-motion";

export const UserSidebar = [
  {
    label: "Dashboard",
    icon: <LuLayoutDashboard size={20} />,
    url: "/dashboard",
    activeUrl: ["/", "/dashboard"],
    mobileNav: true,
  },
  {
    label: "Contests",
    icon: <RxFileText size={20} />,
    url: "/user/contests",
    activeUrl: ["/user/contests"],
    mobileNav: true,
  },
  {
    label: "Explore",
    icon: <PiStarLight size={20} />,
    url: "/explore",
    activeUrl: ["/explore"],
    mobileNav: true,
  },
  {
    label: "TopPicks",
    icon: <PiStarLight size={20} />,
    url: "/top-picks",
    activeUrl: ["/top-picks"],
    mobileNav: false,
  },
  {
    label: "MyContests",
    icon: <AiOutlineFileDone size={20} />,
    url: "/my-contests",
    activeUrl: ["/my-contests"],
    mobileNav: true,
  },
  {
    label: "Wallet",
    icon: <IoWalletOutline size={20} />,
    url: "/wallet",
    activeUrl: ["/wallet"],
    mobileNav: true,
  },
  {
    label: "Profile",
    icon: <GoShieldLock size={20} />,
    url: "/profile",
    activeUrl: ["/profile"],
    mobileNav: false,
  },
];

export const AdminSidebar = [
  {
    label: "Overview",
    icon: <MdOutlineDashboardCustomize size={22} />,
    url: "/admin-dashboard",
    activeUrl: ["/admin-dashboard"],
    mobileNav: true,
  },
  {
    label: "Clients",
    icon: <HiOutlineUsers size={20} />,
    url: "/Clients",
    activeUrl: ["/Clients"],
    mobileNav: true,
  },
  {
    label: "Contests",
    icon: <LiaClipboardListSolid size={22} />,
    url: "/admin/contests",
    activeUrl: ["/admin/contests"],
    mobileNav: true,
  },
  {
    label: "Revenue",
    icon: <BsCoin size={22} />,
    url: "/admin/revenue",
    activeUrl: ["/admin/revenue"],
    mobileNav: false,
  },
  {
    label: "MT5Config",
    icon: <PiDatabaseLight size={20} />,
    url: "/MT5-Config",
    activeUrl: ["/MT5-Config"],
    mobileNav: false,
  },
  {
    label: "MT5Jobs",
    icon: <PiGoogleCardboardLogo size={20} />,
    url: "/MT5-Jobs",
    activeUrl: ["/MT5-Jobs"],
    mobileNav: false,
  },
  {
    label: "Settings",
    icon: <LuSettings size={20} />,
    url: "/admin/settings",
    activeUrl: ["/admin/settings"],
    mobileNav: true,
  },
];
