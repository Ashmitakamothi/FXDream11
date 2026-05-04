import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("hi") ? "hi" : "en";

  const setLanguage = (nextLang) => {
    if (nextLang === currentLang) return;
    i18n.changeLanguage(nextLang);
    localStorage.setItem("appLanguage", nextLang);
  };

  return (
    <div className="flex items-center rounded-full border border-[var(--theme-border)] overflow-hidden text-[11px] font-semibold">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 transition-colors ${currentLang === "en" ? "text-white" : "text-theme"}`}
        style={currentLang === "en" ? { background: "var(--theme-primary)" } : {}}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        className={`px-2.5 py-1 transition-colors ${currentLang === "hi" ? "text-white" : "text-theme"}`}
        style={currentLang === "hi" ? { background: "var(--theme-primary)" } : {}}
      >
        HI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
