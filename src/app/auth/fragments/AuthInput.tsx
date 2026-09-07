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
        className="block text-xs text-gray-400"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full rounded-md border border-white/10 bg-[#080D17] px-3 py-2.5 pr-10 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye size={17} />
            ) : (
              <EyeOff size={17} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}