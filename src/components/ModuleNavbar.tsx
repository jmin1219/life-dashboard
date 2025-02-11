"use client";

import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";

const ModuleNavbar = ({
  navItems,
}: {
  navItems: { name: string; path: string }[];
}) => {
  const pathname = usePathname();

  return (
    <div className="mb-7 flex w-full items-center justify-center">
      <NavigationMenu className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-700 p-1 md:gap-4">
        <NavigationMenuList className="flex space-x-2">
          {navItems.map((item) => (
            <NavigationMenuItem
              key={item.name}
              className={`flex cursor-pointer items-center justify-center rounded-[10px] px-3 py-1 transition-all duration-300 ${pathname === item.path ? "bg-blue-500 text-slate-50 shadow-lg" : "text-slate-400 hover:bg-slate-600 hover:text-slate-50"}`}
            >
              <NavigationMenuLink href={item.path} className="flex text-center">
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default ModuleNavbar;
