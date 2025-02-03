"use client";

import {
  CircleDollarSign as WealthIcon,
  CircleUser as ProfileIcon,
  Dumbbell as FitnessIcon,
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  Sunrise as ProductivityIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    group: "MODULES",
    items: [
      {
        icon: <ProductivityIcon />,
        label: "Productivity",
        href: "/productivity",
      },
      {
        icon: <WealthIcon />,
        label: "Wealth",
        href: "/wealth",
      },
      {
        icon: <FitnessIcon />,
        label: "Fitness",
        href: "/fitness",
      },
    ],
  },
  {
    group: "OTHER",
    items: [
      {
        icon: <ProfileIcon />,
        label: "Profile",
        href: "/profile",
      },
      {
        icon: <SettingsIcon />,
        label: "Settings",
        href: "/settings",
      },
      {
        icon: <LogOutIcon />,
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const MenuSidebar = () => {
  const pathname = usePathname();
  // TODO: Add current date between logo and modules
  return (
    <div className="mb-12 mt-10 flex h-full flex-col justify-between">
      {menuItems.map((group) => (
        <div key={group.group}>
          <span className="my-2 hidden font-light text-slate-500 lg:block">
            {group.group}
          </span>
          {group.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative my-4 flex items-center justify-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 lg:justify-start ${pathname.startsWith(item.href) ? "bg-blue-500 text-slate-50 shadow-lg" : "text-slate-400 hover:bg-slate-600 hover:text-slate-50"}`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-black/10 opacity-0 transition-all duration-300 ${pathname.startsWith(item.href) ? "opacity-100" : "group-hover:opacity-100"}`}
              ></div>
              <div
                className={`relative z-10 rounded-2xl text-blue-300 group-hover:text-slate-50 ${pathname.startsWith(item.href) ? "text-slate-50" : ""}`}
              >
                {item.icon}
              </div>
              <div className="relative z-10 hidden lg:block">{item.label}</div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuSidebar;
