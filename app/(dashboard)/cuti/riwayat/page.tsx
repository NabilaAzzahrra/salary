"use client";

import { useState } from "react";

export default function RiwayatCutiPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const leaveQuota = [
    { title: "Total Cuti", value: 12, label: "Hari / Tahun", icon: "fi-rr-calendar-check", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Cuti Diambil", value: 4, label: "Hari", icon: "fi-rr-calendar-minus", color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Sisa Cuti", value: 8, label: "Hari Tersisa", icon: "fi-rr-clock", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const leaveHistory = [
    { id: 1, type: "Tahunan", start: "2024-02-15", end: "2024-02-17", days: 3, status: "Approved", reason: "Acara Keluarga" },
    { id: 2, type: "Sakit", start: "2024-01-10", end: "2024-01-11", days: 1, status: "Approved", reason: "Flu & Demam" },
    { id: 3, type: "Tahunan", start: "2024-03-10", end: "2024-03-12", days: 3, status: "Pending", reason: "Liburan Akhir Pekan" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Data & Saldo Cuti</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Informasi kuota dan riwayat pengajuan cuti Anda.</p>
      </div>

      {/* Quota Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaveQuota.map((q, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
            <div className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full ${q.bg} opacity-50 blur-2xl transition-transform group-hover:scale-125`}></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{q.title}</p>
                <div className="flex items-baseline gap-2">
                   <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{q.value}</h4>
                   <span className="text-[10px] font-bold text-slate-500">{q.label}</span>
                </div>
              </div>
              <div className={`h-12 w-12 rounded-2xl ${q.bg} ${q.color} flex items-center justify-center text-xl`}>
                <i className={`fi ${q.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History Table */}
      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h3 className="text-lg font-bold text-slate-900 dark:text-white">Riwayat Pengajuan</h3>
           
           <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
             {["Semua", "Pending", "Approved", "Rejected"].map((tab) => (
               <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  activeTab === tab 
                    ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
               >
                 {tab}
               </button>
             ))}
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400">
              <tr>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Jenis Cuti</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Tanggal</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Durasi</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Alasan</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {leaveHistory.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold text-slate-700 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                    {new Date(row.start).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(row.end).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5 text-slate-500 dark:text-slate-400 font-bold tabular-nums">{row.days} Hari</td>
                  <td className="px-8 py-5 text-slate-500 dark:text-slate-400 text-xs italic truncate max-w-[200px]">{row.reason}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      row.status === "Approved" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : row.status === "Pending" 
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
