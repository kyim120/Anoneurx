import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import OSCard, { Chip } from "./OSCard";
import { extensions } from "./data";
import { SquareTerminal, Cpu } from "lucide-react";

const OSVSCodeExtensions = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => extensions.filter((e) => `${e.name} ${e.description}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <OSPage>
      <OSSectionHeader
        title="VS Code Extensions"
        subtitle="Editor extensions to accelerate development on the Anoneurx stack."
        search={q}
        onSearchChange={setQ}
        icon={SquareTerminal}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <OSCard key={e.id} title={e.name} description={e.description} icon={Cpu} meta={<Chip>{e.installs} installs</Chip>} />
        ))}
      </div>
    </OSPage>
  );
};
export default OSVSCodeExtensions;
