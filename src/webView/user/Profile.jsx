import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, KeyRound, Shield, History } from 'lucide-react';
import useProfileStore from '../../store/profileStore';
import '../../web.css';

export default function Profile() {
  const { userProfile, loading, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Helper to format relative time (e.g., "10m ago")
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "N/A";
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  const activityLogs = [
    { event: "Login", device: "Chrome · macOS", location: "Mumbai, IN", when: formatRelativeTime(userProfile?.lastLoginAt) },
    { event: "Joined contest 'Forex Frenzy'", device: "iOS App", location: "Mumbai, IN", when: "10m ago" },
    { event: "Withdrawal initiated", device: "Chrome · macOS", location: "Mumbai, IN", when: "2h ago" },
    { event: "Password changed", device: "Chrome · macOS", location: "Mumbai, IN", when: "2 mo ago" },
  ];

  // Logic to get Full Name
  const fullName = userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName || ''}` : "Rohan Patel";
  const initials = userProfile?.firstName ? `${userProfile.firstName[0]}${userProfile.lastName ? userProfile.lastName[0] : ''}`.toUpperCase() : "RP";

  if (loading && !userProfile) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  // Helper to format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 pb-24 md:pb-10">
      <div className="space-y-6 animate-fade-in">
        
        {/* Profile Header Card */}
        <div className="relative overflow-hidden rounded-[22px] border border-border dark:border-gray-800 gradient-card p-8 shadow-card">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#00A5BE]/25 blur-[100px] opacity-80"></div>
          
          <div className="relative flex flex-wrap items-center gap-6">
            <div className="grid h-24 w-24 place-items-center rounded-[24px] gradient-primary text-3xl font-extrabold text-white shadow-glow">
              {initials}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-[#0f172a] dark:text-white tracking-tight">
                  {fullName}
                </h1>
                <span className="rounded-full bg-[#f59e0b]/10 px-3 py-1 text-[11px] font-bold text-[#f59e0b] border border-[#f59e0b]/20">
                  PRO
                </span>
              </div>
              <div className="text-[13px] font-medium text-gray-500 mt-1">
                Global Rank #24 · Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).getFullYear() : '2024'}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-5 text-[12px] font-bold text-gray-400">
                <span className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {userProfile?.email || "N/A"}</span>
                <span className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {userProfile?.phoneNumber || "N/A"}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {userProfile?.city || "Mumbai"}, {userProfile?.country?.countryCode || "IN"}</span>
              </div>
            </div>

            <button className="h-10 px-6 rounded-xl bg-[#00A5BE] text-white text-sm font-bold shadow-[0_8px_20px_-6px_rgba(0,165,190,0.4)] hover:brightness-110 hover:shadow-[0_12px_44px_-10px_rgba(0,165,190,0.5)] active:scale-[0.98] transition-all duration-300">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <section className="lg:col-span-2 rounded-[22px] border border-border dark:border-gray-800 gradient-card p-7 shadow-card">
            <h2 className="text-[17px] font-bold text-[#0f172a] dark:text-white">Personal Information</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { label: "Full Name", value: fullName },
                { label: "Username", value: `@${userProfile?.username || userProfile?.firstName?.toLowerCase() || "user"}` },
                { label: "Email", value: userProfile?.email || "N/A" },
                { label: "Phone", value: userProfile?.phoneNumber || "N/A" },
                { label: "Country", value: userProfile?.country?.countryName || "India" },
                { label: "Date of Birth", value: formatDate(userProfile?.dob) },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 p-4 transition-colors hover:bg-white dark:hover:bg-gray-900/50">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold">{item.label}</div>
                  <div className="mt-1 font-bold text-[#0f172a] dark:text-gray-200">{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Security */}
          <section className="rounded-[22px] border border-border dark:border-gray-800 gradient-card p-7 shadow-card">
            <h2 className="text-[17px] font-bold text-[#0f172a] dark:text-white">Security</h2>
            <div className="mt-6 space-y-4">
              {[
                { icon: <KeyRound />, title: "Password", desc: "Last changed recently", action: "Change" },
                { icon: <Shield />, title: "MPIN", desc: "4-digit transaction PIN", action: "Update" },
                { icon: <Shield className="text-[#00A5BE]" />, title: "Two-Factor Auth", desc: userProfile?.isTwoFactorEnabled ? "Enabled" : "Authenticator app disabled", action: "Manage", active: userProfile?.isTwoFactorEnabled },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 rounded-xl border border-border dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 p-4">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${item.active ? 'bg-[#00A5BE]/10 text-[#00A5BE]' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    {React.cloneElement(item.icon, { className: "h-4.5 w-4.5" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[#0f172a] dark:text-white leading-tight">{item.title}</div>
                    <div className="text-[11px] font-medium text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                  <button className="h-8 px-3 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-extrabold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Activity Logs */}
        <section className="rounded-[22px] border border-border dark:border-gray-800 gradient-card p-7 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold text-[#0f172a] dark:text-white inline-flex items-center gap-2">
              <History className="h-5 w-5 text-primary" /> Activity Logs
            </h2>
            <button className="text-[12px] font-bold text-primary hover:underline">
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-gray-400 font-extrabold">
                  <th className="pb-4">Event</th>
                  <th className="pb-4">Device</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4 text-right">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-gray-800">
                {activityLogs.map((log, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-bold text-[14px] text-[#0f172a] dark:text-gray-200">{log.event}</td>
                    <td className="py-4 text-[13px] font-medium text-gray-500">{log.device}</td>
                    <td className="py-4 text-[13px] font-medium text-gray-500">{log.location}</td>
                    <td className="py-4 text-right text-[13px] font-medium text-gray-400">{log.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
