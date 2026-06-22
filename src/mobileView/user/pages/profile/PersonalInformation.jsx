import { Mail, Phone, Calendar, Globe, Camera } from "lucide-react";
import Field from "./components/Field";
import SectionCard from "./components/SectionCard";
import { Avatar, Button, Card, Input } from "antd";
import { getInitials } from "../../../../utils/utils";
import { formatDate } from '../../../../utils/formatDateTime'

const PersonalInformation = ({ user, userProfile }) => {
    return (
        <div className="space-y-4">
            <SectionCard className="!bg-card dark:!bg-[#111a15] !border-none !rounded-3xl">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar src={user?.pictureProfile} alt="avatar" size="default" className="w-14 h-14 rounded-2xl bg-primary dark:bg-[#2bd99b] flex items-center justify-center text-primary-foreground dark:text-white font-bold text-lg">
                            <span className="text-lg font-bold leading-none text-primary-foreground dark:text-white">{getInitials(userProfile.firstName + " " + userProfile.lastName)}</span>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-primary dark:bg-[#2bd99b] p-1 rounded-full ring-2 ring-card dark:ring-[#111a15]">
                            <Camera size={12} className="text-primary-foreground dark:text-[#111a15]" />
                        </div>
                    </div>

                    <div>
                        <p className="text-foreground dark:text-white font-bold text-[15px]">Profile Photo</p>
                        <p className="text-[11px] text-muted-foreground dark:text-gray-400 font-medium mt-0.5">JPG or PNG. Max size 2MB.</p>
                        <p className="text-primary dark:text-[#2bd99b] text-[11px] font-bold cursor-pointer mt-1.5 hover:opacity-80">Upload new photo</p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard className="!bg-card dark:!bg-[#111a15] !border-none !rounded-3xl space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="First Name">
                            <Input placeholder="First Name" defaultValue={userProfile?.firstName} className="!bg-muted dark:!bg-[#1a241f] !border-none !text-foreground dark:!text-white !rounded-2xl h-12 !font-medium" />
                        </Field>
                        <Field label="Last Name">
                            <Input placeholder="Last Name" defaultValue={userProfile?.lastName} className="!bg-muted dark:!bg-[#1a241f] !border-none !text-foreground dark:!text-white !rounded-2xl h-12 !font-medium" />
                        </Field>
                    </div>

                    <Field label="Email (read-only)">
                        <Input prefix={<Mail size={16} className="text-gray-500 mr-1" />} value={userProfile?.email} readOnly className="!bg-muted dark:!bg-[#1a241f] !border-none !text-muted-foreground dark:!text-gray-400 !rounded-2xl h-12 !font-medium" />
                    </Field>

                    <Field label="Phone Number">
                        <Input prefix={<Phone size={16} className="text-gray-500 mr-1" />} value={userProfile?.phoneNumber} readOnly className="!bg-muted dark:!bg-[#1a241f] !border-none !text-foreground dark:!text-white !rounded-2xl h-12 !font-medium" />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Date of Birth">
                            <Input prefix={<Calendar size={16} className="text-gray-500 mr-1" />} suffix={<Calendar size={14} className="text-gray-500" />} value={formatDate(userProfile?.createdAt)} readOnly className="!bg-muted dark:!bg-[#1a241f] !border-none !text-foreground dark:!text-white !rounded-2xl h-12 !font-medium" />
                        </Field>
                        <Field label="Country">
                            <Input value={userProfile?.country?.countryName} readOnly className="!bg-muted dark:!bg-[#1a241f] !border-none !text-foreground dark:!text-white !rounded-2xl h-12 !font-medium" prefix={
                                userProfile?.country?.countryCode ? (
                                    <Globe size={16} className="text-gray-500 mr-1" />
                                ) : (
                                    <Globe size={16} className="text-gray-500 mr-1" />
                                )
                            } suffix={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            }
                            />
                        </Field>
                    </div>

                    <Button block className="!h-[52px] !rounded-2xl !bg-primary dark:!bg-[#2bd99b] hover:!bg-primary/90 dark:hover:!bg-[#22b883] !text-primary-foreground dark:!text-[#111a15] !font-extrabold !text-[14px] !border-none mt-4 transition-all active:scale-[0.98]">Save Changes</Button>
                </div>
            </SectionCard>
        </div>
    );
};

export default PersonalInformation;