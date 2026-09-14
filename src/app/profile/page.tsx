"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  Camera,
  Check,
  Edit3,
  LogOut,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
const profileData = {
  name: "Alex Mercer",
  email: "alex@jobshield.ai",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  joined: "September 2026",
};

export default function ProfilePage() {
      const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const [phone, setPhone] = useState(profileData.phone);
  const [location, setLocation] = useState(profileData.location);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPhone(profileData.phone);
    setLocation(profileData.location);
    setIsEditing(false);
  };
    const handleSignOut = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#080F1D] px-5 py-8 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage your profile information and account preferences.
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0D1527]">

          {/* Profile Header */}
          <div className="border-b border-white/10 px-6 py-7 md:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-5">

                {/* Profile Photo */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#1A2942]">
                    {photo ? (
                      <img
                        src={photo}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={38} className="text-gray-400" />
                    )}
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#0D1527] bg-blue-500 text-white transition hover:bg-blue-400"
                      aria-label="Change profile photo"
                    >
                      <Camera size={15} />
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* User Name */}
                <div>
                  <h2 className="text-xl font-semibold">
                    {profileData.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {profileData.email}
                  </p>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                      Change photo
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/10"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400"
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="px-6 py-7 md:px-8">

            <div className="mb-5">
              <h3 className="text-base font-semibold">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your account information.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Full Name - READ ONLY */}
              <ProfileField
                icon={<User size={17} />}
                label="Full Name"
                value={profileData.name}
              />

              {/* Email - READ ONLY */}
              <ProfileField
                icon={<Mail size={17} />}
                label="Email Address"
                value={profileData.email}
              />

              {/* Phone - EDITABLE */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Phone size={17} className="text-gray-500" />
                  Phone Number
                </label>

                {isEditing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-blue-500/50 bg-[#091221] px-4 py-3 text-sm text-gray-200 outline-none transition focus:border-blue-500"
                  />
                ) : (
                  <div className="rounded-lg border border-white/10 bg-[#091221] px-4 py-3 text-sm text-gray-200">
                    {phone}
                  </div>
                )}
              </div>

              {/* Location - EDITABLE */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                  <MapPin size={17} className="text-gray-500" />
                  Location
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-blue-500/50 bg-[#091221] px-4 py-3 text-sm text-gray-200 outline-none transition focus:border-blue-500"
                  />
                ) : (
                  <div className="rounded-lg border border-white/10 bg-[#091221] px-4 py-3 text-sm text-gray-200">
                    {location}
                  </div>
                )}
              </div>

              {/* Member Since - READ ONLY */}
              <ProfileField
                icon={<User size={17} />}
                label="Member Since"
                value={profileData.joined}
              />

            </div>
          </div>
        </section>

        {/* Account */}
        <section className="mt-6 rounded-xl border border-white/10 bg-[#0D1527] p-6 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-base font-semibold">
                Account
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Sign out of your JobShield AI account.
              </p>
            </div>

            <button
              type="button"
               onClick={handleSignOut}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Sign Out
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
        <span className="text-gray-500">{icon}</span>
        {label}
      </label>

      <div className="rounded-lg border border-white/10 bg-[#091221] px-4 py-3 text-sm text-gray-200">
        {value}
      </div>
    </div>
  );
}