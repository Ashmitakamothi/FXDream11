import React, { useMemo } from 'react';
import { Select } from "antd";
import countryList from 'react-select-country-list';
import { useTranslation } from "react-i18next";

const ContrySelect = ({ value, onChange, placeholder }) => {
    const { t } = useTranslation();

    const options = useMemo(() => {
        return countryList().getData().map((country) => ({
            value: country?.value,
            label: country.label,
            callingCode: country.callingCode,
        }));
    }, []);

    return (
        <Select showSearch placeholder={placeholder || t("Selectcountry")} value={value} onChange={onChange} options={options} optionFilterProp="label" className="w-full country-select" popupClassName="country-dropdown"
            optionRender={(option) => {
                const code = option.value.toLowerCase();
                return (
                    <div className="flex items-center gap-2">
                        <img src={`https://flagcdn.com/w40/${code}.png`} alt={option.label} className="w-5 h-[14px] object-contain" />
                        <span>{option.label}</span>
                    </div>
                );
            }} />
    );
};

export default ContrySelect;
