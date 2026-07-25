import { useLocation, useParams, matchPath } from "react-router-dom";
import SEO from "./SEO";

/**
 * Site-wide SEO injector. Mounted once in PublicLayout, it looks up the current
 * pathname in the map below and injects a unique <SEO /> with title,
 * description, canonical, OG, Twitter and JSON-LD for that route.
 *
 * Pages that already render their own <SEO /> component simply override this
 * via react-helmet-async's dedupe on <title> / <meta name|property>.
 */

type Entry = {
  title: string;
  description: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
};

const SITE = "https://anoneurx.com";
const BREADCRUMB = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE}${it.item}`,
  })),
});

const SOFTWARE = (name: string, path: string, description: string, extra: object = {}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  url: `${SITE}${path}`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
  ...extra,
});

// Exact-path map. For dynamic routes we fall back to pattern matching below.
const map: Record<string, Entry> = {
  "/": {
    title: "Anoneurx — Innovative Software, OS, AI, Cloud & Open Source",
    description:
      "Anoneurx builds innovative software, operating systems, AI, cloud, and open source technologies — Black Wall, Nexora, Anoneurx Cloud, Pay and Research.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Anoneurx",
        url: SITE,
        logo: `${SITE}/assets/logo.svg`,
        sameAs: [],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Anoneurx",
        url: SITE,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE}/apps/browse?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  },
  "/about": { title: "About Anoneurx", description: "Anoneurx is a global software company shipping operating systems, AI, cloud and open source infrastructure for developers." },
  "/contact": { title: "Contact Anoneurx", description: "Get in touch with Anoneurx for partnerships, support, press or general enquiries." },
  "/team": { title: "Anoneurx Team", description: "Meet the engineers, researchers and designers building Anoneurx across the globe." },
  "/careers": { title: "Careers at Anoneurx", description: "Join Anoneurx — engineering, research, design and operations roles across our global teams." },
  "/careers/join": { title: "Join Anoneurx", description: "Apply to open Anoneurx roles and become part of our global engineering team." },
  "/careers/hackathon": { title: "Anoneurx Hackathon", description: "Compete in the Anoneurx Hackathon — global challenges, prizes and recruitment fast-track." },
  "/careers/join-dev-team": { title: "Join the Anoneurx Dev Team", description: "Apply to join the core Anoneurx development team." },
  "/careers/other-opportunities": { title: "Other Opportunities at Anoneurx", description: "Fellowships, grants and partnerships beyond full-time roles." },
  "/internships": { title: "Anoneurx Internships", description: "Paid, remote-friendly internships across engineering, research, design and product." },
  "/hackathon": { title: "Anoneurx Hackathon", description: "Register for the Anoneurx global hackathon and build something remarkable." },
  "/community": { title: "Anoneurx Community", description: "Events, forums, mentorship and leaderboards — the Anoneurx developer community." },
  "/community/events": { title: "Community Events", description: "Upcoming meetups, workshops and conferences from the Anoneurx community." },
  "/community/events/upcoming": { title: "Upcoming Community Events", description: "Every upcoming Anoneurx community event in one place." },
  "/community/events/past": { title: "Past Community Events", description: "Recaps and recordings of past Anoneurx community events." },
  "/community/events/host": { title: "Host an Anoneurx Event", description: "Run a local Anoneurx meetup, workshop or hackathon — request sponsorship and swag." },
  "/community/leaderboard": { title: "Community Leaderboard", description: "Top Anoneurx community contributors ranked by activity and impact." },
  "/community/mentorship": { title: "Mentorship Program", description: "Apply for the Anoneurx mentorship program and grow alongside experienced engineers." },
  "/community/forums": { title: "Community Forums", description: "Discuss code, releases, roadmaps and ideas with the Anoneurx community." },
  "/blogs": { title: "Anoneurx Blog", description: "Product updates, engineering deep-dives and community stories from Anoneurx." },
  "/blogs/all": { title: "All Articles — Anoneurx Blog", description: "The full archive of Anoneurx blog posts across engineering, research and product." },
  "/research": { title: "Anoneurx Research", description: "Applied research from Anoneurx across AI, systems, distributed compute and security." },
  "/view-in-journal": { title: "Research Journal — Anoneurx", description: "Browse published Anoneurx research papers in journal format." },
  "/strategic-kpis": { title: "Strategic KPIs — Anoneurx", description: "Anoneurx research strategy, milestones and KPIs." },
  "/opensource": {
    title: "Anoneurx Open Source — Projects, Libraries & Templates",
    description: "Explore Anoneurx open source — projects, libraries, packages, templates and VS Code extensions. Free forever, community-driven.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Anoneurx Open Source",
      url: `${SITE}/opensource`,
      description: "The Anoneurx open source ecosystem — projects, libraries, packages, templates and VS Code extensions.",
    },
  },
  "/opensource/about": { title: "About Anoneurx Open Source", description: "Why Anoneurx invests in open source and how the community is governed." },
  "/opensource/projects": { title: "Anoneurx Open Source Projects", description: "Every open source project maintained by Anoneurx and its community." },
  "/opensource/organizations": { title: "Open Source Organizations", description: "Organizations and working groups inside the Anoneurx open source ecosystem." },
  "/opensource/libraries": { title: "Open Source Libraries", description: "Reusable Anoneurx libraries you can drop into your project today." },
  "/opensource/packages": { title: "Open Source Packages", description: "Anoneurx packages across npm, cargo, pip and go registries." },
  "/opensource/templates": { title: "Open Source Templates", description: "Starter templates for every Anoneurx stack — CLI, web, edge and services." },
  "/opensource/vscode-extensions": { title: "VS Code Extensions", description: "Official Anoneurx VS Code extensions — language support, tokens and DevTools." },
  "/opensource/showcase": { title: "Showcase — Anoneurx Open Source", description: "Real products the community has built using Anoneurx open source projects." },
  "/opensource/roadmaps": { title: "Roadmaps — Anoneurx Open Source", description: "Public roadmaps for every major Anoneurx open source project." },
  "/opensource/releases": { title: "Releases — Anoneurx Open Source", description: "The latest releases and changelogs across Anoneurx open source." },
  "/opensource/discussions": { title: "Discussions — Anoneurx Open Source", description: "Community discussions, RFCs and support threads." },
  "/contributors": { title: "Anoneurx Contributors", description: "The engineers, designers and researchers who contribute to Anoneurx open source." },
  "/sponsors": { title: "Anoneurx Sponsors", description: "Companies and organizations that sponsor Anoneurx open source and community programs." },
  "/blackwall": {
    title: "Black Wall OS — Anoneurx Secure Operating System",
    description: "Black Wall is Anoneurx's privacy-first operating system: hardened Rust core, zero telemetry, blazing performance and blockchain-backed identity.",
    jsonLd: SOFTWARE("Black Wall OS", "/blackwall", "Privacy-first operating system with hardened kernel, zero telemetry and Rust core."),
  },
  "/blackwall/download": { title: "Download Black Wall OS", description: "Get Black Wall OS ISO images, checksums and installation guides." },
  "/blackwall/features": { title: "Black Wall OS Features", description: "Every feature of Black Wall OS — kernel, security, performance, DX." },
  "/blackwall/screenshots": { title: "Black Wall OS Screenshots", description: "Screenshots of the Black Wall desktop, terminal, installer and tooling." },
  "/blackwall/showcase": { title: "Black Wall Showcase", description: "Real hardware, real workloads — Black Wall in production." },
  "/blackwall/about": { title: "About Black Wall OS", description: "The mission, team and philosophy behind Black Wall OS." },
  "/blackwall/faq": { title: "Black Wall FAQ", description: "Frequently asked questions about Black Wall OS." },
  "/blackwall/architecture": { title: "Black Wall Architecture", description: "Kernel, userland and enclave architecture of Black Wall OS." },
  "/blackwall/security": { title: "Black Wall Security", description: "Security model, threat model and audits for Black Wall OS." },
  "/blackwall/performance": { title: "Black Wall Performance", description: "Boot times, memory footprint and workload benchmarks for Black Wall OS." },
  "/blackwall/server": {
    title: "Black Wall Server OS — Coming December 2026",
    description: "Black Wall Server OS — a hardened Anoneurx operating system for servers. Zero-trust, container-native, air-gap capable. Coming Dec 2026.",
    jsonLd: SOFTWARE("Black Wall Server OS", "/blackwall/server", "Hardened server operating system by Anoneurx. Zero-trust, container-native. Coming December 2026.", {
      releaseDate: "2026-12",
      applicationSubCategory: "ServerApplication",
    }),
  },
  "/nexora": { title: "Nexora — AI-Augmented Private Browser", description: "Nexora is the fast, private, AI-augmented browser from Anoneurx.", jsonLd: SOFTWARE("Nexora Browser", "/nexora", "Fast, private, AI-augmented browser from Anoneurx.") },
  "/nexora/download": { title: "Download Nexora Browser", description: "Download Nexora for macOS, Windows and Linux." },
  "/nexora/features": { title: "Nexora Features", description: "Every feature in Nexora — AI, privacy, performance and productivity." },
  "/nexora/screenshots": { title: "Nexora Screenshots", description: "Screenshots of the Nexora browser interface." },
  "/nexora/about": { title: "About Nexora", description: "The mission and roadmap behind Nexora." },
  "/nexora/faq": { title: "Nexora FAQ", description: "Frequently asked questions about Nexora." },
  "/nexora/docs": { title: "Nexora Documentation", description: "Guides, references and API docs for Nexora." },
  "/nexora/changelog": { title: "Nexora Changelog", description: "Release notes for every Nexora version." },
  "/nexora/community": { title: "Nexora Community", description: "Join the Nexora community — forums, chat and events." },
  "/nexora/help": { title: "Nexora Help Center", description: "Troubleshooting, setup and support for Nexora." },
  "/nexora/privacy": { title: "Nexora Privacy Policy", description: "How Nexora protects your data — the privacy policy in full." },
  "/nexora/terms": { title: "Nexora Terms of Service", description: "The terms of service for using Nexora." },
  "/nexora/security": { title: "Nexora Security", description: "The Nexora security model, disclosures and bug bounty." },
  "/nexora/compare": { title: "Nexora vs Other Browsers", description: "How Nexora stacks up against Chrome, Firefox, Edge, Brave and Safari." },
  "/nexora/developers": { title: "Nexora for Developers", description: "Build extensions and web experiences for Nexora." },
  "/nexora/blog": { title: "Nexora Blog", description: "Product updates and engineering deep-dives from the Nexora team." },
  "/nexora-ai": { title: "Nexora AI", description: "The Nexora AI assistant — private, local and lightning fast." },
  "/switch-to-nexora": { title: "Switch to Nexora", description: "Import your bookmarks, history and passwords from any browser in one click." },
  "/why-nexora": { title: "Why Nexora", description: "The four reasons developers switch to Nexora." },
  "/atlas": { title: "ATLAS Language — Anoneurx", description: "ATLAS is Anoneurx's systems programming language with memory safety and zero-cost abstractions." },
  "/apps": { title: "Anoneurx Apps — Discover Powerful Apps", description: "The Anoneurx apps marketplace — curated apps from global developers, malware scanned and privacy focused.", jsonLd: SOFTWARE("Anoneurx Apps", "/apps", "Curated apps marketplace by Anoneurx.") },
  "/apps/browse": { title: "Browse Apps — Anoneurx", description: "Browse every app on the Anoneurx marketplace." },
  "/apps/categories": { title: "App Categories — Anoneurx", description: "Discover apps by category on the Anoneurx marketplace." },
  "/apps/developers": { title: "Anoneurx Developers", description: "Ship your app on Anoneurx — publishing, revenue share and analytics." },
  "/apps/about": { title: "About Anoneurx Apps", description: "The story behind the Anoneurx apps marketplace." },
  "/apps/submit": { title: "Submit an App — Anoneurx", description: "Submit your app to the Anoneurx marketplace." },
  "/pay": { title: "Anoneurx Pay — Modern Digital Banking", description: "Anoneurx Pay is a global, modern digital banking platform for individuals and businesses.", jsonLd: SOFTWARE("Anoneurx Pay", "/pay", "Global modern digital banking platform.") },
  "/pay/features": { title: "Anoneurx Pay Features", description: "Every feature of Anoneurx Pay — accounts, cards, transfers, savings and business tools." },
  "/pay/security": { title: "Anoneurx Pay Security", description: "How Anoneurx Pay protects your money — encryption, fraud detection and compliance." },
  "/pay/about": { title: "About Anoneurx Pay", description: "The mission and licences behind Anoneurx Pay." },
  "/pay/download": { title: "Download Anoneurx Pay", description: "Download the Anoneurx Pay app for iOS and Android." },
  "/pay/signup": { title: "Open an Anoneurx Pay Account", description: "Open a personal or business Anoneurx Pay account online in minutes." },
  "/pay/faq": { title: "Anoneurx Pay FAQ", description: "Frequently asked questions about Anoneurx Pay." },
  "/checkout": { title: "Checkout — Anoneurx", description: "Securely complete your payment on Anoneurx." },
  "/cloud": { title: "Anoneurx Cloud — Global Cloud Infrastructure", description: "Anoneurx Cloud — VMs, GPU servers, Kubernetes, object storage and CDN across global regions.", jsonLd: SOFTWARE("Anoneurx Cloud", "/cloud", "Global cloud infrastructure — compute, storage, networking.") },
  "/cloud/products": { title: "Anoneurx Cloud Products", description: "Every Anoneurx Cloud product — compute, storage, networking, AI and databases." },
  "/cloud/pricing": { title: "Anoneurx Cloud Pricing", description: "Transparent, predictable pricing across every Anoneurx Cloud product." },
  "/cloud/docs": { title: "Anoneurx Cloud Docs", description: "Guides, references and API docs for Anoneurx Cloud." },
  "/cloud/status": { title: "Anoneurx Cloud Status", description: "Live status of every Anoneurx Cloud region and service." },
  "/cloud/security": { title: "Anoneurx Cloud Security", description: "Compliance, certifications and security posture of Anoneurx Cloud." },
  "/cloud/compute/virtual-machines": { title: "Virtual Machines — Anoneurx Cloud", description: "High-performance VMs across global regions on Anoneurx Cloud." },
  "/cloud/compute/gpu-servers": { title: "GPU Servers — Anoneurx Cloud", description: "NVIDIA and AMD GPU servers for AI training and inference on Anoneurx Cloud." },
  "/cloud/compute/bare-metal": { title: "Bare Metal Servers — Anoneurx Cloud", description: "Dedicated bare metal servers with hourly billing on Anoneurx Cloud." },
  "/cloud/compute/kubernetes": { title: "Managed Kubernetes — Anoneurx Cloud", description: "Production-ready managed Kubernetes on Anoneurx Cloud." },
  "/cloud/storage/object": { title: "Object Storage — Anoneurx Cloud", description: "S3-compatible object storage on Anoneurx Cloud." },
  "/cloud/storage/block": { title: "Block Storage — Anoneurx Cloud", description: "High-performance NVMe block storage on Anoneurx Cloud." },
  "/cloud/storage/backup": { title: "Backup Vault — Anoneurx Cloud", description: "Encrypted backup vault with instant restore on Anoneurx Cloud." },
  "/cloud/storage/archive": { title: "Archive Storage — Anoneurx Cloud", description: "Cold archive storage at the best per-TB price on Anoneurx Cloud." },
  "/artificial-intelligence": { title: "Artificial Intelligence — Anoneurx", description: "Anoneurx AI — research, applied models, edge inference and enterprise deployments." },
  "/robotics-systems": { title: "Robotics Systems — Anoneurx", description: "Robotics research and platforms from Anoneurx — perception, control and autonomy." },
  "/space-projects": { title: "Space Projects — Anoneurx", description: "Anoneurx space projects — satellite imagery, ground stations and edge compute in orbit." },
  "/web-development": { title: "Web Development — Anoneurx", description: "Anoneurx builds high-performance web applications, platforms and design systems." },
  "/blockchain-systems": { title: "Blockchain Systems — Anoneurx", description: "Anoneurx builds blockchain infrastructure and applied cryptography systems." },
  "/operating-systems": { title: "Operating Systems — Anoneurx", description: "Every operating system from Anoneurx — Black Wall, Black Wall Server and more." },
  "/investment-opportunities": { title: "Investment Opportunities — Anoneurx", description: "Explore investment opportunities across the Anoneurx portfolio." },
  "/partnership-inquiry": { title: "Partnership Inquiry — Anoneurx", description: "Submit a partnership inquiry to Anoneurx." },
  "/collaboration": { title: "Collaborate with Anoneurx", description: "Research, product and enterprise collaboration with Anoneurx." },
  "/collaboration/form": { title: "Collaboration Form — Anoneurx", description: "Start a collaboration with Anoneurx." },
  "/university": { title: "Anoneurx University", description: "Anoneurx University — degree programmes, certificates and short courses for the next generation of engineers." },
  "/courses": { title: "Courses — Anoneurx University", description: "Every course from Anoneurx University — engineering, AI, systems, design and more." },
  "/professors": { title: "Professors — Anoneurx University", description: "Meet the faculty behind Anoneurx University." },
  "/notes": { title: "Notes — Anoneurx", description: "Study notes, cheatsheets and reference material curated by Anoneurx." },
  "/arcadeum": { title: "Anoneurx Arcadeum", description: "Anoneurx Arcadeum — indie games, engines and creator tools." },
  "/privacy": { title: "Privacy Policy — Anoneurx", description: "How Anoneurx protects your data — the privacy policy in full." },
  "/terms": { title: "Terms of Service — Anoneurx", description: "The terms of service for using Anoneurx products." },
  "/cookies": { title: "Cookie Policy — Anoneurx", description: "How Anoneurx uses cookies on its websites and apps." },
  "/auth": { title: "Sign in — Anoneurx", description: "Sign in to Anoneurx." },
  "/login": { title: "Log in — Anoneurx", description: "Log in to Anoneurx." },
  "/signup": { title: "Create your Anoneurx account", description: "Create a free Anoneurx account." },
  "/reportbug": { title: "Report a Bug — Anoneurx", description: "Report a bug in any Anoneurx product." },
};

// Pattern-based fallbacks for dynamic routes
const patterns: { pattern: string; build: (params: Record<string, string | undefined>) => Entry }[] = [
  { pattern: "/blog/:id", build: (p) => ({ title: `Blog — ${p.id}`, description: "Read this article on the Anoneurx blog.", type: "article" }) },
  { pattern: "/read-paper/:id", build: (p) => ({ title: `Research Paper — ${p.id}`, description: "Read this paper from Anoneurx Research.", type: "article" }) },
  { pattern: "/team/:name", build: (p) => ({ title: `${p.name} — Anoneurx Team`, description: `Team member profile: ${p.name}.` }) },
  { pattern: "/team/:dept/:name", build: (p) => ({ title: `${p.name} — Anoneurx ${p.dept}`, description: `${p.name} in the ${p.dept} team at Anoneurx.` }) },
  { pattern: "/courses/:courseId", build: (p) => ({ title: `Course — ${p.courseId}`, description: `Details, syllabus and enrolment for the ${p.courseId} course at Anoneurx University.` }) },
  { pattern: "/courses/:courseId/enroll", build: (p) => ({ title: `Enroll — ${p.courseId}`, description: `Enroll in the ${p.courseId} course at Anoneurx University.` }) },
  { pattern: "/community/events/:eventId", build: (p) => ({ title: `Event — ${p.eventId}`, description: `Anoneurx community event: ${p.eventId}.` }) },
  { pattern: "/community/events/past/:eventId", build: (p) => ({ title: `Past Event — ${p.eventId}`, description: `Recap of past Anoneurx community event: ${p.eventId}.` }) },
  { pattern: "/community/forums/:categoryId", build: (p) => ({ title: `Forum — ${p.categoryId}`, description: `Discussions in the ${p.categoryId} forum category.` }) },
  { pattern: "/docs/project/:projectId", build: (p) => ({ title: `Docs — ${p.projectId}`, description: `Documentation for the ${p.projectId} project.` }) },
  { pattern: "/challenge/:challengeId", build: (p) => ({ title: `Challenge — ${p.challengeId}`, description: `Details for the ${p.challengeId} community challenge.` }) },
  { pattern: "/reportbug/:product", build: (p) => ({ title: `Report a Bug — ${p.product}`, description: `Report a bug in ${p.product}.` }) },
];

const RouteSEO = () => {
  const { pathname } = useLocation();

  const exact = map[pathname];
  if (exact) {
    return <SEO title={exact.title} description={exact.description} path={pathname} type={exact.type} jsonLd={exact.jsonLd} />;
  }

  for (const p of patterns) {
    const match = matchPath(p.pattern, pathname);
    if (match) {
      const entry = p.build(match.params as Record<string, string | undefined>);
      return <SEO title={entry.title} description={entry.description} path={pathname} type={entry.type} jsonLd={entry.jsonLd} />;
    }
  }

  // Fallback — still unique per pathname
  return <SEO title={undefined} description={undefined} path={pathname} />;
};

export default RouteSEO;