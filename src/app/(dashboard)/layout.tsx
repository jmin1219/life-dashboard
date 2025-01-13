import Link from "next/link";
import Image from "next/image";
import MenuSidebar from "@/components/MenuSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* ------------------- LEFT - MODULE MENU SIDEBAR ------------------- */}
      <div className="flex max-w-[230px] flex-col bg-gradient-to-b from-gray-800 to-gray-900 p-4 text-slate-50 md:w-[8%] lg:w-[22%]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-xl p-2 lg:justify-start"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={34}
            height={34}
            className="rounded-lg"
          />
          <span className="hidden text-lg font-semibold lg:block">
            LifeDashboard
          </span>
        </Link>
        <MenuSidebar />
      </div>

      {/* ------------------- RIGHT - MAIN MODULE PAGE ------------------- */}
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}
