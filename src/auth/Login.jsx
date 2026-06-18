import { Input, Checkbox, Form, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HiOutlineArrowTrendingUp, HiOutlineBolt, HiOutlineShieldCheck,} from "react-icons/hi2";
import LoadableButton from "../components/button/LoadableButton";
import Layout from "./Layout";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { loginUser } from "../api/authApi";
import '../web.css'

const heroFeatures = [
  { icon: HiOutlineArrowTrendingUp, title: "Live contests", copy: "Compete on real MT5 leaderboards with transparent rules.", },
  { icon: HiOutlineShieldCheck, title: "Secure access", copy: "Optional OTP verification keeps your account protected.", },
  { icon: HiOutlineBolt, title: "Fast onboarding", copy: "Sign in and jump back into the markets in seconds.", },
];

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setLoginDetails, login } = useAuthStore();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser(values);
      const loginResponse = response?.data || {};
      const otpRequired = loginResponse?.otpRequired === true;
      const requiresMpinSetup = loginResponse?.RequiresMpinSetup === true || loginResponse?.requiresMpinSetup === true;
      const requiresMpin = loginResponse?.RequiresMpin === true || loginResponse?.requiresMpin === true;

      if (otpRequired) {
        message.success("Success! Please verify your identity.");
        setLoginDetails(loginResponse || { email: values.email });
        navigate("/verify-otp");
        return;
      }

      if (requiresMpinSetup) {
        message.success("Please set up your MPIN.");
        setLoginDetails(loginResponse || { email: values.email, tempToken: loginResponse?.tempToken || loginResponse?.TempToken });
        navigate("/create-mpin");
        return;
      }

      if (requiresMpin) {
        message.success("Please verify your MPIN.");
        setLoginDetails(loginResponse || { email: values.email, tempToken: loginResponse?.tempToken || loginResponse?.TempToken });
        navigate("/verify-mpin");
        return;
      }

      const token = loginResponse?.token || loginResponse?.accessToken;
      const refreshToken = loginResponse?.refreshToken;
      const expiry = loginResponse?.expiry || loginResponse?.tokenExpiry;
      const userData = loginResponse?.user || loginResponse;
      const roleName = userData?.roleName || (userData?.isAdmin ? "admin" : "user");

      login({ ...userData, token, refreshToken, expiry, roleName });
      message.success("Logged in successfully!");
      navigate(roleName === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg = error?.message || error || "Invalid email or password";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="hidden md:flex md:flex-1 md:min-w-0 md:max-w-lg lg:max-w-xl flex-col justify-center md:pr-6 lg:pr-8 xl:pr-10">
        <div className="relative w-full min-w-0 pl-1 sm:pl-2">
          <div className="pointer-events-none absolute -left-8 md:left-0 -top-24 h-72 w-72 rounded-full blur-3xl opacity-40 dark:opacity-25" style={{ background:"radial-gradient(circle at center, var(--theme-primary-light) 0%, transparent 70%)", }}/>
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
            {t("Tradesmarter.")}{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--blueGradient)", WebkitBackgroundClip: "text", }}>{t("Rankhigher.")}</span>
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-md mb-10">{t("JoinliveForextradingcontests")}</p>

          <ul className="space-y-5">
            {heroFeatures.map(({ icon: Icon, title, copy }) => (
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

      {/* Form column */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[420px] shrink-0 mx-auto md:mx-0 flex justify-center">
        <div className="w-full">
          <p className="md:hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-3">TerioPay</p>

          <div className="login-card z-10 overflow-hidden rounded-2xl border shadow-2xl px-6 py-8 sm:px-8 sm:py-9" style={{ borderColor: "var(--theme-border)", background: "linear-gradient(165deg, var(--theme-card) 0%, var(--theme-light-bg) 100%)", boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.04) inset", }}>
            <div className="text-center mb-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted mb-4" style={{ background: "var(--card-bg-small)", border: "1px solid var(--card-border-small)", }}>
                {t("Signin")}
              </span>
              <h2 className="text-2xl font-bold text-theme tracking-tight">{t("Welcomeback")}</h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">{t("EnterYourCredentials")}</p>
            </div>

            <div className="h-px w-full mb-6 opacity-60" style={{ background: "linear-gradient(90deg, transparent, var(--theme-border), transparent)" }}/>

            <Form layout="vertical" onFinish={handleLogin} className="login-input">
              <Form.Item label={<span className="text-theme label">{t("Email")}</span>} name="email" rules={[ { required: true, message: "Please enter your email" }, { type: "email", message: "Enter valid email" }, ]}>
                <Input placeholder="you@example.com" autoComplete="email" />
              </Form.Item>

              <Form.Item label={<span className="text-theme label">{t("Password")}</span>} name="password" rules={[{ required: true, message: "Please enter password" }]}>
                <Input.Password placeholder="••••••••" autoComplete="current-password" />
              </Form.Item>

              <div className="flex flex-wrap justify-between items-center gap-2 mb-5 mt-1">
                <Checkbox className="flex items-center [&_.ant-checkbox+span]:ps-2">
                  <span className="text-xs text-muted">{t("RememberMe")}</span>
                </Checkbox>
                <Link to="/forget-password" className="text-xs font-medium transition-opacity hover:opacity-80" style={{ color: "var(--theme-primary)" }}>{t("ForgotPassword?")}</Link>
              </div>

              <LoadableButton htmlType="submit" lable={t("Signin")} loadingLable={t("Verifying")} isLoading={loading} className="w-full login-btn text-white h-10 !rounded-lg"/>
            </Form>

            <p className="text-sm text-center mt-8 pt-6 border-t text-theme label" style={{ borderColor: "var(--theme-border)" }}>
              {t("Don'thaveanaccount?")}{" "}
              <Link to="/register" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "var(--theme-primary)" }}>{t("Create one free")}</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
