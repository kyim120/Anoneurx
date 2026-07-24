import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import OSCard, { Chip } from "./OSCard";
import { showcase } from "./data";
import { Sparkles, Rocket } from "lucide-react";

const OSShowcase = () => (
  <OSPage>
    <OSSectionHeader
      title="Showcase"
      subtitle="Real products the community has built using Anoneurx open source."
      icon={Sparkles}
    />
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {showcase.map((s) => (
        <OSCard
          key={s.id}
          title={s.name}
          description={s.description}
          icon={Rocket}
          meta={
            <>
              <Chip>{s.author}</Chip>
              <Chip>built on {s.project}</Chip>
            </>
          }
        />
      ))}
    </div>
  </OSPage>
);
export default OSShowcase;
