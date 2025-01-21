import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  FolderTree as CategoryIcon,
  WalletCards as WalletCardsIcon,
  DollarSign as AmountIcon,
  SquareCheckBig as StatusIcon,
  Layers as TypeIcon,
} from "lucide-react";

const FiltersMenu = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      <span className="text-sm text-muted-foreground">FILTERS:</span>
      <Menubar className="flex gap-3 rounded-[8px] border-0">
        {/* ---------------- TYPR FILTER (Multi-select) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-4 py-2 hover:bg-slate-800">
            <TypeIcon size={20} />
            <span className="hidden text-base lg:block">Type</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- CATEGORY FILTER (Multi-select) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-4 py-2 hover:bg-slate-800">
            <CategoryIcon size={20} />
            <span className="hidden text-base lg:block">Category</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- PAYMENT METHOD FILTER (Multi-select) ----------------*/}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-4 py-2 hover:bg-slate-800">
            <WalletCardsIcon size={20} />
            <span className="hidden text-base lg:block">Payment Method</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- AMOUNT FILTER: Greater than or Less than Amount (Select + Input) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-4 py-2 hover:bg-slate-800">
            <AmountIcon size={20} />
            <span className="hidden text-base lg:block">Amount</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- PROCESSED FILTER (Select) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-4 py-2 hover:bg-slate-800">
            <StatusIcon size={20} />
            <span className="hidden text-base lg:block">Status</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default FiltersMenu;
