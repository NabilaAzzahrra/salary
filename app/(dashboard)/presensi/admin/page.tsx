"use client";

import { useState } from "react";

export default function ReportPresensiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const reportData = [
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", divisi: "IT", status: "Hadir", time: "08:00", date: "2024-03-01" },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", divisi: "HR", status: "Hadir", time: "08:15", date: "2024-03-01" },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", divisi: "Finance", status: "Izin", time: "-", date: "2024-03-01" },
    { id: 4, nik: "EMP004", nama: "Rina Wijaya", divisi: "Marketing", status: "Sakit", time: "-", date: "2024-03-01" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Report Presensi</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitoring kehadiran seluruh karyawan secara real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-slate-400 flex items-center gap-2">
            <i className="fi fi-rr-download"></i>
            Export PDF
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
            <i className="fi fi-rr-print"></i>
            Cetak Laporan
          </button>
        </div>
      </div>

      {/* Filters Card */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
               <i className="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
               <input 
                type="text" 
                placeholder="Cari nama karyawan atau NIK..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:border-primary transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white text-sm"
               />
            </div>
            <input 
              type="date" 
              className="px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:border-primary transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white text-sm"
            />
            <select className="px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:border-primary transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white text-sm">
               <option>Semua Divisi</option>
               <option>IT</option>
               <option>HR</option>
               <option>Finance</option>
            </select>
         </div>
      </div>

      {/* Report Table */}
      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Data Kehadiran Hari Ini</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hadir: 120</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Izin: 5</span>
               </div>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400">
              <tr>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">No</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Karyawan</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Divisi</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Jam Masuk</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {reportData.map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-400">{i + 1}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-xs shadow-inner">
                        {row.nama.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">{row.nama}</div>
                        <div className="text-[10px] text-slate-400 font-medium tabular-nums">{row.nik}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700">
                      {row.divisi}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.time}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      row.status === "Hadir" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : row.status === "Izin" 
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center">
                      <i className="fi fi-rr-eye"></i>
                    </button>
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
