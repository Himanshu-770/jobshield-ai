
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
  blue: "var(--primary)",
  red: "var(--risk-high)",
  yellow: "var(--risk-medium)",
  green: "var(--risk-low)",
};

export default function StatsCards() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, type }) => (
        <div
          key={label}
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-bold"
              style={{ color: "var(--text-secondary)" }}
            >
              {label}
            </p>

            <Icon
              size={18}
              style={{
                color: iconStyles[type as keyof typeof iconStyles],
              }}
            />
          </div>

          <p
            className="mt-3 text-2xl font-extrabold"
            style={{
              color: iconStyles[type as keyof typeof iconStyles],
            }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
