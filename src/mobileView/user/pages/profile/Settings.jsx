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
};

export default Settings;