import React, { useState } from 'react'; // Added React and useState
import SectionCard from "./components/SectionCard";
import Field from "./components/Field"; // Ensure Field is imported
import { Moon, Bell, MessageSquare, Volume2, Globe, ChevronDown } from "lucide-react"; // Added missing Lucide icons and ChevronDown for Select suffix
import { Switch, Select, ConfigProvider } from "antd"; // Added ConfigProvider
import { useTheme } from "../../../../ThemeContext";

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const [notif, setNotif] = useState(true);
    const [emailA, setEmailA] = useState(true);
    const [sound, setSound] = useState(false);
    const [lang, setLang] = useState("en");

    const items = [
        { icon: Moon, label: "Dark Mode", desc: "Switch to dark theme", value: theme === "dark", onChange: toggleTheme },
        { icon: Bell, label: "Push Notifications", desc: "Contest & rank alerts", value: notif, onChange: setNotif },
        { icon: MessageSquare, label: "Email Alerts", desc: "Important updates via email", value: emailA, onChange: setEmailA },
        { icon: Volume2, label: "App Sounds", desc: "Tap & action feedback", value: sound, onChange: setSound },
    ];

    const { Option } = Select;

    /* 
    return (
        <div className="space-y-4">
            <SectionCard className="divide-y divide-border/40 !p-2">
                {items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <item.icon size={17} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                        <Switch size="medium" checked={item.value} onChange={item.onChange} style={{ backgroundColor: item.value ? 'var(--primary)' : undefined, }} />
                    </div>
                ))}
            </SectionCard>

            <SectionCard>
                <Field label="Language" className="text-foreground">
                    <Select value={lang} onChange={setLang} className="!bg-muted-soft !border-none !text-foreground !rounded-3xl h-11 w-full" dropdownStyle={{ backgroundColor: 'var(--popover)', color: 'var(--foreground)', borderRadius: '0.75rem', border: '1px solid var(--border)' }}
                        suffixIcon={<ChevronDown size={16} className="text-muted-foreground" />} optionLabelProp="children"
                    >
                        <Option value="en" className="!text-foreground hover:!bg-muted-soft">
                            <div className="flex items-center gap-2">
                                <Globe size={15} className="text-muted-foreground" />
                                <span>English</span>
                            </div>
                        </Option>
                        <Option value="hi" className="!text-foreground hover:!bg-muted-soft">
                            <div className="flex items-center gap-2">
                                <Globe size={15} className="text-muted-foreground" />
                                <span>हिन्दी (Hindi)</span>
                            </div>
                        </Option>
                        <Option value="es" className="!text-foreground hover:!bg-muted-soft">
                            <div className="flex items-center gap-2">
                                <Globe size={15} className="text-muted-foreground" />
                                <span>Español</span>
                            </div>
                        </Option>
                        <Option value="ar" className="!text-foreground hover:!bg-muted-soft">
                            <div className="flex items-center gap-2">
                                <Globe size={15} className="text-muted-foreground" />
                                <span>العربية</span>
                            </div>
                        </Option>
                    </Select>
                </Field>
            </SectionCard>
        </div>
    );
    */

    return (
        <div className="space-y-4">
            <SectionCard className="!bg-card dark:!bg-[#111a15] !border-none !rounded-3xl !p-2 py-3">
                {items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-[#1a241f] flex items-center justify-center">
                                <item.icon size={18} className="text-primary dark:text-[#2bd99b]" />
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-foreground dark:text-white">{item.label}</p>
                                <p className="text-[11px] text-muted-foreground dark:text-gray-400 font-medium">{item.desc}</p>
                            </div>
                        </div>
                        {/* Custom switch styling to match screenshot */}
                        <div 
                            className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${item.value ? 'bg-primary dark:bg-[#2bd99b]' : 'bg-muted dark:bg-[#1a241f]'}`}
                            onClick={() => item.onChange(!item.value)}
                        >
                            <div className={`w-4 h-4 rounded-full transition-transform duration-300 ${item.value ? 'translate-x-5 bg-white dark:bg-[#111a15]' : 'translate-x-0 bg-gray-400 dark:bg-gray-500'}`} />
                        </div>
                    </div>
                ))}
            </SectionCard>

            <SectionCard className="!bg-card dark:!bg-[#111a15] !border-none !rounded-3xl p-5">
                <div className="space-y-2">
                    <label className="text-[12px] font-bold text-muted-foreground dark:text-gray-400">Language</label>
                    <div className="flex items-center justify-between bg-muted dark:bg-[#1a241f] rounded-2xl h-12 px-4 cursor-pointer">
                        <div className="flex items-center gap-2">
                            <Globe size={16} className="text-muted-foreground dark:text-gray-400" />
                            <span className="text-foreground dark:text-white text-[14px] font-bold">English</span>
                        </div>
                        <ChevronDown size={16} className="text-muted-foreground dark:text-gray-500" />
                    </div>
                </div>
            </SectionCard>
        </div>
    );
};

export default Settings;