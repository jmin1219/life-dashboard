import Link from "next/link";
import Image from "next/image";
import ModuleMenu from "@/components/ModuleMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT - MODULE MENU SIDEBAR */}
      <div className="w-1/5 md:w-[8%] lg:w-[16%] xl:w-1/5 p-4 flex flex-col">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-1"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">LifeDashboard</span>
        </Link>
        <ModuleMenu />
      </div>
      {/* RIGHT - MAIN MODULE PAGE */}
      <div className="w-4/5 md:w-[92%] lg:w-[84%] xl:w-4/5 overflow-scroll">
        {children}
      </div>
    </div>
  );
}
