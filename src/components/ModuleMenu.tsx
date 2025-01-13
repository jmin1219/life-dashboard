import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MODULES",
    items: [
      {
        icon: "/productivity-logo.png",
        label: "Productivity",
        href: "/productivity",
      },
      {
        icon: "/wealth-logo.png",
        label: "Wealth",
        href: "/wealth",
      },
      {
        icon: "/health-logo.png",
        label: "Health",
        href: "/health",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
      },
      {
        icon: "/settings.png",
        label: "Settings",
        href: "/settings",
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const ModuleMenu = () => {
  return (
    <div className="my-6 h-full text-sm flex flex-col justify-between p-3">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-center lg:justify-start gap-3 text-gray-500 py-2"
            >
              <Image src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ModuleMenu;
