import React from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

const PhoneNumberInput = ({ value = "", onChange, country }) => {
  const { t } = useTranslation();
  const dialCode = country?.dialCode || "";
  const flagEmoji = country?.flagEmoji || "";

  const handleChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    onChange?.(cleaned); // important: send value back to Form
  };

  return (
    <Input value={value} onChange={handleChange} placeholder={t("PhoneNumber")} className="login-input" maxLength={15}    />
  );
};

export default PhoneNumberInput;