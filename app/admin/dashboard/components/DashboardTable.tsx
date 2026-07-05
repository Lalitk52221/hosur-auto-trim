"use client";

import { useState } from "react";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Trash2,
  CheckCircle,
  Clock,
  MessageSquare,
  // Search,
} from "lucide-react";

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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface DashboardTableProps {
  contacts: Contact[];
  loading: boolean;
  onToggleCalled: (id: string, current: boolean) => Promise<void>;
  onDelete: (id: string) => void;
}

export function DashboardTable({
  contacts,
  loading,
  onToggleCalled,
  onDelete,
}: DashboardTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-sm text-slate-500">Loading inquiries…</span>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm font-medium">No inquiries yet</p>
        <p className="text-xs">Customer inquiries will appear here</p>
      </div>
    );
  }

  return (
    <>
      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 border border-slate-200/60 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <div className="p-2 bg-rose-50 rounded-full">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Delete Inquiry</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              Are you sure you want to delete this inquiry? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(deleteTarget);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/60">
              <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Phone
              </th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider md:table-cell">
                Inquiry Type
              </th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider  lg:table-cell">
                Date
              </th>
              <th className="text-center px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="text-center px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-slate-100 hover:bg-slate-50/60 transition"
              >
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-800">{contact.name}</div>
                  <div className="text-xs text-slate-400 sm:hidden">{contact.email}</div>
                </td>
                <td className="px-4 py-3.5 hidden sm:table-cell text-slate-600">
                  {contact.email}
                </td>
                <td className="px-4 py-3.5">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium hover:underline transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {contact.phone}
                  </a>
                </td>
                <td className="px-4 py-3.5  md:table-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {contact.inquiryType}
                  </span>
                </td>
                <td className="px-4 py-3.5  lg:table-cell text-slate-500 text-xs">
                  {formatDate(contact.createdAt)}
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button
                    onClick={() => onToggleCalled(contact.id, contact.called)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                      contact.called
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                    }`}
                  >
                    {contact.called ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Called
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        Not Called
                      </>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onToggleCalled(contact.id, contact.called)}
                      className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                      title={contact.called ? "Mark as not called" : "Mark as called"}
                    >
                      {contact.called ? (
                        <PhoneOff className="w-4 h-4" />
                      ) : (
                        <PhoneCall className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(contact.id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {contacts.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-200/60 text-xs text-slate-400 bg-slate-50/50 flex justify-between">
          <span>Showing {contacts.length} inquiries</span>
          <span>
            {contacts.filter((c) => c.called).length} called ·{" "}
            {contacts.filter((c) => !c.called).length} pending
          </span>
        </div>
      )}
    </>
  );
}