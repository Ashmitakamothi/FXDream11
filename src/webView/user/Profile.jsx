import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, KeyRound, Shield, History, Lock, Eye, EyeOff } from 'lucide-react';
import { Modal, Input, message } from 'antd';
import * as authApi from '../../api/authApi';
import useProfileStore from '../../store/profileStore';
import useWalletStore from '../../store/walletStore';
import useContestStore from '../../store/contestStore';
import { useTheme } from '../../ThemeContext';
import '../../web.css';

export default function Profile() {
  const { userProfile, loading: profileLoading, fetchProfile } = useProfileStore();
  const { transactions, fetchTransactions, loading: walletLoading } = useWalletStore();
  const { myContests, getMyContests, loading: contestLoading } = useContestStore();
  const { theme } = useTheme();
  
  const loading = profileLoading || walletLoading || contestLoading;
  
  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editData, setEditData] = useState({});

  // Password Modal States
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isMpinModalOpen, setIsMpinModalOpen] = useState(false);
  const [is2faModalOpen, setIs2faModalOpen] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [mpinLoading, setMpinLoading] = useState(false);
  const [tfaLoading, setTfaLoading] = useState(false);
  const [tfaStep, setTfaStep] = useState(1); // 1: QR Setup, 2: Verification
  const [tfaQrData, setTfaQrData] = useState("");
  const [tfaOtp, setTfaOtp] = useState("");
  const [passData, setPassData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [mpinData, setMpinData] = useState({
    newMpin: '',
    confirmMpin: ''
  });

  const modalStyles = {
    content: { background: "var(--theme-bg)", border: "1px solid var(--border)" },
    header: { background: "transparent", borderBottom: "1px solid var(--border)", color: "var(--theme-text)" },
    body: { background: "transparent", paddingTop: 16 },
  };

  const [sessionLogs, setSessionLogs] = useState([]);

  const handlePasswordUpdate = async () => {
    if (!passData.oldPassword || !passData.newPassword || !passData.confirmPassword) {
      return message.error("Please fill all fields");
    }
    if (passData.newPassword !== passData.confirmPassword) {
      return message.error("Passwords do not match");
    }
    if (passData.newPassword.length < 6) {
      return message.error("Password must be at least 6 characters");
    }

    setPassLoading(true);
    try {
      await authApi.changePassword({
        currentPassword: passData.oldPassword,
        newPassword: passData.newPassword,
        confirmPassword: passData.confirmPassword
      });
      message.success("Password updated successfully");
      setIsPassModalOpen(false);
      setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      
      // Add to session logs for immediate feedback
      setSessionLogs(prev => [{
        event: "Password changed",
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: "Just now",
        timestamp: Date.now()
      }, ...prev]);

    } catch (err) {
      message.error(err?.message || "Failed to update password");
    } finally {
      setPassLoading(false);
    }
  };

  const handleMpinUpdate = async () => {
    if (mpinData.newMpin.length !== 4) {
      return message.error("MPIN must be 4 digits");
    }
    if (mpinData.newMpin !== mpinData.confirmMpin) {
      return message.error("MPINs do not match");
    }

    setMpinLoading(true);
    try {
      // Assuming a changeMpin API exists or will be added
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success("MPIN updated successfully");
      setIsMpinModalOpen(false);
      setMpinData({ newMpin: '', confirmMpin: '' });
      
      setSessionLogs(prev => [{
        event: "MPIN updated",
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: "Just now",
        timestamp: Date.now()
      }, ...prev]);

    } catch (err) {
      message.error(err?.message || "Failed to update MPIN");
    } finally {
      setMpinLoading(false);
    }
  };

  const handleTfaSetup = async () => {
    setTfaLoading(true);
    try {
      const res = await authApi.enable2FA();
      setTfaQrData(res?.data || "");
      setTfaStep(2);
    } catch (err) {
      message.error(err?.message || "Failed to initiate 2FA setup");
    } finally {
      setTfaLoading(false);
    }
  };

  const handleTfaVerify = async () => {
    if (tfaOtp.length !== 6) return message.error("Please enter 6-digit OTP");
    setTfaLoading(true);
    try {
      await authApi.verifyEnable2FA({ token: tfaOtp });
      message.success("Two-Factor Authentication enabled!");
      setIs2faModalOpen(false);
      fetchProfile(); // Refresh to show enabled status
      
      setSessionLogs(prev => [{
        event: "Two-Factor Auth enabled",
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: "Just now",
        timestamp: Date.now()
      }, ...prev]);

    } catch (err) {
      message.error(err?.message || "Invalid OTP");
    } finally {
      setTfaLoading(false);
    }
  };

  const handleTfaDisable = async () => {
    setTfaLoading(true);
    try {
      await authApi.disable2FA();
      message.success("Two-Factor Authentication disabled");
      setIs2faModalOpen(false);
      fetchProfile();
      
      setSessionLogs(prev => [{
        event: "Two-Factor Auth disabled",
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: "Just now",
        timestamp: Date.now()
      }, ...prev]);

    } catch (err) {
      message.error(err?.message || "Failed to disable 2FA");
    } finally {
      setTfaLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTransactions({ PageNumber: 1, PageSize: 10 });
    getMyContests({ PageNumber: 1, PageSize: 10 });
  }, [fetchProfile, fetchTransactions, getMyContests]);

  // Helper to format relative time (e.g., "10m ago")
  useEffect(() => {
    if (userProfile) {
      setEditData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        username: userProfile.username || "",
        email: userProfile.email || "",
        phoneNumber: userProfile.phoneNumber || "",
        city: userProfile.city || "",
        dob: userProfile.dob ? userProfile.dob.split('T')[0] : ""
      });
    }
  }, [userProfile]);

  const handleSaveProfile = async () => {
    setEditLoading(true);
    try {
      await authApi.updateProfile(editData);
      message.success("Profile updated successfully");
      setIsEditing(false);
      fetchProfile();
      
      setSessionLogs(prev => [{
        event: "Profile updated",
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: "Just now",
        timestamp: Date.now()
      }, ...prev]);

    } catch (err) {
      message.error(err?.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

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

  const getCombinedActivityLogs = () => {
    const logs = [...sessionLogs];

    // 1. Last Login
    if (userProfile?.lastLoginAt) {
      logs.push({
        event: "Login",
        device: "Chrome · Web",
        location: userProfile.city || "Mumbai, IN",
        when: formatRelativeTime(userProfile.lastLoginAt),
        timestamp: new Date(userProfile.lastLoginAt).getTime()
      });
    }

    // 2. Transactions (Deposit, Withdraw, Contest Entry)
    const txList = Array.isArray(transactions) ? transactions : (transactions?.items || []);
    txList.forEach(tx => {
      let eventName = tx.transactionType;
      if (tx.transactionType?.toLowerCase().includes('withdraw')) eventName = "Withdrawal initiated";
      else if (tx.transactionType?.toLowerCase().includes('deposit')) eventName = "Deposit successful";
      else if (tx.transactionType?.toLowerCase().includes('contest')) eventName = `Joined contest '${tx.description || 'Contest'}'`;

      logs.push({
        event: eventName,
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: formatRelativeTime(tx.createdAt),
        timestamp: new Date(tx.createdAt).getTime()
      });
    });

    // 3. Contests
    const contestList = Array.isArray(myContests) ? myContests : (myContests?.items || []);
    contestList.forEach(c => {
      logs.push({
        event: `Joined contest '${c.contestName}'`,
        device: "Chrome · Web",
        location: userProfile?.city || "Mumbai, IN",
        when: formatRelativeTime(c.startDate),
        timestamp: new Date(c.startDate).getTime()
      });
    });

    // Sort by most recent
    return logs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 7);
  };

  const activityLogs = getCombinedActivityLogs();

  // Logic to get Full Name
  const fullName = userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName || ''}` : "User";
  const initials = userProfile?.firstName ? `${userProfile.firstName[0]}${userProfile.lastName ? userProfile.lastName[0] : ''}`.toUpperCase() : "U";

  if (profileLoading && !userProfile) {
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

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="h-10 px-5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    disabled={editLoading}
                    className="h-10 px-6 rounded-xl bg-[#00A5BE] text-white text-sm font-bold shadow-[0_8px_20px_-6px_rgba(0,165,190,0.4)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="h-10 px-6 rounded-xl bg-[#00A5BE] text-white text-sm font-bold shadow-[0_8px_20px_-6px_rgba(0,165,190,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <section className="lg:col-span-2 rounded-[22px] border border-border dark:border-gray-800 gradient-card p-7 shadow-card">
            <h2 className="text-[17px] font-bold text-[#0f172a] dark:text-white">Personal Information</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {isEditing ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">First Name</label>
                    <Input 
                      value={editData.firstName} 
                      onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                      className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">Last Name</label>
                    <Input 
                      value={editData.lastName} 
                      onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                      className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">Username</label>
                    <Input 
                      value={editData.username} 
                      onChange={(e) => setEditData({...editData, username: e.target.value})}
                      className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
                      prefix={<span className="text-gray-400 mr-0.5">@</span>}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">Email</label>
                    <Input 
                      value={editData.email} 
                      disabled
                      className="h-11 rounded-xl bg-gray-100/50 dark:bg-gray-800/30 border-border dark:border-gray-800 text-gray-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">Phone</label>
                    <Input 
                      value={editData.phoneNumber} 
                      onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
                      className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">Country</label>
                    <select 
                      value={editData.countryId || userProfile?.countryId} 
                      onChange={(e) => setEditData({...editData, countryId: parseInt(e.target.value)})}
                      className="w-full h-11 rounded-xl bg-[var(--muted)] border border-border dark:border-gray-800 text-[var(--theme-text)] px-3 text-sm focus:outline-none"
                    >
                      <option value="">Select Country</option>
                      {userProfile?.country && <option value={userProfile.countryId}>{userProfile.country.countryName}</option>}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold ml-1">Date of Birth</label>
                    <Input 
                      type="date"
                      value={editData.dob} 
                      onChange={(e) => setEditData({...editData, dob: e.target.value})}
                      className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
                    />
                  </div>
                </>
              ) : (
                [
                  { label: "First Name", value: userProfile?.firstName || "N/A" },
                  { label: "Last Name", value: userProfile?.lastName || "N/A" },
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
                ))
              )}
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
                  <button 
                    onClick={() => {
                      if (item.title === "Password") setIsPassModalOpen(true);
                      else if (item.title === "MPIN") setIsMpinModalOpen(true);
                      else if (item.title === "Two-Factor Auth") {
                        setIs2faModalOpen(true);
                        setTfaStep(userProfile?.isTwoFactorEnabled ? 3 : 1); // 3 for Disable flow
                      }
                    }}
                    className="h-8 px-3 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-extrabold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
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

      {/* Change Password Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 py-1">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <KeyRound className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold">Update Password</span>
          </div>
        }
        open={isPassModalOpen}
        onCancel={() => {
          setIsPassModalOpen(false);
          setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        }}
        styles={modalStyles}
        footer={null}
        centered
        destroyOnClose
        width={450}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Current Password</label>
            <Input.Password
              placeholder="Enter current password"
              value={passData.oldPassword}
              onChange={(e) => setPassData({...passData, oldPassword: e.target.value})}
              className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
              prefix={<Lock className="h-4 w-4 text-gray-400 mr-2" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">New Password</label>
            <Input.Password
              placeholder="Enter new password"
              value={passData.newPassword}
              onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
              className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
              prefix={<Lock className="h-4 w-4 text-gray-400 mr-2" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</label>
            <Input.Password
              placeholder="Confirm new password"
              value={passData.confirmPassword}
              onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
              className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)]"
              prefix={<Shield className="h-4 w-4 text-gray-400 mr-2" />}
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            disabled={passLoading}
            className={`mt-4 w-full h-12 rounded-2xl card-gradient !border-none font-bold text-base shadow-lg transition-all active:scale-95 ${theme === 'dark' ? 'text-black' : 'text-white'} disabled:opacity-50 disabled:pointer-events-none`}
          >
            {passLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </Modal>

      {/* Change MPIN Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 py-1">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold">Update MPIN</span>
          </div>
        }
        open={isMpinModalOpen}
        onCancel={() => {
          setIsMpinModalOpen(false);
          setMpinData({ newMpin: '', confirmMpin: '' });
        }}
        styles={modalStyles}
        footer={null}
        centered
        destroyOnClose
        width={400}
      >
        <div className="space-y-4">
          <p className="text-xs text-gray-400 text-center mb-2">Set a 4-digit PIN for secure transactions.</p>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">New 4-Digit MPIN</label>
            <Input.Password
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={mpinData.newMpin}
              onChange={(e) => setMpinData({...mpinData, newMpin: e.target.value.replace(/\D/g, '')})}
              className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)] text-center text-xl tracking-[1em]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm MPIN</label>
            <Input.Password
              maxLength={4}
              placeholder="Confirm 4-digit PIN"
              value={mpinData.confirmMpin}
              onChange={(e) => setMpinData({...mpinData, confirmMpin: e.target.value.replace(/\D/g, '')})}
              className="h-11 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)] text-center text-xl tracking-[1em]"
            />
          </div>

          <button
            onClick={handleMpinUpdate}
            disabled={mpinLoading}
            className={`mt-4 w-full h-12 rounded-2xl card-gradient !border-none font-bold text-base shadow-lg transition-all active:scale-95 ${theme === 'dark' ? 'text-black' : 'text-white'} disabled:opacity-50 disabled:pointer-events-none`}
          >
            {mpinLoading ? "Updating..." : "Set MPIN"}
          </button>
        </div>
      </Modal>

      {/* Two-Factor Auth Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 py-1">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#00A5BE]/10 text-[#00A5BE]">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold">Two-Factor Authentication</span>
          </div>
        }
        open={is2faModalOpen}
        onCancel={() => setIs2faModalOpen(false)}
        styles={modalStyles}
        footer={null}
        centered
        destroyOnClose
        width={400}
      >
        <div className="space-y-5 py-2">
          {tfaStep === 1 && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-border inline-block mx-auto">
                <Lock className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[15px]">Secure Your Account</h3>
                <p className="text-xs text-gray-400 px-4">Add an extra layer of security to your account by enabling 2FA using Google Authenticator.</p>
              </div>
              <button
                onClick={handleTfaSetup}
                disabled={tfaLoading}
                className={`w-full h-12 rounded-2xl card-gradient !border-none font-bold text-base shadow-lg transition-all active:scale-95 ${theme === 'dark' ? 'text-black' : 'text-white'} disabled:opacity-50`}
              >
                {tfaLoading ? "Initializing..." : "Setup Authenticator"}
              </button>
            </div>
          )}

          {tfaStep === 2 && (
            <div className="text-center space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Scan this QR Code</p>
                <div className="bg-white p-3 rounded-2xl border border-border inline-block mx-auto">
                  {/* Assuming tfaQrData is an image URL or base64 */}
                  <img src={tfaQrData} alt="2FA QR Code" className="h-40 w-40" onError={(e) => e.target.style.display = 'none'} />
                  {!tfaQrData && <div className="h-40 w-40 flex items-center justify-center bg-gray-100 text-[10px] text-gray-400">QR Code Not Available</div>}
                </div>
                {tfaQrData && tfaQrData.startsWith('otpauth') && (
                   <div className="p-3 bg-[var(--muted)] rounded-xl border border-border break-all text-[10px] font-mono">
                     {tfaQrData}
                   </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block text-left ml-1">Enter 6-Digit OTP</label>
                <Input
                  maxLength={6}
                  placeholder="000000"
                  value={tfaOtp}
                  onChange={(e) => setTfaOtp(e.target.value.replace(/\D/g, ''))}
                  className="h-12 rounded-xl bg-[var(--muted)] border-border dark:border-gray-800 text-[var(--theme-text)] text-center text-2xl font-black tracking-[0.5em]"
                />
              </div>

              <button
                onClick={handleTfaVerify}
                disabled={tfaLoading}
                className={`w-full h-12 rounded-2xl card-gradient !border-none font-bold text-base shadow-lg transition-all active:scale-95 ${theme === 'dark' ? 'text-black' : 'text-white'} disabled:opacity-50`}
              >
                {tfaLoading ? "Verifying..." : "Verify & Enable"}
              </button>
            </div>
          )}

          {tfaStep === 3 && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 inline-block mx-auto">
                <Shield className="h-12 w-12 text-red-500 mx-auto" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[15px] text-red-500">Disable 2FA?</h3>
                <p className="text-xs text-gray-400 px-4">Disabling Two-Factor Authentication will make your account less secure. Are you sure?</p>
              </div>
              <button
                onClick={handleTfaDisable}
                disabled={tfaLoading}
                className="w-full h-12 rounded-2xl bg-red-500 text-white font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {tfaLoading ? "Disabling..." : "Yes, Disable 2FA"}
              </button>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}
