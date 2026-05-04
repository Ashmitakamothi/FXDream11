import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowLeft, Mail, ShieldAlert, Info, ChevronRight } from "lucide-react";
import { Button, Input, message, Switch, Form, Card, Alert } from "antd";
import SectionCard from "./components/SectionCard";
import Field from "./components/Field";
import { changePassword, disable2FA, enable2FA, getProfile, verifyDisable2FA, verifyEnable2FA } from '../../../../api/authApi';
import useProfileStore from '../../../../store/profileStore';

export default function SecurityTab() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState("summary"); // 'summary', 'password', '2fa'
    const [step, setStep] = useState(1);
    const [action, setAction] = useState(null); // 'enable' or 'disable'
    const [resendLoading, setResendLoading] = useState(false);
    const { userProfile, fetchProfile } = useProfileStore();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
            });
            message.success("Password updated successfully!");
            setView("summary");
        } catch (error) {
            message.error(error?.message || error || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOTP = async (isResend = false) => {
        if (isResend) setResendLoading(true);
        else setLoading(true);

        try {
            const targetAction = userProfile?.isTwoFactorEnabled ? "disable" : "enable";
            setAction(targetAction);

            if (targetAction === "disable") {
                await disable2FA(); // Call with empty object if API expects a body
            } else {
                await enable2FA(); // Call with empty object if API expects a body
            }
            message.success("A 6-digit code has been sent to your email.");
            setStep(2);
        } catch (error) {
            message.error(error?.message || "Failed to send verification code.");
        } finally {
            setLoading(false);
            setResendLoading(false);
        }
    };

    const onFinish2FA = async (values) => {
        setLoading(true);
        const { otp } = values;
        try {
            if (action === "disable") {
                await verifyDisable2FA({ action: "disable", otp });
                message.success("Two-Factor Authentication has been disabled.");
            } else {
                await verifyEnable2FA({ action: "enable", otp });
                message.success("Two-Factor Authentication has been enabled.");
            }

            setStep(1);
            setAction(null);
            await getProfile();
            await fetchProfile();
            setView("summary");
        } catch (error) {
            message.error(error?.message || `Failed to ${action} Two-Factor Authentication.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {view === "summary" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                    <div onClick={() => setView("password")} className="bg-muted-soft p-4 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all border border-border/10 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Lock size={18} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Change Password</p>
                                <p className="text-[11px] text-muted-foreground leading-tight">Update your credentials to keep your account safe</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                    </div>

                    <div onClick={() => setView("2fa")} className="bg-muted-soft p-4 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all border border-border/10 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${userProfile?.isTwoFactorEnabled ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                                <ShieldCheck size={18} className={userProfile?.isTwoFactorEnabled ? 'text-green-500' : 'text-amber-500'} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">2-Factor Authentication</p>
                                <p className="text-[11px] text-muted-foreground leading-tight">
                                    {userProfile?.isTwoFactorEnabled ? "Security is active" : "Recommended for extra security"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {userProfile?.isTwoFactorEnabled ? (
                                <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                            ) : (
                                <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Off</span>
                            )}
                            <ChevronRight size={18} className="text-muted-foreground" />
                        </div>
                    </div>
                </div>
            )}

            {view === "password" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                    <div onClick={() => setView("summary")} className="flex items-center gap-2 text-primary cursor-pointer mb-2 px-1 active:opacity-70 transition-opacity w-fit">
                        <ArrowLeft size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Security</span>
                    </div>
                    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
                        <SectionCard className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <p className="text-white font-semibold text-sm border-b border-white/10 pb-2">Change Password</p>

                                <Field label="Current Password">
                                    <Form.Item name="currentPassword" rules={[{ required: true, message: 'Please input your current password!' }]} className="mb-0">
                                        <Input.Password placeholder="Enter current password" title="Current Password" className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" prefix={<Lock size={16} className="text-muted-foreground mr-2" />} />
                                    </Form.Item>
                                </Field>

                                <Field label="New Password">
                                    <Form.Item name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }, { min: 8, message: 'Password must be at least 8 characters!' }]} className="mb-0">
                                        <Input.Password placeholder="Enter new password" title="New Password" className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" prefix={<Lock size={16} className="text-muted-foreground mr-2" />} />
                                    </Form.Item>
                                </Field>

                                <Field label="Confirm New Password">
                                    <Form.Item name="confirmPassword" dependencies={['newPassword']} className="mb-0" rules={[{ required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                    ]}
                                    >
                                        <Input.Password placeholder="Confirm new password" title="Confirm Password" className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" prefix={<Lock size={16} className="text-muted-foreground mr-2" />} />
                                    </Form.Item>
                                </Field>

                                <Button loading={loading} htmlType="submit" block className="!h-12 !rounded-2xl !bg-primary hover:!bg-primary !text-white !font-semibold !border-none mt-2">
                                    Update Password
                                </Button>
                            </div>
                        </SectionCard>
                    </Form>
                </div>
            )}

            {view === "2fa" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                    <SectionCard>
                        <div className="max-w-md mx-auto">
                            {step === 1 ? (
                                <div className="flex flex-col gap-6">
                                    <div onClick={() => setView("summary")} className="flex items-center gap-2 text-primary cursor-pointer -mt-2 active:opacity-70 transition-opacity w-fit">
                                        <ArrowLeft size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="h-14 w-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mx-auto mb-4">
                                            <ShieldAlert size={24} className="text-amber-500" />
                                        </div>
                                        <h2 className="text-lg font-bold  mb-1">{userProfile?.isTwoFactorEnabled ? "Disable" : "Enable"} 2FA Protection?</h2>
                                        <p className="text-gray-400 text-xs">
                                            {userProfile?.isTwoFactorEnabled ? "This will remove an important security layer from your account." : "This will add an extra layer of security to your account."}
                                        </p>
                                    </div>

                                    <Alert
                                        icon={userProfile?.isTwoFactorEnabled ? <ShieldAlert size={25} className="text-amber-500" /> : <Info size={25} className="text-primary" />}
                                        className={`!p-4 !rounded-xl bg-muted border-none`}
                                        showIcon
                                        type={userProfile?.isTwoFactorEnabled ? "warning" : "info"}
                                        message={<span className={`text-[10px] font-bold uppercase tracking-widest ${userProfile?.isTwoFactorEnabled ? "text-amber-500" : "text-primary"}`}>{userProfile?.isTwoFactorEnabled ? "Security Warning" : "Security Recommended"}</span>}
                                        description={<p className="text-[11px] text-gray-400 m-0 leading-relaxed">{userProfile?.isTwoFactorEnabled ? "Disabling 2FA makes your account more vulnerable to unauthorized access. We strongly recommend keeping it enabled." : "Enabling 2FA significantly improves your account security by requiring a code from your email for sensitive actions."}</p>}
                                    />

                                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center border border-white/5 flex-shrink-0">
                                            <Mail size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest m-0">Verification Method</p>
                                            <p className="text-xs font-bold m-0 ">OTP via Email</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-2">
                                        <Button type="primary" onClick={() => handleSendOTP(false)} loading={loading && !resendLoading} className="h-10 !rounded bg-primary hover:!bg-primary border-none font-extrabold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all" >
                                            Send Verification Code
                                        </Button>
                                        <Button onClick={() => setView("summary")} className="h-10 !rounded font-extrabold text-[10px] uppercase tracking-widest transition-all" style={{ background: "var(--btn-inactive-bg)", color: "var(--btn-inactive-text)", borderColor: "var(--btn-inactive-border)" }} >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Form form={form} layout="vertical" onFinish={onFinish2FA} autoComplete="off" requiredMark={false} className="relative">
                                    <div className="text-center mb-8">
                                        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center border border-white/5 mx-auto mb-4">
                                            <ShieldCheck size={24} className="text-primary" />
                                        </div>
                                        <h2 className="text-lg font-bold  mb-1">Verify Identity</h2>
                                        <p className="text-gray-400 text-xs">Enter the 6-digit code sent to your email.</p>
                                    </div>

                                    <Form.Item label={<span className="text-[10px] text-gray-500 uppercase tracking-widest">Verification Code</span>} name="otp" rules={[{ required: true, message: "Enter verification code" }, { len: 6, message: "Code must be 6 digits" }]}>
                                        <Input placeholder="000000" className="bg-muted-soft h-11 hover:bg-muted-soft focus:bg-muted-soft !rounded-3xl transition-all text-center tracking-[0.5em] font-bold text-lg border-none" maxLength={6} />
                                    </Form.Item>

                                    <Form.Item className="mb-0 mt-8">
                                        <div className="flex gap-3">
                                            <Button type="primary" htmlType="submit" danger={action === "disable"} loading={loading} className={`flex-1 h-12 !rounded border-none font-extrabold text-[10px] uppercase tracking-widest  ${action === "disable" ? "bg-red-600 hover:!bg-red-500" : "bg-primary hover:!bg-primary "}`}>
                                                Verify & {action === "disable" ? "Disable" : "Enable"}
                                            </Button>
                                            <Button onClick={() => setStep(1)} className="flex-1 h-12 !rounded font-extrabold text-[10px] uppercase tracking-widest transition-all" style={{ background: "var(--btn-inactive-bg)", color: "var(--btn-inactive-text)", borderColor: "var(--btn-inactive-border)" }}>
                                                Back
                                            </Button>
                                        </div>
                                    </Form.Item>

                                    <div className="text-center mt-8">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Didn't receive the code?</p>
                                        <Button type="link" onClick={() => handleSendOTP(true)} loading={resendLoading} className="!text-primary hover:!text-primary font-bold text-[10px] uppercase tracking-widest p-0">Resend Code</Button>
                                    </div>
                                </Form>
                            )}
                        </div>
                    </SectionCard>
                </div>
            )}
        </div>
    )
}
