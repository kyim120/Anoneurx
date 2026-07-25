import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((t, i) => (
          <ShowcaseCard
            key={t.id}
            index={i}
            title={t.name}
            description={t.description}
            icon={Layout}
            category={t.stack}
            tags={[t.stack]}
          />
        ))}
      </div>
    </OSPage>
  );
};
export default OSTemplates;
