import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import OSCard, { Chip } from "./OSCard";
import { packages } from "./data";
import { Boxes, Package } from "lucide-react";

const OSPackages = () => {
  const [q, setQ] = useState("");
  const [reg, setReg] = useState<string>("All");
  const registries = ["All", "npm", "cargo", "pip", "go"];
  const filtered = useMemo(
    () =>
      packages.filter(
        (p) => (reg === "All" || p.registry === reg) && `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())
      ),
    [q, reg]
  );
  return (
    <OSPage>
      <OSSectionHeader
        title="Packages"
        subtitle="Published packages across npm, cargo, pip, and Go module registries."
        search={q}
        onSearchChange={setQ}
        icon={Boxes}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {registries.map((r) => (
          <button key={r} onClick={() => setReg(r)} className={`rounded-full border px-3 py-1 text-xs ${reg === r ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900" : "border-neutral-300 dark:border-neutral-700"}`}>{r}</button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <OSCard
            key={p.id}
            title={p.name}
            description={p.description}
            icon={Package}
            meta={
              <>
                <Chip>{p.registry}</Chip>
                <Chip>v{p.version}</Chip>
              </>
            }
          />
        ))}
      </div>
    </OSPage>
  );
};
export default OSPackages;
