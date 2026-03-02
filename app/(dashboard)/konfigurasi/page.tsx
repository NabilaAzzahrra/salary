"use client";

import { useEffect, useState } from "react";

interface Konfigurasi {
  id: number;
  tahun: string;
  jatah_cuti_tahunan: number;
  nilai_uang_per_cuti: number;
  aktif: boolean;
}

export default function KonfigurasiPage() {
  const [konfigurasiList, setKonfigurasiList] = useState<Konfigurasi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [tahun, setTahun] = useState("");
  const [jatahCuti, setJatahCuti] = useState("");
  const [nilaiUang, setNilaiUang] = useState("");
  const [aktif, setAktif] = useState(true);

  // Placeholders
  useEffect(() => {
    setKonfigurasiList([
      { id: 1, tahun: "2024", jatah_cuti_tahunan: 12, nilai_uang_per_cuti: 150000, aktif: true },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && konfigurasiList.length >= 1) {
      alert("Data sudah ada! Hanya diperbolehkan satu data konfigurasi.");
      return;
    }
    // No action as requested
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Konfigurasi Tahun</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Setup annual leave and compensation parameters.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* ================= FORM (4/12) ================= */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {editingId ? "✏️" : "➕"}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit Konfigurasi" : "Tambah Konfigurasi"}
            </h2>
          </div>

          <div className="mb-6 rounded-2xl bg-amber-50 p-4 border border-amber-100/50 dark:bg-amber-900/10 dark:border-amber-900/20">
            <div className="flex gap-3">
              <span className="text-amber-500 mt-0.5">ℹ️</span>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-relaxed">
                Jika sudah terdapat satu data maka tidak dapat menambah data lagi.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tahun</label>
              <input
                type="number"
                placeholder="2024"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Jatah Cuti Tahunan</label>
              <div className="relative group">
                <input
                  type="number"
                  placeholder="12"
                  value={jatahCuti}
                  onChange={(e) => setJatahCuti(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">Hari</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Nilai Uang Per Cuti</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none">Rp</span>
                <input
                  type="number"
                  placeholder="0"
                  value={nilaiUang}
                  onChange={(e) => setNilaiUang(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Status</label>
              <select
                value={aktif ? "true" : "false"}
                onChange={(e) => setAktif(e.target.value === "true")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
              >
                {editingId ? "Update" : "Simpan"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ================= TABLE (8/12) ================= */}
        <div className="lg:col-span-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Data Konfigurasi
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
              {konfigurasiList.length} Items Total
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 border-b border-slate-50 dark:border-zinc-800">
                <tr>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">No</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Tahun</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Jatah Cuti</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Nilai Uang</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                {konfigurasiList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-16 text-center text-slate-400 italic">
                      No configuration found.
                    </td>
                  </tr>
                ) : (
                  konfigurasiList.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-5 font-black text-slate-700 dark:text-white">
                        {item.tahun}
                      </td>
                      <td className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400">
                        {item.jatah_cuti_tahunan} Hari
                      </td>
                      <td className="px-8 py-5 text-emerald-600 dark:text-emerald-400 font-black tabular-nums">
                        {formatCurrency(item.nilai_uang_per_cuti)}
                      </td>
                      <td className="px-8 py-5">
                        {item.aktif ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-200">Aktif</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-200">Off</span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <button
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary rounded-xl transition-all shadow-sm hover:shadow-primary/30"
                            title="Edit"
                          >
                            ✏️
                          </button>
                        </div>
                      </td>
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
