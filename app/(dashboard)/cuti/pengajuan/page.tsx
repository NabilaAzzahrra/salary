"use client";

import { useState } from "react";

export default function FormCutiPage() {
  const [leaveType, setLeaveType] = useState("Tahunan");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const leaveTypes = [
    { id: "tahunan", name: "Cuti Tahunan", icon: "fi-rr-calendar-check", color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "sakit", name: "Cuti Sakit", icon: "fi-rr-heart", color: "text-rose-500", bg: "bg-rose-50" },
    { id: "penting", name: "Alasan Penting", icon: "fi-rr-exclamation", color: "text-amber-500", bg: "bg-amber-50" },
    { id: "bersama", name: "Cuti Bersama", icon: "fi-rr-users-alt", color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Form Pengajuan Cuti</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Silahkan lengkapi data di bawah ini untuk mengajukan cuti.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800">
            <form className="space-y-6">
              {/* Leave Type Selector */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-4 block">Pilih Jenis Cuti</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setLeaveType(type.name)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                        leaveType === type.name
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                          : "bg-slate-50 border-slate-100 text-slate-500 hover:border-primary/30 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                      }`}
                    >
                      <i className={`fi ${type.icon} text-lg ${leaveType === type.name ? "text-white" : type.color}`}></i>
                      <span className="text-[10px] font-bold text-center leading-tight">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tanggal Berakhir</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Alasan Cuti</label>
                <textarea
                  placeholder="Berikan alasan yang jelas untuk pengajuan cuti Anda..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800 min-h-[150px]"
                  required
                />
              </div>

              {/* Attachment Placeholder */}
              <div className="p-6 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer">
                <i className="fi fi-rr-cloud-upload text-2xl"></i>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Upload Dokumen Pendukung (Opsional)</p>
                  <p className="text-[10px]">PDF, JPG, atau PNG (Maks 2MB)</p>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <i className="fi fi-rr-paper-plane"></i>
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-200 dark:shadow-none relative overflow-hidden">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
            <h3 className="text-lg font-bold mb-6 relative z-10 flex items-center gap-2">
              <i className="fi fi-rr-info text-tertiary"></i>
              Ketentuan Cuti
            </h3>
            <ul className="space-y-4 text-xs text-slate-300 relative z-10">
              <li className="flex gap-3">
                <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">1</span>
                <span>Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai.</span>
              </li>
              <li className="flex gap-3">
                <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">2</span>
                <span>Cuti sakit wajib melampirkan surat keterangan dokter.</span>
              </li>
              <li className="flex gap-3">
                <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">3</span>
                <span>Persetujuan cuti bergantung pada kebijakan manajer divisi.</span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Butuh Bantuan?</p>
              <p className="text-xs">Hubungi HRD melalui email hrd@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
