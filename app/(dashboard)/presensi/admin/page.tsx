"use client";

import { useEffect, useState } from "react";

interface Karyawan {
  id: number;
  nama: string;
  nik?: string;
  divisi?: {
    name: string;
  };
}

interface PresenceData {
  id: number;
  nik: string;
  nama: string;
  divisi: string;
  status: string;
  time: string;
  date: string;
  keterangan: string;
}

export default function ReportPresensiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [presenceData, setPresenceData] = useState<PresenceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresence = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/presensi", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil data presensi");
        }

        const rawData = data.data || data || [];
        
        const mappedData = rawData.map((item: any) => ({
          id: item.id,
          nik: item.Karyawan?.nik || item.nik || "N/A",
          nama: item.Karyawan?.nama || item.nama || "N/A",
          divisi: item.Karyawan?.divisi?.name || item.divisi || "N/A",
          status: item.status || "N/A",
          time: item.jam_masuk || "-",
          date: item.tanggal || "-",
          keterangan: item.keterangan || "-",
        }));

        setPresenceData(mappedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPresence();
  }, []);

  const filteredData = presenceData.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.nik.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hadir: {presenceData.filter(d => d.status.toLowerCase() === "hadir").length}</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Izin: {presenceData.filter(d => d.status.toLowerCase() === "izin").length}</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sakit: {presenceData.filter(d => d.status.toLowerCase() === "sakit").length}</span>
               </div>
            </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Memuat data presensi...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-500">
              <i className="fi fi-rr-exclamation text-2xl mb-2 block"></i>
              <p className="font-bold">{error}</p>
            </div>
          ) : (
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
                {filteredData.length > 0 ? (
                  filteredData.map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-400">{i + 1}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-xs shadow-inner uppercase">
                            {row.nama.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">{row.nama}</div>
                            <div className="text-[10px] text-slate-400 font-medium tabular-nums">{row.nik}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700 uppercase">
                          {row.divisi}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.time}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          row.status.toLowerCase() === "hadir" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : row.status.toLowerCase() === "izin" 
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-zinc-800 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center" title={row.keterangan}>
                          <i className="fi fi-rr-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-10 text-center text-slate-400 italic">
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
