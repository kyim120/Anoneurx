import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import OSCard, { Chip } from "./OSCard";
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o) => (
          <OSCard
            key={o.id}
            title={o.name}
            description={o.description}
            icon={Users}
            meta={
              <>
                <Chip>{o.members} members</Chip>
                <Chip>{o.projects} projects</Chip>
              </>
            }
          />
        ))}
      </div>
    </OSPage>
  );
};
export default OSOrganizations;
