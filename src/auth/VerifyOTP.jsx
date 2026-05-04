import { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HiOutlineClock, HiOutlineKey, HiOutlineShieldCheck } from "react-icons/hi2";
import Layout from "./Layout";
import LoadableButton from "../../components/button/LoadableButton";
import useAuthStore from "../../../store/authStore";
import { verifyLoginOtp, resendOtp } from "../../../api/authApi";

const otpFeatures = [
  { icon: HiOutlineShieldCheck, title: "SecureVerification", copy: "one-time-ExtraProtection", },
  { icon: HiOutlineClock, title: "FastApproval", copy: "Enter6DigitCode", },
  { icon: HiOutlineKey, title: "TrustedAccess", copy: "OnlyVerifiedSessions", },
];

export default function VerifyOTP() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, loginDetails } = useAuthStore();
  const userFromState = loginDetails;

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value) => {
    if (value.length === 6) {
      form.submit();
    }
  };

  const handleVerifyOTP = async (values) => {
    setSubmitLoading(true);
    try {
      const payload = {
        email: userFromState?.email,
        otp: values.otp,
      };
      const response = await verifyLoginOtp(payload);

      const user = response?.data;
      const token = user?.accessToken;
      const refreshToken = user?.refreshToken;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      login({ ...user, roleName: user?.isAdmin ? "admin" : "user" });
      message.success("Logged in successfully!");
      navigate(user?.isAdmin ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      console.error(err);
      message.error(err?.message || "Invalid OTP. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await resendOtp({ email: userFromState?.email });
      message.success("OTP has been sent successfully");
      setTimer(60);
    } catch (err) {
      console.error(err);
      message.error(err?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="hidden md:flex md:flex-1 md:min-w-0 md:max-w-lg lg:max-w-xl flex-col justify-center md:pr-6 lg:pr-8 xl:pr-10">
        <div className="relative w-full min-w-0 pl-1 sm:pl-2">
          <div className="pointer-events-none absolute -left-8 md:left-0 -top-24 h-72 w-72 rounded-full blur-3xl opacity-40 dark:opacity-25" style={{ background: "radial-gradient(circle at center, var(--theme-primary-light) 0%, transparent 70%)", }} />
          <div className="relative flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl shadow-lg" style={{ background: "var(--blueGradient)" }}>
              <span className="text-lg font-bold text-white tracking-tight">T</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">TerioPay</p>
              <p className="text-sm text-theme font-medium">Forex contest platform</p>
            </div>
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold text-theme leading-tight tracking-tight mb-4">
            {t("VerifyYourLogin.")}
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--blueGradient)", WebkitBackgroundClip: "text", }}>{t("StaySecure.")}</span>
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-md mb-10">{t("one-time-passcode")}</p>

          <ul className="space-y-5">
            {otpFeatures.map(({ icon: Icon, title, copy }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: "var(--theme-border)", background: "var(--card-bg-small)", color: "var(--theme-primary)", }}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-theme">{t(title)}</p>
                  <p className="text-sm text-muted leading-snug mt-0.5">{t(copy)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[420px] shrink-0 mx-auto md:mx-0 flex justify-center">
        <div className="w-full">
          <p className="md:hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-3">TerioPay</p>

          <div className="login-card z-10 overflow-hidden rounded-2xl border shadow-2xl px-6 py-8 sm:px-8 sm:py-9" style={{ borderColor: "var(--theme-border)", background: "linear-gradient(165deg, var(--theme-card) 0%, var(--theme-light-bg) 100%)", boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.04) inset", }}>
            <div className="text-center mb-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted mb-4" style={{ background: "var(--card-bg-small)", border: "1px solid var(--card-border-small)", }}>
                {t("Verification")}
              </span>
              <h2 className="text-2xl font-bold text-theme tracking-tight">{t("EnterOTP")}</h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">{t("Enterthe6-digitcode")}</p>
            </div>

            <div className="h-px w-full mb-6 opacity-60" style={{ background: "linear-gradient(90deg, transparent, var(--theme-border), transparent)" }} />

            <Form form={form} layout="vertical" className="login-input" onFinish={handleVerifyOTP}>
              <Form.Item label={<span className="text-theme label">{t("One-timePasscode")}</span>} name="otp" rules={[{ required: true, message: "Please enter the OTP" }]}>
                <Input.OTP length={6} onChange={handleOtpChange} formatter={(str) => str.replace(/\D/g, "")} className="w-full" />
              </Form.Item>

              <LoadableButton htmlType="submit" lable={t("Verify&signIn")} loadingLable={t("Verifying")} isLoading={submitLoading} className="w-full login-btn text-white h-10 !rounded-lg" />
            </Form>

            <div className="text-sm text-center mt-4 text-theme label">
              {t("Didn'treceiveCode?")}{" "}
              {timer > 0 ? (
                <span style={{ color: "var(--theme-primary)" }}>{t("Resend{{timer}}s", { timer })}</span>
              ) : (
                <button type="button" onClick={handleResendOtp} className="font-semibold transition-opacity hover:opacity-80" style={{ color: "var(--theme-primary)" }} disabled={resendLoading}>
                  {resendLoading ? t("Resending") : t("ResendOTP")}
                </button>
              )}
            </div>

            <p className="text-sm text-center mt-8 pt-6 border-t text-theme label" style={{ borderColor: "var(--theme-border)" }}>
              {t("HavingTrouble?")}{" "}
              <Link to="/login" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "var(--theme-primary)" }}>
                {t("BackToSignIn")}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
