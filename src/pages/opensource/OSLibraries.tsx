import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { libraries } from "./data";
import { Library, BookOpen } from "lucide-react";

const OSLibraries = () => {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("All");
  const langs = ["All", ...Array.from(new Set(libraries.map((l) => l.language)))];
  const filtered = useMemo(
    () =>
      libraries.filter((l) => (lang === "All" || l.language === lang) && `${l.name} ${l.description}`.toLowerCase().includes(q.toLowerCase())),
    [q, lang]
  );
  return (
    <OSPage>
      <OSSectionHeader
        title="Libraries"
        subtitle="Reusable libraries you can drop into your project today."
        search={q}
        onSearchChange={setQ}
        icon={Library}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {langs.map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`rounded-full border px-3 py-1 text-xs ${lang === l ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900" : "border-neutral-300 dark:border-neutral-700"}`}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((l, i) => (
          <ShowcaseCard
            key={l.id}
            index={i}
            title={l.name}
            description={l.description}
            icon={BookOpen}
            category={l.language}
            status={`${l.downloads} dl`}
            tags={[l.language]}
            codeLink={`https://github.com/anoneurx/${l.id}`}
          />
        ))}
      </div>
    </OSPage>
  );
};
export default OSLibraries;
