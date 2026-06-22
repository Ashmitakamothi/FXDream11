import PersonalInformation from "./profile/PersonalInformation";
import SecurityTab from "./profile/SecurityTab";
import Settings from "./profile/Settings"; 
import { Activity, Calendar, Camera, Globe, Lock, Mail, Pencil, Phone, Settings2, Settings as SettingsIcon, User } from "lucide-react";
import { useState, useEffect } from "react";
import HeaderAll from "../../common/HeaderAll";
import useAuthStore from "../../../store/authStore";
import useProfileStore from "../../../store/profileStore";
import {  getInitials } from "../../../utils/utils";
import { Avatar, Button, Card, Input } from "antd";
import ActivityTab from "./profile/ActivityTab";

export default function MobileProfile() {
  const [activeTab, setActiveTab] = useState("Personal");
  const { user } = useAuthStore();
  const { userProfile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const tabs = [
    { name: "Personal", icon: User },
    { name: "Security", icon: Lock },
    { name: "Settings", icon: SettingsIcon },
    { name: "Activity", icon: Activity },
  ];

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <HeaderAll path="Profile" />

      <div className="flex justify-center items-start p-3">
        <div className="w-full max-w-md space-y-4">

          <div className="bg-emerald-50 dark:bg-[#111a15]/80 rounded-3xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar src={user?.pictureProfile} alt="avatar" className="w-14 h-14 rounded-2xl bg-primary dark:bg-[#2bd99b] flex items-center justify-center text-primary-foreground dark:text-white font-bold text-lg">
                <span className="text-lg font-bold leading-none text-primary-foreground dark:text-white">{getInitials((userProfile?.firstName || "") + " " + (userProfile?.lastName || ""))}</span>
              </Avatar>

              <div>
                <p className="font-bold text-foreground dark:text-white text-[15px]">{userProfile?.firstName} {userProfile?.lastName}</p>
                <p className="text-xs text-muted-foreground dark:text-gray-500 font-medium">ID: FX-{userProfile?.userId}</p>
              </div>

            </div>

            <div className="w-9 h-9 flex items-center justify-center bg-black/5 dark:bg-[#1a241f] rounded-full active:scale-90 transition">
              <Pencil size={14} className="text-foreground dark:text-white" />
            </div>

          </div>

          <div className="mt-4">
            <div className="flex gap-1 p-1 rounded-2xl bg-muted dark:bg-[#111a15]" >
              {tabs.map((tab) => (
                <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex-1 py-3 rounded-2xl text-[11px] font-semibold flex flex-col items-center gap-1.5 transition-all ${activeTab === tab.name ? "bg-primary text-primary-foreground dark:bg-[#2bd99b] dark:text-[#111a15]" : "text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-300"}`}>
                  <tab.icon size={18} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            {activeTab === "Personal" && <PersonalInformation user={user} userProfile={userProfile} />}
            {activeTab === "Security" && <SecurityTab />}
            {activeTab === "Settings" && <Settings />}
            {activeTab === "Activity" && <ActivityTab />}
          </div>

          <div className="flex justify-center pt-6 pb-24">
            <button className="flex items-center gap-2 text-red-500 font-bold text-[13px] px-6 py-3 rounded-2xl bg-muted dark:bg-[#111a15] w-full justify-center active:scale-95 transition-transform">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}