import { Mail, Phone, Calendar, Globe, Camera } from "lucide-react";
import Field from "./components/Field";
import SectionCard from "./components/SectionCard";
import { Avatar, Button, Card, Input } from "antd";
import { getInitials } from "../../../../utils/utils";
import { formatDate } from '../../../../utils/formatDateTime'

const PersonalInformation = ({ user, userProfile }) => {
    return (
        <div className="space-y-4">
            <SectionCard>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar src={user?.pictureProfile} alt="avatar" size="default" className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                            <span className="text-lg font-medium leading-none">{getInitials(userProfile.firstName + " " + userProfile.lastName)}</span>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 bg-primary p-1.5 rounded-full shadow-sm ring-2 ring-[#0000000f]">
                            <Camera size={13} className="text-white" />
                        </div>
                    </div>

                    <div>
                        <p className="text-white font-semibold">Profile Photo</p>
                        <p className="text-[11px] text-gray-400">JPG or PNG. Max size 2MB.</p>
                        <p className="text-green-400 text-[10px] cursor-pointer mt-1">Upload new photo</p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="First Name">
                            <Input placeholder="First Name" defaultValue={userProfile?.firstName} className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" />
                        </Field>
                        <Field label="Last Name">
                            <Input placeholder="Last Name" defaultValue={userProfile?.lastName} className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" />
                        </Field>
                    </div>

                    <Field label="Email Address">
                        <Input prefix={<Mail size={16} className="text-muted-foreground" />} value={userProfile?.email} readOnly className="!bg-muted-soft  !border-none !text-gray-400 !rounded-3xl h-11" />
                    </Field>

                    <Field label="Phone Number">
                        <Input prefix={<Phone size={16} className="text-muted-foreground" />} value={userProfile?.phoneNumber} readOnly className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Member Since">
                            <Input prefix={<Calendar size={16} className="text-muted-foreground" />} value={formatDate(userProfile?.createdAt)} readOnly className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" />
                        </Field>
                        <Field label="Country">
                            <Input value={userProfile?.country?.countryName} readOnly className="!bg-muted-soft !border-none !text-white !rounded-3xl h-11" prefix={
                                userProfile?.country?.countryCode ? (
                                    <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${userProfile.country.countryCode.toUpperCase()}.svg`} alt="flag" className="w-5 h-auto rounded-sm" />
                                ) : (
                                    <Globe size={16} className="text-muted-foreground" />
                                )
                            }
                            />
                        </Field>
                    </div>

                    <Button block className="!h-12 !rounded-2xl !bg-primary hover:!bg-primary !text-white !font-semibold !border-none mt-2">Save Changes</Button>
                </div>
            </SectionCard>
        </div>
    );
};

export default PersonalInformation;