import { BriefcaseBusiness, ShieldAlert, ShieldCheck } from "lucide-react";

const stats = [
  {
    label: "JOBS CHECKED",
    value: "247",
    icon: BriefcaseBusiness,
    type: "blue",
  },
  {
    label: "HIGH RISK",
    value: "18",
    icon: ShieldAlert,
    type: "red",
  },
  {
    label: "MEDIUM RISK",
    value: "14",
    icon: ShieldAlert,
    type: "yellow",
  },
  {
    label: "SAFE JOBS",
    value: "215",
    icon: ShieldCheck,
    type: "green",
  },
];

const iconStyles = {
  blue: "text-blue-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  green: "text-emerald-400",
};

export default function StatsCards() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, type }) => (
        <div
          key={label}
          className="rounded-xl border border-white/10 bg-[#111A2E] p-6 "
        >
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-bold text-gray-500">{label}</p>

            <Icon
              size={18}
              className={iconStyles[type as keyof typeof iconStyles]}
            />
          </div>

          <p
            className={`mt-3 text-2xl font-extrabold ${
              iconStyles[type as keyof typeof iconStyles]
            }`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
