import Link from "next/link";
import Image from "next/image";
import MenuSidebar from "@/components/MenuSidebar";

export default function ModulesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      {/* ------------------- LEFT - MODULE MENU SIDEBAR ------------------- */}
      <aside className="fixed left-0 top-0 flex h-screen min-w-[82px] max-w-[230px] flex-col bg-gradient-to-b from-gray-800 to-gray-900 p-4 text-slate-50 lg:w-[22%]">
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
      </aside>

      {/* ------------------- RIGHT - MAIN MODULE PAGE ------------------- */}
      <main className="ml-[82px] flex flex-1 flex-col overflow-y-auto transition-all lg:ml-[230px]">
        {children}
      </main>
    </div>
  );
}
