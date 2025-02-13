import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useIconPicker } from "./icon-picker";

const IconPicker = ({ onChange }: { onChange: (icon: string) => void }) => {
  const { search, setSearch, icons } = useIconPicker();

  return (
    <div className="relative h-[450px]">
      <Input
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="my-2 flex h-full max-h-[400px] flex-wrap items-center gap-2 overflow-y-scroll">
        {icons.map(({ name, Component }) => (
          <Button
            key={name}
            type="button"
            role="button"
            onClick={() => onChange(name)}
            className="bg-slate-800 text-white hover:bg-slate-500"
          >
            <Component className="h-12 w-12" />
            <span className="sr-only">{name}</span>
          </Button>
        ))}
        {icons.length === 0 && (
          <div className="col-span-full flex grow flex-col items-center justify-center gap-2 text-center">
            <p>No icons found...</p>
            <Button onClick={() => setSearch("")} variant="ghost">
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconPicker;
