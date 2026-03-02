"use client";

import { useState } from "react";

export default function ReportGajiPage() {
  const [periode, setPeriode] = useState("2024-03");

  const reportData = [
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", jabatan: "Manager IT", pokok: 15000000, cuti: 500000, potongan: 200000, total: 15300000 },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", jabatan: "HR Specialist", pokok: 8000000, cuti: 0, potongan: 100000, total: 7900000 },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", jabatan: "Frontend Developer", pokok: 10000000, cuti: 200000, potongan: 0, total: 10200000 },
    { id: 4, nik: "EMP004", nama: "Rina Wijaya", jabatan: "Marketing", pokok: 7500000, cuti: 100000, potongan: 50000, total: 7550000 },
  ];

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const totalPayroll = reportData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Laporan Gaji Karyawan</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Laporan rekapitulasi penggajian seluruh divisi.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <input 
            type="month" 
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 text-sm font-bold outline-none focus:border-primary transition-all"
           />
           <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
             <i className="fi fi-rr-download"></i>
             Export Excel
           </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Payroll</p>
            <h4 className="text-2xl font-black text-primary tabular-nums">{formatIDR(totalPayroll)}</h4>
         </div>
         <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Potongan</p>
            <h4 className="text-2xl font-black text-rose-500 tabular-nums">{formatIDR(350000)}</h4>
         </div>
         <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Uang Cuti Dibayar</p>
            <h4 className="text-2xl font-black text-emerald-500 tabular-nums">{formatIDR(800000)}</h4>
         </div>
         <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Jumlah Karyawan</p>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">120</h4>
         </div>
      </div>

      {/* Report Table */}
      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-center">
           <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rincian Laporan Gaji</h3>
           <div className="relative">
              <i className="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
               type="text" 
               placeholder="Cari karyawan..."
               className="pl-11 pr-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-primary transition-all dark:bg-zinc-800 dark:border-zinc-700 text-xs shadow-sm w-64"
              />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Karyawan</th>
                <th className="px-8 py-4">Gaji Pokok</th>
                <th className="px-8 py-4">Uang Cuti</th>
                <th className="px-8 py-4">Potongan</th>
                <th className="px-8 py-4">Total Netto</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {reportData.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">{row.nama}</div>
                    <div className="text-[10px] text-slate-400 font-medium tracking-wider">{row.nik} • {row.jabatan}</div>
                  </td>
                  <td className="px-8 py-5 font-semibold text-slate-600 dark:text-slate-400 tabular-nums">{formatIDR(row.pokok)}</td>
                  <td className="px-8 py-5 font-semibold text-emerald-500 tabular-nums">+{formatIDR(row.cuti)}</td>
                  <td className="px-8 py-5 font-semibold text-rose-500 tabular-nums">-{formatIDR(row.potongan)}</td>
                  <td className="px-8 py-5 font-black text-slate-900 dark:text-white tabular-nums">{formatIDR(row.total)}</td>
                  <td className="px-8 py-5 text-right">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50/50 dark:bg-zinc-900/50">
               <tr>
                  <td colSpan={4} className="px-8 py-6 font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs text-right italic">Grand Total</td>
                  <td className="px-8 py-6 font-black text-primary tabular-nums text-lg">{formatIDR(totalPayroll)}</td>
                  <td></td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
