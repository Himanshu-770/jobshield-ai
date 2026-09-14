
"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type AuthInputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
};

export default function AuthInput({
  name,
  label,
  type = "text",
  placeholder,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full rounded-md border px-3 py-2.5 pr-10 text-sm outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}
