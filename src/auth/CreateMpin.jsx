import { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HiOutlineShieldCheck, HiOutlineKey, HiOutlineLockClosed } from "react-icons/hi2";
import Layout from "./Layout";
import LoadableButton from "../components/button/LoadableButton";
import useAuthStore from "../store/authStore";
import { createMpin } from "../api/authApi";

const mpinFeatures = [
  { icon: HiOutlineShieldCheck, title: "SecureVerification", copy: "Extra protection for your account.", },
  { icon: HiOutlineKey, title: "FastAccess", copy: "Use MPIN for quick login.", },
  { icon: HiOutlineLockClosed, title: "TrustedAccess", copy: "OnlyVerifiedSessions", },
];

export default function CreateMpin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, loginDetails } = useAuthStore();
  const userFromState = loginDetails;

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleCreateMpin = async (values) => {
    setSubmitLoading(true);
    try {
      const payload = {
        tempToken: userFromState?.tempToken || userFromState?.TempToken,
        mpin: values.mpin,
      };
      const response = await createMpin(payload);

      const user = response?.data;
      const token = user?.token || user?.accessToken;
      const refreshToken = user?.refreshToken;
      const expiry = user?.expiry || user?.tokenExpiry;

      login({ ...user, token, refreshToken, expiry, roleName: user?.roleName || (user?.isAdmin ? "admin" : "user") });
      message.success("MPIN created and logged in successfully!");
      navigate(user?.isAdmin || user?.roleName === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      console.error("Create MPIN Error:", err);
      let errorMsg = "MPIN is invalid or failed to create";
      if (typeof err === 'string' && err.trim() !== "") {
        errorMsg = err;
      } else if (err?.message) {
        errorMsg = err.message;
      } else if (err?.error) {
        errorMsg = err.error;
      }
      message.error(errorMsg);
    } finally {
      setSubmitLoading(false);
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">FXDream11</p>
              <p className="text-sm text-theme font-medium">Forex contest platform</p>
            </div>
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold text-theme leading-tight tracking-tight mb-4">
            {t("SetupYourMPIN.")}
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--blueGradient)", WebkitBackgroundClip: "text", }}>{t("StaySecure.")}</span>
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-md mb-10">{t("Create a 6-digit MPIN for faster and secure login.")}</p>

          <ul className="space-y-5">
            {mpinFeatures.map(({ icon: Icon, title, copy }) => (
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
          <p className="md:hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-3">FXDream11</p>

          <div className="login-card z-10 overflow-hidden rounded-2xl border shadow-2xl px-6 py-8 sm:px-8 sm:py-9" style={{ borderColor: "var(--theme-border)", background: "linear-gradient(165deg, var(--theme-card) 0%, var(--theme-light-bg) 100%)", boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.04) inset", }}>
            <div className="text-center mb-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted mb-4" style={{ background: "var(--card-bg-small)", border: "1px solid var(--card-border-small)", }}>
                {t("Setup")}
              </span>
              <h2 className="text-2xl font-bold text-theme tracking-tight">{t("Create MPIN")}</h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">{t("Enter a new 6-digit MPIN")}</p>
            </div>

            <div className="h-px w-full mb-6 opacity-60" style={{ background: "linear-gradient(90deg, transparent, var(--theme-border), transparent)" }} />

            <Form form={form} layout="vertical" className="login-input" onFinish={handleCreateMpin}>
              <Form.Item label={<span className="text-theme label">{t("New MPIN")}</span>} name="mpin" rules={[{ required: true, message: "Please enter a 6-digit MPIN" }]}>
                <Input.OTP length={6} formatter={(str) => str.replace(/\D/g, "")} className="w-full" />
              </Form.Item>

              <LoadableButton htmlType="submit" lable={t("Create & Sign In")} loadingLable={t("Creating...")} isLoading={submitLoading} className="w-full login-btn text-white h-10 !rounded-lg" />
            </Form>

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
