"use client";

import { useState } from "react";

export default function ReportCutiPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const employeesLeave = [
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", divisi: "IT", total: 12, used: 4, remaining: 8 },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", divisi: "HR", total: 12, used: 2, remaining: 10 },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", divisi: "Finance", total: 12, used: 12, remaining: 0 },
    { id: 4, nik: "EMP004", nama: "Rina Wijaya", divisi: "Marketing", total: 15, used: 5, remaining: 10 },
  ];

  const employeeHistory = [
    { date: "2024-02-15", type: "Tahunan", days: 3, status: "Approved", reason: "Acara Keluarga" },
    { date: "2024-01-10", type: "Sakit", days: 1, status: "Approved", reason: "Demam" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Report Saldo Cuti</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor saldo dan penggunaan cuti seluruh karyawan.</p>
        </div>
        
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
          <i className="fi fi-rr-download"></i>
          Download Report
        </button>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="md:col-span-2 relative">
            <i className="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
             type="text" 
             placeholder="Cari nama karyawan..."
             className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 bg-white outline-none focus:border-primary transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-sm shadow-sm"
            />
         </div>
         <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 flex items-center justify-between">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Total Saldo</span>
            <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">450 Hari</span>
         </div>
         <div className="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-2xl border border-rose-100 dark:border-rose-900/20 flex items-center justify-between">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Terpakai</span>
            <span className="text-lg font-black text-rose-700 dark:text-rose-400">124 Hari</span>
         </div>
      </div>

      {/* Report Table */}
      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400">
              <tr>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Karyawan</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Divisi</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Total</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Terpakai</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Sisa Saldo</th>
                <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {employeesLeave.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <div>
                      <div className="font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">{row.nama}</div>
                      <div className="text-[10px] text-slate-400 font-medium tracking-wider">{row.nik}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {row.divisi}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center font-bold text-slate-600 dark:text-slate-400 tabular-nums">{row.total}</td>
                  <td className="px-8 py-5 text-center font-bold text-rose-500 tabular-nums">{row.used}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`text-sm font-black tabular-nums ${row.remaining > 5 ? "text-emerald-500" : row.remaining > 0 ? "text-amber-500" : "text-rose-500"}`}>
                      {row.remaining}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setSelectedEmployee(row)}
                      className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-white hover:bg-primary transition-all flex items-center justify-center shadow-sm"
                      title="Lihat Detail History"
                    >
                      <i className="fi fi-rr-info"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail History Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-zinc-900 animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-start">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Detailed History</p>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedEmployee.nama}</h3>
                   <p className="text-xs text-slate-400 font-medium">Sisa Saldo Cuti: <span className="text-emerald-500 font-bold">{selectedEmployee.remaining} Hari</span></p>
                </div>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  ✕
                </button>
             </div>
             
             <div className="p-8">
                <table className="w-full text-left text-sm">
                   <thead className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                      <tr>
                         <th className="pb-4">Tanggal</th>
                         <th className="pb-4">Jenis</th>
                         <th className="pb-4">Durasi</th>
                         <th className="pb-4">Alasan</th>
                         <th className="pb-4 text-right">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                      {employeeHistory.map((h, i) => (
                        <tr key={i} className="text-slate-600 dark:text-slate-300">
                           <td className="py-4 font-bold whitespace-nowrap">{h.date}</td>
                           <td className="py-4">
                              <span className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-zinc-800 text-[10px] font-bold">{h.type}</span>
                           </td>
                           <td className="py-4 font-bold tabular-nums text-primary">{h.days} Hari</td>
                           <td className="py-4 text-xs italic">{h.reason}</td>
                           <td className="py-4 text-right">
                              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                {h.status}
                              </span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 flex justify-end">
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Close History
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
