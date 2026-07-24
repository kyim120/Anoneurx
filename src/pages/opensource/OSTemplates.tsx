import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import OSCard, { Chip } from "./OSCard";
import { templates } from "./data";
import { LayoutGrid, Layout } from "lucide-react";

const OSTemplates = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => templates.filter((t) => `${t.name} ${t.stack} ${t.description}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <OSPage>
      <OSSectionHeader
        title="Templates"
        subtitle="Production-grade starter templates for the Anoneurx stack."
        search={q}
        onSearchChange={setQ}
        icon={LayoutGrid}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <OSCard key={t.id} title={t.name} description={t.description} icon={Layout} meta={<Chip>{t.stack}</Chip>} />
        ))}
      </div>
    </OSPage>
  );
};
export default OSTemplates;
