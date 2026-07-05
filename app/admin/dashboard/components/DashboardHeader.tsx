"use client";

import { Download, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  onExport: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ onExport, onLogout }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard
          </span>
          <span className="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-0.5 rounded-full">
            Inquiries
          </span>
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Manage and track all customer inquiries
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}