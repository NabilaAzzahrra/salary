"use client";

import { useState } from "react";

export default function SlipGajiPage() {
  const [selectedSlip, setSelectedSlip] = useState<any>(null);

  const salaryHistory = [
    { id: 1, month: "Maret 2024", total: 15300000, date: "2024-03-25", status: "Paid", components: { pokok: 15000000, cuti: 500000, potongan: 200000 } },
    { id: 2, month: "Februari 2024", total: 14800000, date: "2024-02-25", status: "Paid", components: { pokok: 15000000, cuti: 0, potongan: 200000 } },
    { id: 3, month: "Januari 2024", total: 15150000, date: "2024-01-25", status: "Paid", components: { pokok: 15000000, cuti: 300000, potongan: 150000 } },
  ];

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Riwayat Slip Gaji</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Unduh slip gaji bulanan Anda dengan mudah.</p>
      </div>

      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Periode</th>
                <th className="px-8 py-4">Total Gaji Netto</th>
                <th className="px-8 py-4">Tanggal Pembayaran</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {salaryHistory.map((slip) => (
                <tr key={slip.id} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-700 dark:text-white tabular-nums">{slip.month}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-primary tabular-nums">{formatIDR(slip.total)}</span>
                  </td>
                  <td className="px-8 py-5 text-slate-500 dark:text-slate-400 font-medium tabular-nums">{slip.date}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">Paid</span>
                  </td>
                  <td className="px-8 py-5 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => setSelectedSlip(slip)}
                      className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-white hover:bg-primary transition-all flex items-center justify-center shadow-sm"
                    >
                      <i className="fi fi-rr-eye"></i>
                    </button>
                    <button className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-white hover:bg-tertiary transition-all flex items-center justify-center shadow-sm">
                      <i className="fi fi-rr-download"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Gaji Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-zinc-900 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 dark:border-zinc-800 bg-slate-900 text-white relative">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-primary opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-black italic tracking-widest uppercase mb-1">Salary<span className="text-tertiary">App</span></h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Official Payslip</p>
                <div className="mt-6 flex justify-between items-end">
                   <div>
                      <p className="text-[10px] text-slate-400 uppercase mb-1">Periode</p>
                      <p className="text-lg font-black">{selectedSlip.month}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase mb-1">Pay Date</p>
                      <p className="font-bold">{selectedSlip.date}</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-50">Earnings</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Gaji Pokok</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatIDR(selectedSlip.components.pokok)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Uang Cuti</span>
                    <span className="font-bold text-emerald-500 tabular-nums">+{formatIDR(selectedSlip.components.cuti)}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-50">Deductions</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Potongan</span>
                    <span className="font-bold text-rose-500 tabular-nums">-{formatIDR(selectedSlip.components.potongan)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-dashed border-slate-100 dark:border-zinc-800">
                 <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Total Netto</span>
                    <span className="text-xl font-black text-primary tabular-nums">{formatIDR(selectedSlip.total)}</span>
                 </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 flex gap-3">
              <button className="flex-1 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center gap-2">
                 <i className="fi fi-rr-print"></i>
                 Print Payslip
              </button>
              <button 
                onClick={() => setSelectedSlip(null)}
                className="px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 text-sm font-bold text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
