"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Upload,
  ScanLine,
  TrendingUp,
  FlaskConical,
  ShieldAlert,
  FileText,
  Brain,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "MRI Upload", href: "/mri-upload", icon: Upload },
  { name: "Segmentation", href: "/segmentation", icon: ScanLine },
  { name: "Growth Prediction", href: "/prediction", icon: TrendingUp },
  { name: "Treatment Simulation", href: "/simulation", icon: FlaskConical },
  { name: "Risk Score", href: "/risk", icon: ShieldAlert },
  { name: "Reports", href: "/reports", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[260px] flex-col bg-primary text-white">
      {/* Logo Area */}
      <div className="flex flex-col px-6 py-8">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold tracking-tight text-white">
            OncoVision
          </span>
        </div>
        <span className="mt-1 text-xs font-medium text-secondary">
          AI Tumor Intelligence
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-primary"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary" : "text-white/70 group-hover:text-white"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile User avatar placholder */}
      <div className="border-t border-white/10 p-4">
        <div className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 cursor-pointer">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
            <span className="text-xs font-semibold">DA</span>
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium">Dr. Admin</span>
          </div>
          <Settings className="h-5 w-5 text-white/50 group-hover:text-white/70" />
        </div>
      </div>
    </div>
  );
}
