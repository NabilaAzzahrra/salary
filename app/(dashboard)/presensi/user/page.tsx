"use client";

import { useEffect, useState } from "react";

export default function KehadiranPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Hadir");
  const [keterangan, setKeterangan] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Real-time clock update
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const attendanceHistory = [
    { date: "2024-03-01", clockIn: "08:00", clockOut: "17:00", status: "Hadir", note: "-" },
    { date: "2024-02-28", clockIn: "08:15", clockOut: "17:05", status: "Hadir", note: "-" },
    { date: "2024-02-27", clockIn: "-", clockOut: "-", status: "Izin", note: "Urusan Keluarga" },
    { date: "2024-02-26", clockIn: "07:55", clockOut: "17:00", status: "Hadir", note: "-" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Digital Clock */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Presensi Kehadiran</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Silahkan melakukan presensi harian Anda.</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
             <i className="fi fi-rr-clock-three"></i>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {mounted ? currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "--:--:--"}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {mounted ? currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "Loading..."}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= INPUT SECTION ================= */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800">
             <div className="flex items-center gap-3 mb-8">
               <div className="h-10 w-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                 <i className="fi fi-rr-edit"></i>
               </div>
               <h3 className="text-lg font-bold text-slate-900 dark:text-white">Form Presensi</h3>
             </div>

             <div className="space-y-6">
                {/* Status Selection Cards */}
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 block">Status Kehadiran</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Hadir", "Izin", "Sakit"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border ${
                          status === s 
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
                            : "bg-slate-50 border-slate-100 text-slate-500 hover:border-primary/30 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 block text-right">Keterangan (Opsional)</label>
                   <textarea
                    placeholder="Contoh: Sakit flu, Izin urusan keluarga..."
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-800 min-h-[120px]"
                   />
                </div>

                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <i className="fi fi-rr-check"></i>
                  Submit Kehadiran
                </button>
             </div>
          </div>
          
          {/* Quick Info */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-primary p-6 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
             <h4 className="font-bold flex items-center gap-2 mb-2">
               <i className="fi fi-rr-info"></i>
               Info Penting
             </h4>
             <p className="text-xs text-indigo-100 leading-relaxed">
               Batas waktu presensi masuk adalah pukul 08:30 WIB. Keterlambatan akan dicatat secara otomatis oleh sistem.
             </p>
          </div>
        </div>

        {/* ================= HISTORY SECTION ================= */}
        <div className="lg:col-span-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Riwayat Kehadiran</h3>
             <button className="text-xs font-bold text-primary hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400">
                   <tr>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Tanggal</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Masuk</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Pulang</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Ket</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                   {attendanceHistory.map((row, i) => (
                     <tr key={i} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-700 dark:text-white">
                          {new Date(row.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.clockIn}</td>
                        <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.clockOut}</td>
                        <td className="px-8 py-5">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                             row.status === "Hadir" 
                               ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                               : "bg-amber-50 text-amber-600 border-amber-100"
                           }`}>
                             {row.status}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-slate-400 italic text-xs">{row.note}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
