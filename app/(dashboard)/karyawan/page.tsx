"use client";

import { useEffect, useState, useRef } from "react";

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: Jabatan;
}

export default function KaryawanPage() {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);

  // Form states
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idJabatan, setIdJabatan] = useState<string>("");
  const [statusAktif, setStatusAktif] = useState(true);

  // Searchable Select states
  const [searchJabatan, setSearchJabatan] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Placeholders for data fetching
  useEffect(() => {
    // Mimic fetching data
    setJabatanList([
      { id: 1, jabatan: "Manager IT" },
      { id: 2, jabatan: "Frontend Developer" },
      { id: 3, jabatan: "HR Specialist" },
      { id: 4, jabatan: "Finance Manager" },
    ]);
    setKaryawanList([
      { 
        id: 1, 
        nik: "EMP001", 
        nama: "Ahmad Fauzi", 
        email: "ahmad.fauzi@company.com", 
        tempat_lahir: "Bandung", 
        tanggal_lahir: "1990-05-15", 
        alamat: "Jl. Merdeka No. 123", 
        id_jabatan: 1, 
        status_aktif: true,
        jabatan: { id: 1, jabatan: "Manager IT" }
      },
      { 
        id: 2, 
        nik: "EMP002", 
        nama: "Siti Aminah", 
        email: "siti.aminah@company.com", 
        tempat_lahir: "Jakarta", 
        tanggal_lahir: "1995-08-20", 
        alamat: "Jl. Sudirman No. 45", 
        id_jabatan: 3, 
        status_aktif: true,
        jabatan: { id: 3, jabatan: "HR Specialist" }
      },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No action as requested
  };

  const filteredJabatan = jabatanList.filter(j => 
    j.jabatan.toLowerCase().includes(searchJabatan.toLowerCase())
  );

  const selectedJabatanLabel = jabatanList.find(j => j.id.toString() === idJabatan)?.jabatan || "Pilih Jabatan";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Management Karyawan</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage employee records and information.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* ================= FORM (4/12) ================= */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {editingId ? "✏️" : "➕"}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit Karyawan" : "Tambah Karyawan"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">NIK</label>
                <input
                  type="text"
                  placeholder="NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Nama</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tempat Lahir</label>
                <input
                  type="text"
                  placeholder="Kota"
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tanggal Lahir</label>
                <input
                  type="date"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Alamat</label>
              <textarea
                placeholder="Alamat Lengkap"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800 min-h-[100px]"
              />
            </div>

            {/* Searchable Select */}
            <div className="relative" ref={selectRef}>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Jabatan</label>
              <div 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800 flex justify-between items-center group"
              >
                <span className={idJabatan ? "text-slate-900 dark:text-white font-medium" : "text-slate-400"}>
                  {selectedJabatanLabel}
                </span>
                <span className="text-slate-400 group-hover:text-primary transition-colors">▼</span>
              </div>

              {isSelectOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden ring-1 ring-slate-200/50">
                  <div className="mb-2 px-1">
                    <input
                      type="text"
                      placeholder="Cari jabatan..."
                      value={searchJabatan}
                      onChange={(e) => setSearchJabatan(e.target.value)}
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-primary dark:border-zinc-800 dark:bg-zinc-800"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="max-h-56 overflow-y-auto custom-scrollbar">
                    {filteredJabatan.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-400 italic">Tidak ditemukan</p>
                    ) : (
                      filteredJabatan.map((j) => (
                        <div
                          key={j.id}
                          onClick={() => {
                            setIdJabatan(j.id.toString());
                            setIsSelectOpen(false);
                            setSearchJabatan("");
                          }}
                          className={`rounded-xl px-4 py-3 text-sm font-medium cursor-pointer transition-all mb-1 last:mb-0 ${
                            idJabatan === j.id.toString() 
                              ? "bg-primary text-white shadow-lg shadow-primary/20" 
                              : "hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:text-primary"
                          }`}
                        >
                          {j.jabatan}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Status Aktif</label>
              <select
                value={statusAktif ? "true" : "false"}
                onChange={(e) => setStatusAktif(e.target.value === "true")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-900/10 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20">
                {error}
              </div>
            )}

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
              Data Karyawan
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
              {karyawanList.length} Items Total
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 border-b border-slate-50 dark:border-zinc-800">
                <tr>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">No</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Nama</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Jabatan</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                {karyawanList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  karyawanList.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-5 font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">
                        {item.nama}
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700 group-hover:bg-white dark:group-hover:bg-primary/20 transition-all">
                          {item.jabatan?.jabatan || "N/A"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        {item.status_aktif ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-200">Aktif</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-200">Off</span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <button
                            onClick={() => setSelectedKaryawan(item)}
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-tertiary rounded-xl transition-all shadow-sm hover:shadow-tertiary/30"
                            title="Detail"
                          >
                            ℹ️
                          </button>
                          <button
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary rounded-xl transition-all shadow-sm hover:shadow-primary/30"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
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

      {/* ================= DETAIL MODAL ================= */}
      {selectedKaryawan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-zinc-900 animate-in zoom-in-95 duration-300">
            <div className="bg-primary p-8 text-white relative overflow-hidden">
               <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
               <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-tertiary/20 blur-xl" />
               
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold tracking-tight">{selectedKaryawan.nama}</h3>
                 <p className="text-white/70 text-sm font-medium mt-1">{selectedKaryawan.jabatan?.jabatan || "No Position"}</p>
               </div>
               
               <button 
                onClick={() => setSelectedKaryawan(null)}
                className="absolute right-6 top-6 h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
               >
                 ✕
               </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1.5 block">NIK</label>
                  <p className="text-sm font-bold text-slate-900 dark:text-white tracking-widest">{selectedKaryawan.nik}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1.5 block">Status</label>
                  <div>
                    {selectedKaryawan.status_aktif ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-wider border border-emerald-200">Aktif</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider border border-rose-200">Off</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-50 dark:border-zinc-800 pt-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 block">Email Address</label>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                   <span className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center text-indigo-500 text-xs">✉</span>
                   <p className="text-sm font-semibold">{selectedKaryawan.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 border-t border-slate-50 dark:border-zinc-800 pt-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 block">Birth Information</label>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {selectedKaryawan.tempat_lahir}, {new Date(selectedKaryawan.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 block">Office Location</label>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">Headquarters</p>
                </div>
              </div>
              
              <div className="border-t border-slate-50 dark:border-zinc-800 pt-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 block">Home Address</label>
                <div className="rounded-2xl bg-slate-50 dark:bg-zinc-800/50 p-4">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {selectedKaryawan.alamat || "No address provided"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 flex justify-end">
               <button 
                onClick={() => setSelectedKaryawan(null)}
                className="w-full rounded-2xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all dark:bg-zinc-900 dark:border-zinc-700 dark:text-slate-400 dark:hover:bg-zinc-800 shadow-sm"
               >
                 Close Detailed View
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}