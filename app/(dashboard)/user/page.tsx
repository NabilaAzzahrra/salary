"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data user");
      setUserList(data.data || data);
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
      fetchUser();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";
    
    const method = editingId ? "PATCH" : "POST";

    const body: any = {
      name,
      email,
      role,
    };

    if (password || !editingId) {
      body.password = password;
    }

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} user`);
      }

      resetForm();
      fetchUser();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setEditingId(null);
  };

  const handleEdit = (item: User) => {
    setEditingId(item.id);
    setName(item.name);
    setEmail(item.email);
    setRole(item.role);
    setPassword(""); // Clear password during edit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus user");
      }
      fetchUser();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Management User</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Control system access and user permissions.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* ================= FORM (4/12) ================= */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {editingId ? "✏️" : "➕"}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit User" : "Tambah User"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Nama</label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                placeholder={editingId ? "Kosongkan jika tidak diubah" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
                required={!editingId}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="user">User / Karyawan</option>
                <option value="admin">Admin HRD</option>
              </select>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/10 dark:text-red-400 border border-red-100 dark:border-red-900/20">
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
                  onClick={resetForm}
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
              Data User
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
              {userList.length} Items Total
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 border-b border-slate-50 dark:border-zinc-800">
                <tr>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">No</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Nama</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Email</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Role</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                {userList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">
                      {loading ? "Menarik data..." : "No users found."}
                    </td>
                  </tr>
                ) : (
                  userList.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-5 font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </td>
                      <td className="px-8 py-5 text-slate-500 dark:text-slate-400">
                        {item.email}
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.role === 'admin' 
                          ? 'bg-amber-100 text-amber-600 border-amber-200' 
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {item.role}
                        </span>
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
