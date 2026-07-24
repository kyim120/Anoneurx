import { Search, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  search?: string;
  onSearchChange?: (v: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  children?: ReactNode;
}

const OSSectionHeader = ({ title, subtitle, search, onSearchChange, placeholder, icon: Icon, children }: Props) => {
  return (
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-600 dark:from-indigo-400 dark:via-violet-400 dark:to-amber-400 bg-clip-text text-transparent">{title}</h1>
        </div>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onSearchChange && (
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-400" />
            <input
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder ?? "Search"}
              className="h-10 w-64 rounded-full border border-neutral-300 bg-white pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
            />
          </label>
        )}
        {children}
      </div>
    </header>
  );
};

export default OSSectionHeader;
