"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Check,
  Edit3,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/component/ThemeProvider";
import api, { apiErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";


export default function ProfilePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const loadUser = useAuthStore((state) => state.loadUser);
  const logout = useAuthStore((state) => state.logout);
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    void loadUser().then((loaded) => {
      if (!active) return;
      if (!loaded) router.replace("/auth/login");
      else { setPhone(loaded.phone || ""); setLocation(loaded.location || ""); }
    });
    return () => { active = false; };
  }, [loadUser, router]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (! ["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) { setMessage("Choose a PNG, JPG or WEBP image under 5 MB."); return; }
    const preview = URL.createObjectURL(file); setPhoto(preview); setBusy(true); setMessage("");
    try { const form = new FormData(); form.append("avatar", file); const { data } = await api.post("/user/profile/avatar", form, { headers: { "Content-Type": "multipart/form-data" } }); setUser(data.user); setPhoto(null); setMessage("Profile image uploaded successfully."); }
    catch (error) { setPhoto(null); setMessage(apiErrorMessage(error, "Could not upload profile image")); }
    finally { URL.revokeObjectURL(preview); setBusy(false); event.target.value = ""; }
  };

  const handleSave = async () => {
    setBusy(true); setMessage("");
    try { const { data } = await api.patch("/user/profile", { phone, location }); setUser(data.user); setPhone(data.user.phone || ""); setLocation(data.user.location || ""); setIsEditing(false); setMessage("Profile updated successfully."); }
    catch (error) { setMessage(apiErrorMessage(error, "Could not update profile")); }
    finally { setBusy(false); }
  };

  const handleCancel = () => {
    setPhone(user?.phone || "");
    setLocation(user?.location || "");
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try { await logout(); } finally { router.push("/auth/login"); }
  };

  return (
    <main
      className="min-h-screen px-5 py-8 md:px-8 lg:px-10"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-3"><div><button type="button" onClick={() => router.back()} className="mb-4 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]" style={{ borderColor: "var(--border)" }}><ArrowLeft size={14}/> Back</button>
          <h1 className="text-2xl font-bold">Profile</h1>

          <p
            className="mt-1 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Manage your profile information and account preferences.
          </p>
        </div></div>

        {message && <p role="status" className="mb-4 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--border)" }}>{message}</p>}

        {/* Profile Card */}
        <section
          className="overflow-hidden rounded-xl border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {/* Profile Header */}
          <div
            className="border-b px-4 py-7 sm:px-6 md:px-8"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Profile Photo */}
                <div className="relative">
                  <div
                    className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {photo || user?.avatar ? (
                      <img
                        src={photo || user?.avatar || ""}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User
                        size={38}
                        style={{ color: "var(--text-muted)" }}
                      />
                    )}
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: "var(--primary)",
                        borderColor: "var(--surface)",
                        color: "var(--primary-foreground)",
                      }}
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
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold">
                    {user?.fullname || "Your account"}
                  </h2>

                  <p
                    className="mt-1 break-words text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {user?.email || ""}
                  </p>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-sm font-medium transition-opacity hover:opacity-80"
                      style={{ color: "var(--primary)" }}
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
                  className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "var(--surface-secondary)",
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    <Check size={16} />
                    {busy ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="px-4 py-7 sm:px-6 md:px-8">
            <div className="mb-5">
              <h3 className="text-base font-semibold">
                Personal Information
              </h3>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Your account information.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <ProfileField
                icon={<User size={17} />}
                label="Full Name"
                value={user?.fullname || "Your account"}
              />

              <ProfileField
                icon={<Mail size={17} />}
                label="Email Address"
                value={user?.email || ""}
              />

              {/* Phone */}
              <div>
                <label
                  className="mb-2 flex items-center gap-2 text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Phone
                    size={17}
                    style={{ color: "var(--text-muted)" }}
                  />
                  Phone Number
                </label>

                {isEditing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      borderColor: "var(--primary)",
                      color: "var(--text-primary)",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-lg border px-4 py-3 text-sm"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {phone}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  className="mb-2 flex items-center gap-2 text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <MapPin
                    size={17}
                    style={{ color: "var(--text-muted)" }}
                  />
                  Location
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      borderColor: "var(--primary)",
                      color: "var(--text-primary)",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-lg border px-4 py-3 text-sm"
                    style={{
                      backgroundColor: "var(--surface-secondary)",
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {location}
                  </div>
                )}
              </div>

              <ProfileField
                icon={<User size={17} />}
                label="Member Since"
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "—"}
              />
            </div>
          </div>
        </section>

        {/* Theme Preferences */}
        <section
          className="mt-6 rounded-xl border p-4 sm:p-6 md:p-8"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold">
                Theme Preferences
              </h3>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Choose how JobShield AI appears on your device.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: "var(--surface-secondary)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}

              {theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </button>
          </div>
        </section>

        {/* Account */}
        <section
          className="mt-6 rounded-xl border p-4 sm:p-6 md:p-8"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold">Account</h3>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Sign out of your JobShield AI account.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--risk-high) 6%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--risk-high) 20%, transparent)",
                color: "var(--risk-high)",
              }}
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
      <label
        className="mb-[2.1px] flex items-center gap-2 text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        <span style={{ color: "var(--text-muted)" }}>{icon}</span>
        {label}
      </label>

      <div
        className="rounded-lg border px-4 py-3 text-sm"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
