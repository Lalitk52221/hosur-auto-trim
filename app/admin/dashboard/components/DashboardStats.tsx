"use client";

import { LucideIcon } from "lucide-react";

interface Stats {
  total: number;
  called: number;
  notCalled: number;
  today: number;
  bulk: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "emerald" | "amber" | "indigo" | "purple";
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
};

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition">
      <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-xs text-slate-500 font-medium">{label}</div>
      </div>
    </div>
  );
}

export function DashboardStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <StatCard label="Total Inquiries" value={stats.total} icon={MessageSquare} color="blue" />
      <StatCard label="Called" value={stats.called} icon={PhoneCall} color="emerald" />
      <StatCard label="Not Called" value={stats.notCalled} icon={PhoneOff} color="amber" />
      <StatCard label="Today" value={stats.today} icon={Calendar} color="indigo" />
      <StatCard label="Bulk Orders" value={stats.bulk} icon={Package} color="purple" />
    </div>
  );
}

// Import icons at top
import { MessageSquare, PhoneCall, PhoneOff, Calendar, Package } from "lucide-react";