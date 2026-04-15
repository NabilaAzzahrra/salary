"use client";

import { useEffect, useState } from "react";

interface Karyawan {
  id: number;
  nama: string;
  email?: string;
  nik?: string;
}

interface Presensi {
  id: number;
  id_karyawan: number;
  tanggal: string;
  status: string;
  keterangan: string;
  jam_masuk: string;
  jam_keluar: string;
  Karyawan?: Karyawan; // relasi dari backend (Sequelize include)
}

export default function KehadiranPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("hadir");
  const [keterangan, setKeterangan] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [riwayat, setRiwayat] = useState<Presensi[]>([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);
  const [idKaryawan, setIdKaryawan] = useState<number | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};

  // Real-time clock update
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Karyawan ID
  const fetchMyKaryawanId = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        const karyawans = data.data || data;
        // Gunakan toLowerCase() untuk meminimalkan error karena perbedaan case
        const myKaryawan = karyawans.find((k: any) => k.email?.toLowerCase() === user.email?.toLowerCase());

        console.log("== DEBUG: Data User Login ==", user.email);
        console.log("== DEBUG: Apakah Karyawan Ketemu? ==", myKaryawan ? myKaryawan.id : "TIDAK KETEMU");
        
        if (myKaryawan) {
          setIdKaryawan(myKaryawan.id);
          fetchRiwayat(myKaryawan.id);
        } else {
          setError("Profil karyawan tidak ditemukan untuk email Anda. Hubungi Admin.");
        }
      }
    } catch (err: unknown) {
      console.error("Fetch Karyawan Error:", err);
    }
  };

  // Fetch riwayat presensi
  const fetchRiwayat = async (karyawanId: number) => {
    setLoadingRiwayat(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/presensi", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log('data:',data);
      
      if (res.ok) {
        const allData = data.data || data;
        console.log("== DEBUG: Total Semua Data Presensi API ==", allData.length);
        
        // Coba periksa apakah property di backend itu id_karyawan atau karyawan_id
        if (allData.length > 0) {
           console.log("== DEBUG: Contoh 1 Data Presensi API ==", allData[0]);
        }

        // Filter hanya presensi milik karyawan yang login
        const myPresensi = allData.filter(
          (p: any) => Number(p.id_karyawan) === Number(karyawanId) || Number(p.karyawan_id) === Number(karyawanId) || p.karyawan?.id === karyawanId
        );

        console.log("== DEBUG: Presensi Terfilter untuk ID", karyawanId, " ==", myPresensi.length);

        // Urutkan berdasarkan tanggal terbaru
        const sorted = myPresensi.sort((a: any, b: any) => {
          return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
        });

        setRiwayat(sorted);
      }
    } catch (err: unknown) {
      console.error("Fetch Riwayat Error:", err);
    } finally {
      setLoadingRiwayat(false);
    }
  };

  useEffect(() => {
    if (token && user.email) {
      fetchMyKaryawanId();
    }
  }, [token, user.email]);

  // Submit presensi
  const handleSubmit = async () => {
    if (!idKaryawan) {
      setError("Data karyawan belum siap. Silakan refresh halaman.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const tanggal = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const jamMasuk = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/presensi", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id_karyawan: idKaryawan,
          tanggal: tanggal,
          status: status,
          keterangan: keterangan || "-",
          jam_masuk: jamMasuk,
          jam_keluar: "17:00:00",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan presensi");
      }

      setSuccess("Presensi berhasil disimpan! ✅");
      setKeterangan("");
      setStatus("hadir");
      fetchRiwayat(idKaryawan); // Refresh riwayat
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak terduga");
      }
    } finally {
      setLoading(false);
    }
  };

  // Format status label
  const getStatusLabel = (s: string) => {
    const map: Record<string, string> = { hadir: "Hadir", izin: "Izin", sakit: "Sakit" };
    return map[s] || s;
  };

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
                    {["hadir", "izin", "sakit"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border ${
                          status === s 
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
                            : "bg-slate-50 border-slate-100 text-slate-500 hover:border-primary/30 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                        }`}
                      >
                        {getStatusLabel(s)}
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

                {/* Error Message */}
                {error && (
                  <div className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-900/10 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-600 dark:bg-emerald-900/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
                    {success}
                  </div>
                )}

                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <i className="fi fi-rr-check"></i>
                      Submit Kehadiran
                    </>
                  )}
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
             <div className="flex items-center gap-2 text-xs font-bold bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full shadow-sm">
               <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
               {riwayat.length} Records
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400">
                   <tr>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Tanggal</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Nama Karyawan</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Masuk</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Pulang</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                      <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Ket</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                   {loadingRiwayat ? (
                     <tr>
                       <td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">
                         Memuat riwayat...
                       </td>
                     </tr>
                   ) : riwayat.length === 0 ? (
                     <tr>
                       <td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">
                         Belum ada riwayat presensi.
                       </td>
                     </tr>
                   ) : (
                     riwayat.map((row, i) => (
                       <tr key={row.id || i} className="group hover:bg-slate-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-8 py-5 font-bold text-slate-700 dark:text-white">
                            {new Date(row.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.Karyawan?.nama || "-"}</td>
                          <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.jam_masuk || "-"}</td>
                          <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.jam_keluar || "-"}</td>
                          <td className="px-8 py-5">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                               row.status === "hadir" 
                                 ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                 : row.status === "sakit"
                                   ? "bg-rose-50 text-rose-600 border-rose-100"
                                   : "bg-amber-50 text-amber-600 border-amber-100"
                             }`}>
                               {getStatusLabel(row.status)}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-slate-400 italic text-xs">{row.keterangan || "-"}</td>
                       </tr>
                     ))
                   )}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
