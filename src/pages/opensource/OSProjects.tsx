import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { projects } from "./data";
import { FolderGit2, Code2 } from "lucide-react";

const OSProjects = () => {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<string>("All");
  const languages = ["All", ...Array.from(new Set(projects.map((p) => p.language)))];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (lang !== "All" && p.language !== lang) return false;
      if (q && !(`${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [q, lang]);

  return (
    <OSPage>
      <OSSectionHeader
        title="Projects"
        subtitle="Browse every open source project maintained by Anoneurx and the community."
        search={q}
        onSearchChange={setQ}
        placeholder="Search projects"
        icon={FolderGit2}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              lang === l
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                : "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <ShowcaseCard
            key={p.id}
            index={i}
            title={p.name}
            description={p.description}
            icon={Code2}
            category={p.language}
            status={`${(p.stars / 1000).toFixed(1)}k stars`}
            tags={p.tags}
            codeLink={`https://github.com/anoneurx/${p.id}`}
            liveLink={`/opensource/projects#${p.id}`}
            liveLabel="Details"
          />
        ))}
      </div>
      {filtered.length === 0 && <div className="py-16 text-center text-neutral-500">No projects match your filters.</div>}
    </OSPage>
  );
};

export default OSProjects;
