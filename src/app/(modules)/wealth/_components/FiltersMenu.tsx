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
  // TODO: Add dropdown items
  return (
    <div className="inline-flex items-center justify-center rounded-xl border-t border-slate-700 bg-gray-900 px-5">
      <span className="mr-8 text-xs text-muted-foreground">FILTERS:</span>
      <Menubar className="flex gap-3 rounded-[8px] border-0 bg-gray-900">
        {/* ---------------- TYPR FILTER (Multi-select) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-3 py-1 hover:bg-slate-600">
            <TypeIcon size={15} />
            <span className="hidden text-sm lg:block">Type</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- CATEGORY FILTER (Multi-select) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-2 py-1 hover:bg-slate-600">
            <CategoryIcon size={15} />
            <span className="hidden text-sm lg:block">Category</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- PAYMENT METHOD FILTER (Multi-select) ----------------*/}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-2 py-1 hover:bg-slate-600">
            <WalletCardsIcon size={15} />
            <span className="hidden text-sm lg:block">Payment Method</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- AMOUNT FILTER: Greater than or Less than Amount (Select + Input) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-2 py-1 hover:bg-slate-600">
            <AmountIcon size={15} />
            <span className="hidden text-sm lg:block">Amount</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
        {/* ---------------- PROCESSED FILTER (Select) ---------------- */}
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer gap-2 rounded-[6px] px-2 py-1 hover:bg-slate-600">
            <StatusIcon size={15} />
            <span className="hidden text-sm lg:block">Status</span>
          </MenubarTrigger>
          <MenubarContent></MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default FiltersMenu;
