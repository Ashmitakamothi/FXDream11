import React from "react";
import { useTheme } from "../ThemeContext";
import { useTranslation } from "react-i18next";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Layout({ children }) {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-body relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-dots"></div>
            <div className="absolute top-4 sm:top-6 right-4 sm:right-10 flex items-center gap-4 sm:gap-6 text-muted text-xs sm:text-sm z-20">
                <span className="cursor-pointer hover:text-theme">{t("Terms")}</span>
                <span className="cursor-pointer hover:text-theme">{t("Privacy")}</span>
                <LanguageSwitcher />
                <span onClick={toggleTheme} className="cursor-pointer text-lg">
                    {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                </span>
            </div>

            <div className="relative z-10 min-h-screen flex items-start justify-center px-4 pt-20 pb-8 sm:px-6 sm:pt-24 md:items-center md:px-8 md:pt-12 md:pb-8 lg:px-12 xl:px-16">
                <div className="w-full max-w-[1120px] mx-auto flex flex-col md:flex-row md:items-center md:justify-center gap-10 lg:gap-12 xl:gap-14">
                    {children}
                </div>
            </div>

            <div className="absolute bottom-4 w-full text-center text-muted text-xs">
                © TerioPay. All rights reserved.
            </div>
        </div>
    );
}