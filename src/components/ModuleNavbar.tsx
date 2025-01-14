"use client";

import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";

interface NavItems {
  name: string;
  path: string;
}

interface NavbarProps {
  navItems: NavItems[];
}

const ModuleNavbar: React.FC<NavbarProps> = ({ navItems }) => {
  const pathname = usePathname();

  return (
    <div className="mb-3 flex w-full items-center justify-center">
      <NavigationMenu className="rounded-full bg-slate-700 px-1.5 py-1">
        <NavigationMenuList className="flex space-x-3">
          {navItems.map((item) => (
            <NavigationMenuItem
              key={item.name}
              className={`flex cursor-pointer items-center justify-center rounded-full px-2.5 py-0.5 transition-all duration-300 ${pathname === item.path ? "bg-blue-500 text-slate-50 shadow-lg" : "text-slate-400 hover:bg-slate-600 hover:text-slate-50"}`}
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
