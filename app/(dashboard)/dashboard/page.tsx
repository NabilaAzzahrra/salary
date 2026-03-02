"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setRole(user.role);
        setUserName(user.name || "User");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const isAdmin = role === "admin";

  const adminStats = [
    { name: "Total Karyawan", value: "124", icon: "👥", trend: "+12%" },
    { name: "Divisi", value: "8", icon: "🏢", trend: "Stable" },
    { name: "Payroll Bulan Ini", value: "Rp 450M", icon: "💰", trend: "+5%" },
    { name: "Pending Approval", value: "12", icon: "⏳", trend: "-2" },
  ];

  const userStats = [
    { name: "Kehadiran Bulan Ini", value: "22/24", icon: "📅", trend: "On Track" },
    { name: "Sisa Cuti", value: "8 Hari", icon: "🏖️", trend: "Stable" },
    { name: "Gaji Terakhir", value: "Rp 5.5M", icon: "💸", trend: "Paid" },
    { name: "Tugas Pending", value: "3", icon: "📝", trend: "Action Required" },
  ];

  const stats = isAdmin ? adminStats : userStats;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Welcome back, {userName}!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {isAdmin 
            ? "Here's what's happening with your payroll system today." 
            : "Here's your overview for this month."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="group rounded-3xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 
                stat.trend.startsWith('-') ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' : 
                'bg-slate-100 text-slate-600 dark:bg-zinc-800'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.name}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            {isAdmin ? "Recent Activities" : "Your Recent History"}
          </h3>
          <div className="space-y-5">
             {(isAdmin ? [1, 2, 3] : [1, 2]).map((i) => (
               <div key={i} className="flex items-center gap-4 group cursor-pointer">
                 <div className="h-12 w-12 rounded-2xl bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {isAdmin ? "📝" : "💳"}
                 </div>
                 <div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                     {isAdmin ? 'Updated Divisi "IT Support"' : "Gaji Bulan Januari Telah Dibayar"}
                   </p>
                   <p className="text-xs font-medium text-slate-400">{i * 2} hours ago</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="rounded-3xl bg-slate-50 p-8 border-2 border-dashed border-slate-200 dark:bg-zinc-900/50 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
           <div className="h-16 w-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-sm mb-4">
             {isAdmin ? "🚀" : "📢"}
           </div>
           <h4 className="font-bold text-slate-900 dark:text-white">
             {isAdmin ? "New Reports Coming Soon" : "Pengumuman Kantor"}
           </h4>
           <p className="text-slate-400 text-sm mt-1">
             {isAdmin 
               ? "We're building advanced analytics for your payroll." 
               : "Libur nasional jatuh pada tanggal 25 Maret."}
           </p>
        </div>
      </div>
    </div>
  );
}
