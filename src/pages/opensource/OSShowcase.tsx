import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { showcase } from "./data";
import { Sparkles, Rocket } from "lucide-react";

const OSShowcase = () => (
  <OSPage>
    <OSSectionHeader
      title="Showcase"
      subtitle="Real products the community has built using Anoneurx open source."
      icon={Sparkles}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {showcase.map((s, i) => (
        <ShowcaseCard
          key={s.id}
          index={i}
          title={s.name}
          description={s.description}
          icon={Rocket}
          category={s.author}
          status={`On ${s.project}`}
          tags={[s.project]}
        />
      ))}
    </div>
  </OSPage>
);
export default OSShowcase;
