import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { organizations } from "./data";
import { Building2, Users } from "lucide-react";

const OSOrganizations = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => organizations.filter((o) => `${o.name} ${o.description}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <OSPage>
      <OSSectionHeader
        title="Organizations"
        subtitle="Independent groups building and maintaining Anoneurx projects."
        search={q}
        onSearchChange={setQ}
        placeholder="Search organizations"
        icon={Building2}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((o, i) => (
          <ShowcaseCard
            key={o.id}
            index={i}
            title={o.name}
            description={o.description}
            icon={Users}
            category="Org"
            status={`${o.members} members`}
            tags={[`${o.projects} projects`]}
          />
        ))}
      </div>
    </OSPage>
  );
};
export default OSOrganizations;
