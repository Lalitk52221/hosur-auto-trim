"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Factory,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Contacts",
    icon: Users,
    href: "/dashboard",
  },
  {
    title: "Emails",
    icon: Mail,
    href: "/dashboard/emails",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0">

      {/* Logo */}

      <div className="border-b border-slate-700 p-6">

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-3 rounded-xl">

            <Factory size={28} />

          </div>

          <div>

            <h2 className="font-bold text-xl">
              Hosur Auto Trims
            </h2>

            <p className="text-xs text-slate-400">
              CRM Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 p-4 space-y-2">

        {menus.map((menu) => {

          const Icon = menu.icon;

          const active = pathname === menu.href;

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all
              
              ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              <span>{menu.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700 p-5">

        <button className="flex items-center gap-4 hover:text-red-400 transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}