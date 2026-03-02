"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isPresensiOpen, setIsPresensiOpen] = useState(false);
  const [isCutiOpen, setIsCutiOpen] = useState(false);
  const [isGajiOpen, setIsGajiOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const isAdmin = role === "admin";

  // Initial mount and role fetching
  useEffect(() => {
    setMounted(true);
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setRole(user.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Auto-open menus if sub-item is active
  useEffect(() => {
    if (!mounted) return;

    const masterPaths = ["/divisi", "/jabatan", "/karyawan", "/user", "/konfigurasi"];
    if (masterPaths.includes(pathname)) setIsMasterOpen(true);

    const presensiPaths = ["/presensi/admin", "/presensi/user"];
    if (presensiPaths.some(path => pathname.startsWith(path))) setIsPresensiOpen(true);

    const cutiPaths = ["/cuti/pengajuan", "/cuti/riwayat", "/cuti/report"];
    if (cutiPaths.some(path => pathname.startsWith(path))) setIsCutiOpen(true);

    const gajiPaths = ["/gaji/proses", "/gaji/slip", "/gaji/report"];
    if (gajiPaths.some(path => pathname.startsWith(path))) setIsGajiOpen(true);
  }, [pathname, mounted]);

  // Role-based navigation items
  const presensiItems = isAdmin 
    ? [{ name: "Report Presensi", href: "/presensi/admin", icon: "fi-rr-document" }]
    : [{ name: "Kehadiran", href: "/presensi/user", icon: "fi-rr-user" }];

  const cutiItems = isAdmin
    ? [{ name: "Report Cuti", href: "/cuti/report", icon: "fi-rr-document" }]
    : [
        { name: "Form Pengajuan", href: "/cuti/pengajuan", icon: "fi-rr-request-quote" },
        { name: "Riwayat & Saldo Cuti", href: "/cuti/riwayat", icon: "fi-rr-calendar-lines" },
      ];

  const gajiItems = isAdmin
    ? [
        { name: "Proses Gaji", href: "/gaji/proses", icon: "fi-rr-calculator" },
        { name: "Report Gaji", href: "/gaji/report", icon: "fi-rr-document" },
      ]
    : [{ name: "Slip Gaji", href: "/gaji/slip", icon: "fi-rr-receipt" }];

  const masterItems = [
    { name: "Divisi", href: "/divisi", icon: "fi-rr-building" },
    { name: "Jabatan", href: "/jabatan", icon: "fi-rr-briefcase" },
    { name: "Karyawan", href: "/karyawan", icon: "fi-rr-users" },
    { name: "User", href: "/user", icon: "fi-rr-id-badge" },
    { name: "Konfigurasi", href: "/konfigurasi", icon: "fi-rr-settings-sliders" },
  ];

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-zinc-950 dark:border-zinc-900 shadow-sm fixed transition-all duration-300">
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 px-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 shadow-lg shadow-primary/30">
          <i className="fi fi-rr-leaf text-white text-xl"></i>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            NUSA<span className="text-primary">PAY</span>
          </h1>
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Payroll System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6 custom-scrollbar">
        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Main Menu</p>
        
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 group ${
            pathname === "/dashboard"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "text-slate-500 hover:bg-slate-50 hover:text-primary dark:text-zinc-400 dark:hover:bg-zinc-900"
          }`}
        >
          <i className="fi fi-rr-dashboard text-lg"></i>
          <span>Dashboard</span>
        </Link>

        {/* Master Dropdown - Only for Admin */}
        {isAdmin && (
          <div className="space-y-1">
            <button
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 group ${
                isMasterOpen || masterItems.some(i => i.href === pathname)
                  ? "bg-slate-50 text-primary dark:bg-zinc-900 dark:text-white"
                  : "text-slate-500 hover:bg-slate-50 hover:text-primary dark:text-zinc-400 dark:hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="fi fi-rr-database text-lg"></i>
                <span>Data Master</span>
              </div>
              <i className={`fi fi-rr-angle-small-down transition-transform duration-300 ${isMasterOpen ? "rotate-180" : ""}`}></i>
            </button>
            
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isMasterOpen ? "max-h-80 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
              {masterItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold transition-all duration-200 ${
                    pathname === item.href
                      ? "text-primary dark:text-white"
                      : "text-slate-400 hover:text-primary dark:text-zinc-500 dark:hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Presensi Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsPresensiOpen(!isPresensiOpen)}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 group ${
              isPresensiOpen || presensiItems.some(i => i.href === pathname)
                ? "bg-slate-50 text-primary dark:bg-zinc-900 dark:text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="fi fi-rr-calendar-check text-lg"></i>
              <span>Presensi</span>
            </div>
            <i className={`fi fi-rr-angle-small-down transition-transform duration-300 ${isPresensiOpen ? "rotate-180" : ""}`}></i>
          </button>
          
          <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isPresensiOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            {presensiItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold transition-all duration-200 ${
                  pathname === item.href
                    ? "text-primary dark:text-white"
                    : "text-slate-400 hover:text-primary dark:text-zinc-500 dark:hover:text-white"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Cuti Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsCutiOpen(!isCutiOpen)}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 group ${
              isCutiOpen || cutiItems.some(i => i.href === pathname)
                ? "bg-slate-50 text-primary dark:bg-zinc-900 dark:text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="fi fi-rr-calendar-minus text-lg"></i>
              <span>Cuti</span>
            </div>
            <i className={`fi fi-rr-angle-small-down transition-transform duration-300 ${isCutiOpen ? "rotate-180" : ""}`}></i>
          </button>
          
          <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isCutiOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            {cutiItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold transition-all duration-200 ${
                  pathname === item.href
                    ? "text-primary dark:text-white"
                    : "text-slate-400 hover:text-primary dark:text-zinc-500 dark:hover:text-white"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Gaji Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsGajiOpen(!isGajiOpen)}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 group ${
              isGajiOpen || gajiItems.some(i => i.href === pathname)
                ? "bg-slate-50 text-primary dark:bg-zinc-900 dark:text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="fi fi-rr-money-bill-wave text-lg"></i>
              <span>Gaji</span>
            </div>
            <i className={`fi fi-rr-angle-small-down transition-transform duration-300 ${isGajiOpen ? "rotate-180" : ""}`}></i>
          </button>
          
          <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isGajiOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            {gajiItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold transition-all duration-200 ${
                  pathname === item.href
                    ? "text-primary dark:text-white"
                    : "text-slate-400 hover:text-primary dark:text-zinc-500 dark:hover:text-white"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100 dark:border-zinc-900">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/sign-in";
          }}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all duration-200"
        >
          <i className="fi fi-rr-exit text-lg"></i>
          <span>Keluar Aplikasi</span>
        </button>
      </div>
    </div>
  );
}
