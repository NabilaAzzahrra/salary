"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  // Auto-open master if sub-item is active
  useEffect(() => {
    const masterPaths = ["/divisi", "/jabatan", "/karyawan", "/user", "/konfigurasi"];
    if (masterPaths.includes(pathname)) {
      setIsMasterOpen(true);
    }
  }, [pathname]);

  const masterItems = [
    { name: "Divisi", href: "/divisi", icon: "fi-rr-building" },
    { name: "Jabatan", href: "/jabatan", icon: "fi-rr-briefcase" },
    { name: "Karyawan", href: "/karyawan", icon: "fi-rr-users" },
    { name: "User", href: "/user", icon: "fi-rr-id-badge" },
    { name: "Konfigurasi", href: "/konfigurasi", icon: "fi-rr-settings-sliders" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r bg-primary px-4 py-8 text-white transition-transform lg:relative lg:translate-x-0 border-white/10 shadow-2xl custom-scrollbar overflow-y-auto">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-tertiary flex items-center justify-center font-bold text-white shadow-lg">S</div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Salary<span className="text-tertiary">App</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-1">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
            pathname === "/dashboard"
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <i className={`fi fi-rr-apps text-lg ${pathname === "/dashboard" ? "text-tertiary" : ""}`}></i>
          <span className="font-semibold">Dashboard</span>
        </Link>

        {/* Master Group */}
        <div className="space-y-1">
          <button
            onClick={() => setIsMasterOpen(!isMasterOpen)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isMasterOpen ? "text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <i className="fi fi-rr-database text-lg"></i>
            <span className="font-semibold">Master</span>
            <i className={`fi fi-rr-angle-small-down ml-auto transition-transform ${isMasterOpen ? "rotate-180" : ""}`}></i>
          </button>

          {isMasterOpen && (
            <div className="ml-4 border-l border-white/10 pl-2 space-y-1">
              {masterItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <i className={`fi ${item.icon} text-base ${isActive ? "text-tertiary" : ""}`}></i>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Other Modules */}
        <Link
          href="/presensi"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
            pathname === "/presensi"
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <i className="fi fi-rr-calendar-check text-lg"></i>
          <span className="font-semibold">Presensi</span>
        </Link>

        <Link
          href="/cuti"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
            pathname === "/cuti"
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <i className="fi fi-rr-calendar-minus text-lg"></i>
          <span className="font-semibold">Cuti</span>
        </Link>

        <Link
          href="/gaji"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
            pathname === "/gaji"
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <i className="fi fi-rr-money-bill-wave text-lg"></i>
          <span className="font-semibold">Gaji</span>
        </Link>
      </nav>

      <div className="mt-auto border-t border-white/10 pt-6">
        <button
          onClick={() => {
            document.cookie = "token=; path=/; max-age=0";
            localStorage.clear();
            window.location.href = "/sign-in";
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white/60 transition-all hover:bg-secondary/10 hover:text-secondary group"
        >
          <i className="fi fi-rr-exit text-lg group-hover:translate-x-1 transition-transform"></i>
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
