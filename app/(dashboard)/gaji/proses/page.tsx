"use client";

import { useState, useEffect, useRef } from "react";

export default function ProsesGajiPage() {
  const [periode, setPeriode] = useState("2024-03");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const employeesSalary = [
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", jabatan: "Manager IT", pokok: 15000000, cuti: 500000, potongan: 200000, total: 15300000 },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", jabatan: "HR Specialist", pokok: 8000000, cuti: 0, potongan: 100000, total: 7900000 },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", jabatan: "Frontend Developer", pokok: 10000000, cuti: 200000, potongan: 0, total: 10200000 },
  ];

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleProses = () => {
    setIsProcessing(true);
    timerRef.current = setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Proses Gaji Bulanan</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Generate dan hitung gaji seluruh karyawan dalam satu klik.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <input 
            type="month" 
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 text-sm font-bold outline-none focus:border-primary transition-all"
           />
           <button 
            onClick={handleProses}
            disabled={isProcessing}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 ${
              isProcessing 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
            }`}
           >
             {isProcessing ? (
               <>
                 <span className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                 Memproses...
               </>
             ) : (
               <>
                 <i className="fi fi-rr-play"></i>
                 Proses Gaji
               </>
             )}
           </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Pengeluaran Gaji</p>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">{formatIDR(33400000)}</h4>
         </div>
         <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Karyawan</p>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">120 Orang</h4>
         </div>
         <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Status Periode</p>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black border border-amber-100 uppercase tracking-widest">Draft</span>
         </div>
      </div>

      {/* Salary Table */}
      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Karyawan</th>
                <th className="px-8 py-4">Gaji Pokok</th>
                <th className="px-8 py-4">Uang Cuti</th>
                <th className="px-8 py-4">Potongan</th>
                <th className="px-8 py-4">Total Diterima</th>
                <th className="px-8 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {employeesSalary.map((emp) => (
                <tr key={emp.id} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">{emp.nama}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{emp.nik} • {emp.jabatan}</div>
                  </td>
                  <td className="px-8 py-5 font-semibold text-slate-600 dark:text-slate-400 tabular-nums">{formatIDR(emp.pokok)}</td>
                  <td className="px-8 py-5 font-semibold text-emerald-500 tabular-nums">+{formatIDR(emp.cuti)}</td>
                  <td className="px-8 py-5 font-semibold text-rose-500 tabular-nums">-{formatIDR(emp.potongan)}</td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">{formatIDR(emp.total)}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setSelectedEmployee(emp)}
                      className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-white hover:bg-primary transition-all flex items-center justify-center shadow-sm"
                    >
                      <i className="fi fi-rr-edit-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-zinc-900 animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-start">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Calculation Breakdown</p>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedEmployee.nama}</h3>
                   <p className="text-xs text-slate-400 font-medium">{selectedEmployee.nik} • {selectedEmployee.jabatan}</p>
                </div>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all font-bold"
                >
                  ✕
                </button>
             </div>
             
             <div className="p-8 space-y-6">
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Gaji Pokok</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatIDR(selectedEmployee.pokok)}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Uang Cuti (Tambahan)</span>
                      <span className="font-bold text-emerald-500 tabular-nums">+{formatIDR(selectedEmployee.cuti)}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Potongan</span>
                      <span className="font-bold text-rose-500 tabular-nums">-{formatIDR(selectedEmployee.potongan)}</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-zinc-800">
                   <div className="flex justify-between items-center p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
                      <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Total Gaji Netto</span>
                      <span className="text-2xl font-black text-primary tabular-nums">{formatIDR(selectedEmployee.total)}</span>
                   </div>
                </div>
             </div>
             
             <div className="p-8 pt-0 flex gap-3">
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="flex-1 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Simpan Perubahan
                </button>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-3 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  Tutup
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
