"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardStats } from "./components/DashboardStats";
import { SearchFilter } from "./components/SearchFilter";
import { DashboardTable } from "./components/DashboardTable";
import { AlertCircle, CheckCircle } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  createdAt: string;
  called: boolean;
};

type Stats = {
  total: number;
  called: number;
  notCalled: number;
  today: number;
  bulk: number;
};

function isToday(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "called" | "notCalled">("all");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Compute stats
  const stats: Stats = {
    total: contacts.length,
    called: contacts.filter((c) => c.called).length,
    notCalled: contacts.filter((c) => !c.called).length,
    today: contacts.filter((c) => isToday(c.createdAt)).length,
    // bulk: contacts.filter((c) => c.inquiryType.toLowerCase() === "Bulk Order").length,
    bulk: contacts.filter((c) => c.inquiryType === "Bulk Order").length,
  };

  // Sorting: by createdAt desc, then name asc
  const sortedContacts = [...contacts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    if (dateA !== dateB) return dateB - dateA; // newest first
    return a.name.localeCompare(b.name);
  });

  // Filtering
  const filtered = sortedContacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.inquiryType.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ? true : filterStatus === "called" ? c.called : !c.called;
    return matchSearch && matchStatus;
  });

  // ── API calls ──
  async function toggleCalled(id: string, current: boolean) {
    try {
      const res = await fetch(`/api/dashboard/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ called: !current }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, called: !current } : c))
      );
      showToast(`Marked as ${!current ? "called" : "not called"}`, "success");
    } catch {
      showToast("Failed to update status", "error");
    }
  }

  async function deleteContact(id: string) {
    try {
      const res = await fetch(`/api/dashboard/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast("Inquiry deleted", "success");
    } catch {
      showToast("Failed to delete", "error");
    }
  }

  async function exportExcel() {
    try {
      const res = await fetch("/api/dashboard/export");
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inquiries_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast("Exported successfully", "success");
    } catch {
      showToast("Export failed", "error");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  }

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const fetchContacts = async () => {
      try {
        const authRes = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!authRes.ok) {
          localStorage.removeItem("token");
          document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          router.replace("/admin/login");
          return;
        }

        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContacts(data);
      } catch {
        showToast("Failed to load inquiries", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-top-2 duration-300 ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {toast.message}
          </div>
        )}

        <DashboardHeader onExport={exportExcel} onLogout={logout} />
        <DashboardStats stats={stats} />
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <DashboardTable
            contacts={filtered}
            loading={loading}
            onToggleCalled={toggleCalled}
            onDelete={deleteContact}
          />
        </div>
      </div>
    </div>
  );
}

// Additional imports for icons used in toast
