"use client";

import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import Link from "next/link";

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
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.path}>
              <NavigationMenuLink>{item.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ModuleNavbar;
