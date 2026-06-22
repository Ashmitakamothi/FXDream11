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
          {/* Enhanced background glows */}
          <div className="pointer-events-none absolute -left-12 md:-left-10 -top-32 h-96 w-96 rounded-full blur-[80px] opacity-60 dark:opacity-30" style={{ background:"var(--theme-primary-light)" }}/>
          <div className="pointer-events-none absolute left-32 md:left-40 top-20 h-64 w-64 rounded-full blur-[80px] opacity-40 dark:opacity-20" style={{ background:"rgba(59, 130, 246, 0.15)" }}/>
          
          <div className="relative flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md border border-white/20 dark:border-white/5" style={{ background: "var(--blueGradient)", boxShadow: "0 10px 20px -5px rgba(0, 166, 190, 0.4)" }}>
              <span className="text-xl font-bold text-white tracking-tight">T</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">FXDream11</p>
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
              <li key={title} className="flex gap-4 group">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md" style={{ borderColor: "var(--theme-border)", background: "var(--theme-card)", color: "var(--theme-primary)", }}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold text-theme">{t(title)}</p>
                  <p className="text-sm text-muted leading-snug mt-0.5">{t(copy)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Form column */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[420px] shrink-0 mx-auto md:mx-0 flex justify-center relative">
        {/* Glow effect behind the form card */}
        <div className="absolute inset-0 -z-10 blur-[80px] opacity-30 bg-gradient-to-br from-[#00A6BE]/40 to-blue-500/20 rounded-full w-[110%] h-[110%] -left-[5%] -top-[5%] dark:opacity-20 pointer-events-none"></div>
        
        <div className="w-full">
          <p className="md:hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-3">FXDream11</p>

          <div className="login-card z-10 overflow-hidden rounded-[24px] border px-7 py-9 sm:px-10 sm:py-10 relative backdrop-blur-md" 
               style={{ 
                 borderColor: "var(--theme-border)", 
                 background: "var(--theme-card)", 
                 boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.1), 0 0 30px -5px rgba(0, 166, 190, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)" 
               }}>
            
            <div className="text-center mb-8">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--theme-primary-light)", color: "var(--theme-primary)" }}>
                 <HiOutlineShieldCheck className="h-7 w-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-theme tracking-tight">{t("Welcomeback")}</h2>
              <p className="text-muted text-sm mt-3 leading-relaxed px-2">{t("EnterYourCredentials")}</p>
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
