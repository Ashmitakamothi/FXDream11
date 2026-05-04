import PersonalInformation from "./profile/PersonalInformation";
import SecurityTab from "./profile/SecurityTab";
import Settings from "./profile/Settings"; 
import { Activity, Calendar, Camera, Globe, Lock, Mail, Pencil, Phone, Settings2, Settings as SettingsIcon, User } from "lucide-react";
import { useState } from "react";
import HeaderAll from "../../common/HeaderAll";
import useAuthStore from "../../../store/authStore";
import useProfileStore from "../../../store/profileStore";
import {  getInitials } from "../../../utils/utils";
import { Avatar, Button, Card, Input } from "antd";
import ActivityTab from "./profile/ActivityTab";

export default function MobileProfile() {
  const [activeTab, setActiveTab] = useState("Personal");
  const { user } = useAuthStore();
  const { userProfile } = useProfileStore()
  const tabs = [
    { name: "Personal", icon: User },
    { name: "Security", icon: Lock },
    { name: "Settings", icon: SettingsIcon },
    { name: "Activity", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <HeaderAll path="Profile" />

      <div className="flex justify-center items-start p-3">
        <div className="w-full max-w-md space-y-4">

          <div className="bg-white/90 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar src={user?.pictureProfile} alt="avatar" className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                <span className="text-lg font-medium leading-none">{getInitials(userProfile.firstName + " " + userProfile.lastName)}</span>
              </Avatar>

              <div>
                <p className="font-semibold text-gray-700">{userProfile.firstName} {userProfile.lastName}</p>
                <p className="text-xs text-gray-500">ID: FX-{userProfile.userId}</p>
              </div>

            </div>

            <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full shadow-sm ring-2 ring-white active:scale-90 transition">
              <Pencil size={14} className="text-white" />
            </div>

          </div>

          <div className="mt-5">
            <div className="flex gap-1 p-1 rounded-3xl bg-muted-soft rounded-2xl px-1.5 py-1.5" >
              {tabs.map((tab) => (
                <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex-1 py-2 rounded-2xl text-[10px] font-semibold flex flex-col items-center gap-1 transition-all ${activeTab === tab.name ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground/70"}`}>
                  <tab.icon size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 pb-20">
            {activeTab === "Personal" && <PersonalInformation user={user} userProfile={userProfile} />}
            {activeTab === "Security" && <SecurityTab />}
            {activeTab === "Settings" && <Settings />}
            {activeTab === "Activity" && <ActivityTab />}
          </div>
        </div>
      </div>
    </div>
  );
}