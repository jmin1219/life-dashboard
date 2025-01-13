"use client";

import {
  CircleDollarSign,
  CircleUser,
  Dumbbell,
  LogOut,
  Settings,
  Sunrise,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    group: "MODULES",
    items: [
      {
        icon: <Sunrise />,
        label: "Productivity",
        href: "/productivity",
      },
      {
        icon: <CircleDollarSign />,
        label: "Wealth",
        href: "/wealth",
      },
      {
        icon: <Dumbbell />,
        label: "Health",
        href: "/health",
      },
    ],
  },
  {
    group: "OTHER",
    items: [
      {
        icon: <CircleUser />,
        label: "Profile",
        href: "/profile",
      },
      {
        icon: <Settings />,
        label: "Settings",
        href: "/settings",
      },
      {
        icon: <LogOut />,
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const MenuSidebar = () => {
  const pathname = usePathname();

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
              className={`my-4 flex items-center justify-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 lg:justify-start ${pathname === item.href ? "bg-blue-500 text-slate-50 shadow-lg" : "text-slate-400 hover:bg-slate-700 hover:text-slate-50"}`}
            >
              <div>{item.icon}</div>
              <div className="hidden lg:block">{item.label}</div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuSidebar;
