import { Input, Form, message, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HiOutlineChartBarSquare, HiOutlineGlobeAlt, HiOutlineUsers, } from "react-icons/hi2";
import { useEffect, useMemo, useState } from "react";
import { getCountryCallingCode } from "libphonenumber-js";
import countryList from "react-select-country-list";
import LoadableButton from "../components/button/LoadableButton";
import { registerUser } from "../api/authApi";
import Layout from "./Layout";
import PhoneNumberInput from "./contryselect/PhoneNumberInput";
import ContrySelect from "./contryselect/ContrySelect";
import useAuthStore from "../store/authStore";
import '../web.css'
const registerHighlights = [
  { icon: HiOutlineChartBarSquare, title: "PerformanceInsights", copy: "TrackRankMovement", },
  { icon: HiOutlineUsers, title: "GlobalCompetition", copy: "CompeteAgainstTraders", },
  { icon: HiOutlineGlobeAlt, title: "Anytimeaccess", copy: "ManageyourAccount.", },
];

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const payload = { 
        ...values,
        phone: values.phoneNumber 
      };
      delete payload.phoneNumber;

      await registerUser(payload);
      message.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);
      const apiMessage = error?.errors?.[0]?.message || error?.message || (typeof error === 'string' ? error : "Registration failed. Please try again.");
      message.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };
  const { countries, fetchCountries } = useAuthStore(); 

  useEffect(() => {
    // if (countries.length === 0) {
      fetchCountries();
    // }
  }, [countries.length, fetchCountries]);

  const countryOptions = useMemo(() => {
    return countries.map((c) => ({
      label: (
        <div className="flex items-center gap-2">
          <span>{c.flagEmoji}</span>
          <span>{c.countryName} ({c.dialCode})</span>
        </div>
      ),
      value: c.id,
      countryName: c.countryName, // for searching
    }));
  }, [countries]);

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="hidden md:flex md:flex-1 md:min-w-0 md:max-w-lg lg:max-w-xl flex-col justify-center md:pr-5 lg:pr-7 xl:pr-10">
        <div className="relative w-full min-w-0 pl-1 sm:pl-2">
          <div className="pointer-events-none absolute -left-8 md:left-0 -top-24 h-72 w-72 rounded-full blur-3xl opacity-40 dark:opacity-25" style={{ background: "radial-gradient(circle at center, var(--theme-primary-light) 0%, transparent 70%)", }} />

          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl shadow-lg" style={{ background: "var(--blueGradient)" }}>
              <span className="text-lg font-bold text-white tracking-tight">T</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">FXDream11</p>
              <p className="text-sm text-theme font-medium">Forex contest platform</p>
            </div>
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold text-theme leading-tight tracking-tight mb-3">
            {t("BuildYourAccount.")}
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--blueGradient)", WebkitBackgroundClip: "text", }}>
              {t("Startcompetingtoday.")}
            </span>
          </h1>
          <p className="text-muted text-sm lg:text-base leading-relaxed max-w-md mb-6">{t("CreateYourProfileJoinUpcomingContests")}</p>

          <ul className="space-y-3.5">
            {registerHighlights.map(({ title, copy, icon: Icon }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: "var(--theme-border)", background: "var(--card-bg-small)", color: "var(--theme-primary)", }}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-theme">{t(title)}</p>
                  <p className="text-xs lg:text-sm text-muted leading-snug mt-0.5">{t(copy)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[510px] shrink-0 mx-auto md:mx-0 flex justify-center">
        <div className="w-full">
          <p className="md:hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted mb-3">FXDream11</p>

          <div className="login-card z-10 overflow-hidden rounded-2xl border shadow-2xl px-5 py-5 sm:px-6 sm:py-6" style={{ borderColor: "var(--theme-border)", background: "linear-gradient(165deg, var(--theme-card) 0%, var(--theme-light-bg) 100%)", boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.04) inset", }}>
            <div className="text-center mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted mb-4" style={{ background: "var(--card-bg-small)", border: "1px solid var(--card-border-small)", }}>
                {t("Createaccount")}
              </span>
              <h2 className="text-2xl font-bold text-theme tracking-tight">{t("GetStarted")}</h2>
              <p className="text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">{t("FillinyourDetails")}</p>
            </div>

            <div className="h-px w-full mb-4 opacity-60" style={{ background: "linear-gradient(90deg, transparent, var(--theme-border), transparent)" }} />

            <Form form={form} layout="vertical" onFinish={handleRegister} className="login-input [&_.ant-form-item]:mb-2.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Form.Item label={<span className="text-theme label">{t("FirstName")}</span>} name="firstName" rules={[{ required: true, message: "Required" }]} >
                  <Input placeholder="First name" autoComplete="given-name" />
                </Form.Item>

                <Form.Item label={<span className="text-theme label">{t("LastName")}</span>} name="lastName" rules={[{ required: true, message: "Required" }]} >
                  <Input placeholder="Last name" autoComplete="family-name" />
                </Form.Item>
              </div>

              <Form.Item label={<span className="text-theme label">{t("Email")}</span>} name="email" rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Please enter a valid email address" },]}>
                <Input placeholder="you@example.com" autoComplete="email" />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Form.Item label={<span className="text-theme label">{t("Country")}</span>} name="countryId" rules={[{ required: true, message: "Select country" }]}>
                  <Select
                    showSearch
                    placeholder={t("Select country")}
                    optionFilterProp="countryName"
                    onChange={(value) => {
                      const country = countries.find((c) => c.id === value);
                      setSelectedCountry(country);
                    }}
                    filterOption={(input, option) =>
                      (option?.countryName ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={countryOptions}
                  />
                </Form.Item>

                <Form.Item label={<span className="text-theme label">{t("PhoneNumber")}</span>} name="phoneNumber" valuePropName="value" getValueFromEvent={(e) => e} rules={[{ required: true, message: "Phone number is required" }, { pattern: /^[0-9]{6,15}$/, message: "Enter a valid phone number (6-15 digits)" },]}>
                  <PhoneNumberInput country={selectedCountry} />
                </Form.Item>

                <Form.Item label={<span className="text-theme label">{t("Password")}</span>} name="password" rules={[{ required: true, message: "Required" }, { min: 8, message: "Minimum 8 characters" }, { max: 100, message: "Maximum 100 characters" },]}>
                  <Input.Password placeholder="Create password" autoComplete="new-password" />
                </Form.Item>

                <Form.Item label={<span className="text-theme label">{t("ConfirmPassword")}</span>} name="confirmPassword" dependencies={["password"]}
                  rules={[
                    { required: true, message: "Required" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match"));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm password" autoComplete="new-password" />
                </Form.Item>
              </div>


              <LoadableButton htmlType="submit" lable={t("Createaccount")} loadingLable={t("CreatingAccount")} isLoading={loading} className="w-full login-btn text-white h-10 !rounded-lg" />
            </Form>

            <p className="text-sm text-center mt-5 pt-4 border-t text-theme label" style={{ borderColor: "var(--theme-border)" }}>
              {t("Alreadyhaveanaccount?")}{" "}
              <Link to="/login" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "var(--theme-primary)" }}>{t("Signin")}</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}