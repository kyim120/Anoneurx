import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((e, i) => (
          <ShowcaseCard
            key={e.id}
            index={i}
            title={e.name}
            description={e.description}
            icon={Cpu}
            category="Extension"
            status={`${e.installs} installs`}
          />
        ))}
      </div>
    </OSPage>
  );
};
export default OSVSCodeExtensions;
