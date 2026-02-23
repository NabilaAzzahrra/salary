"use client";

import { useEffect, useState, useRef } from "react";

interface Divisi {
  id: number;
  divisi: string;
}

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: Divisi; // Populated locally for UI
}

export default function JabatanPage() {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [namaJabatan, setNamaJabatan] = useState("");
  const [idDivisi, setIdDivisi] = useState<string>("");
  const [gajiPokok, setGajiPokok] = useState("");

  // Searchable Select states
  const [searchDivisi, setSearchDivisi] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Cleanup searchable select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setDivisiList(data.data || data);
      }
    } catch (err: unknown) {
      console.error("Fetch Divisi Error:", err);
    }
  };

  const fetchJabatan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data jabatan");
      setJabatanList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
      fetchJabatan();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          jabatan: namaJabatan,
          id_divisi: parseInt(idDivisi),
          gaji_pokok: parseInt(gajiPokok),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} jabatan`);
      }

      setNamaJabatan("");
      setIdDivisi("");
      setGajiPokok("");
      setEditingId(null);
      fetchJabatan();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setNamaJabatan(item.jabatan);
    setIdDivisi(item.id_divisi.toString());
    setGajiPokok(item.gaji_pokok.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus jabatan");
      }
      fetchJabatan();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const filteredDivisi = divisiList.filter(d => 
    d.divisi.toLowerCase().includes(searchDivisi.toLowerCase())
  );

  const selectedDivisiLabel = divisiList.find(d => d.id.toString() === idDivisi)?.divisi || "Pilih Divisi";

  const getDivisiName = (id: number) => {
    return divisiList.find(d => d.id === id)?.divisi || "N/A";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Management Jabatan</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure positions and salary structures.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* ================= FORM (4/12) ================= */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {editingId ? "✏️" : "➕"}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit Jabatan" : "Tambah Jabatan"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Nama Jabatan
              </label>
              <input
                type="text"
                placeholder="Contoh: Manager IT"
                value={namaJabatan}
                onChange={(e) => setNamaJabatan(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
            </div>

            {/* Searchable Select */}
            <div className="relative" ref={selectRef}>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Pilih Divisi
              </label>
              <div 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800 flex justify-between items-center group"
              >
                <span className={idDivisi ? "text-slate-900 dark:text-white font-medium" : "text-slate-400"}>
                  {selectedDivisiLabel}
                </span>
                <span className="text-slate-400 group-hover:text-primary transition-colors">▼</span>
              </div>

              {isSelectOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden ring-1 ring-slate-200/50">
                  <div className="mb-2 px-1">
                    <input
                      type="text"
                      placeholder="Cari divisi..."
                      value={searchDivisi}
                      onChange={(e) => setSearchDivisi(e.target.value)}
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-primary dark:border-zinc-800 dark:bg-zinc-800"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="max-h-56 overflow-y-auto custom-scrollbar">
                    {filteredDivisi.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-400 italic">Tidak ditemukan</p>
                    ) : (
                      filteredDivisi.map((d) => (
                        <div
                          key={d.id}
                          onClick={() => {
                            setIdDivisi(d.id.toString());
                            setIsSelectOpen(false);
                            setSearchDivisi("");
                          }}
                          className={`rounded-xl px-4 py-3 text-sm font-medium cursor-pointer transition-all mb-1 last:mb-0 ${
                            idDivisi === d.id.toString() 
                              ? "bg-primary text-white shadow-lg shadow-primary/20" 
                              : "hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:text-primary"
                          }`}
                        >
                          {d.divisi}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Gaji Pokok
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none">Rp</span>
                <input
                  type="number"
                  placeholder="0"
                  value={gajiPokok}
                  onChange={(e) => setGajiPokok(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-900/10 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Process..." : editingId ? "Update" : "Simpan"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNamaJabatan("");
                    setIdDivisi("");
                    setGajiPokok("");
                  }}
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
              Data Jabatan
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
              {jabatanList.length} Items Total
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 border-b border-slate-50 dark:border-zinc-800">
                <tr>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">No</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Jabatan</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Divisi</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Gaji Pokok</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                {jabatanList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">
                      No roles found.
                    </td>
                  </tr>
                ) : (
                  jabatanList.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-5 font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">
                        {item.jabatan}
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700 group-hover:bg-white dark:group-hover:bg-primary/20 transition-all">
                          {getDivisiName(item.id_divisi)}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-emerald-600 dark:text-emerald-400 font-black tabular-nums">
                        {formatCurrency(item.gaji_pokok)}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <button
                            onClick={() => handleEdit(item)}
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary rounded-xl transition-all shadow-sm hover:shadow-primary/30"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-secondary rounded-xl transition-all shadow-sm hover:shadow-secondary/30"
                            title="Hapus"
                          >
                            🗑️
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
