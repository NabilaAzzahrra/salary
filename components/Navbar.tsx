"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  // Format pathname for title
  const pageTitle = pathname.split("/").filter(Boolean).pop() || "Dashboard";
  const title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-md px-8 dark:bg-zinc-900/80 shadow-sm border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-primary dark:text-white tracking-tight">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">Administrator</p>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Payroll Management</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 flex items-center justify-center text-primary font-bold shadow-inner">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
