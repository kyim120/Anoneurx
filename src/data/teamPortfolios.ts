export interface TimelineItem { year: string; title: string; description: string; }
export interface ExperienceItem { company: string; role: string; period: string; description: string; responsibilities: string[]; }
export interface ProjectItem { title: string; description: string; tech: string[]; image?: string; demo?: string; github?: string; }
export interface AchievementItem { title: string; year: string; org: string; }
export interface EducationItem { degree: string; school: string; period: string; }
export interface PublicationItem { title: string; venue: string; year: string; link?: string; }
export interface TestimonialItem { name: string; role: string; quote: string; avatar?: string; }
export interface FaqItem { q: string; a: string; }

export interface TeamPortfolio {
  slug: string;
  department: string;
  name: string;
  title: string;
  tagline: string;
  photo: string;
  location: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  resumeUrl?: string;
  about: {
    bio: string;
    summary: string;
    interests: string[];
    mission: string;
  };
  experience: ExperienceItem[];
  skills: {
    core: string[];
    languages: string[];
    frameworks: string[];
    tools: string[];
    platforms: string[];
    databases: string[];
    cloud: string[];
  };
  services: { title: string; description: string; icon?: string }[];
  projects: ProjectItem[];
  openSource: { name: string; description: string; stars?: number; url?: string }[];
  achievements: AchievementItem[];
  education: EducationItem[];
  publications: PublicationItem[];
  leadership: { title: string; description: string }[];
  testimonials: TestimonialItem[];
  stats: { label: string; value: string }[];
  timeline: TimelineItem[];
  media: { type: 'image' | 'video'; url: string; caption?: string }[];
  availability: { label: string; status: 'open' | 'limited' | 'closed' }[];
  faqs: FaqItem[];
  currentFocus: string[];
  nowBuilding: string[];
  ventures: { name: string; description: string }[];
  philosophy: string;
  funFacts: string[];
  favoriteTech: string[];
  books: { title: string; author: string }[];
  talks: { title: string; venue: string; year: string }[];
}

export const teamPortfolios: Record<string, TeamPortfolio> = {
  muhammadqasim: {
    slug: 'muhammadqasim',
    department: 'dep',
    name: 'Muhammad Qasim',
    title: 'Founder & Systems Architect',
    tagline: 'Building operating systems, programming languages, and the future of computing.',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80',
    location: 'Islamabad, Pakistan',
    email: 'qasim@anoneurx.com',
    linkedin: 'https://linkedin.com/in/muhammadqasim',
    github: 'https://github.com/anoneurx',
    twitter: 'https://twitter.com/anoneurx',
    website: 'https://anoneurx.com',
    resumeUrl: '#',
    about: {
      bio: 'Founder of Anoneurx, a deep-tech lab building secure operating systems, AI infrastructure, and custom programming languages. Passionate about low-level systems, distributed architectures, and the craft of software.',
      summary: '7+ years architecting full-stack platforms, distributed systems, and OS-level tooling. Led teams shipping products used by thousands.',
      interests: ['Operating Systems', 'Compilers', 'AI Infrastructure', 'Cryptography', 'Distributed Systems'],
      mission: 'Empower developers and organizations with sovereign, secure, and performant computing primitives.',
    },
    experience: [
      { company: 'Anoneurx', role: 'Founder & CEO', period: '2023 — Present', description: 'Leading product, engineering, and research across OS, browser, banking, and cloud divisions.', responsibilities: ['Vision & product strategy', 'Architecture reviews', 'Hiring & mentoring', 'Investor relations'] },
      { company: 'Independent', role: 'Systems Engineer', period: '2020 — 2023', description: 'Built compilers, low-level tooling, and high-throughput backend services for clients across fintech and AI.', responsibilities: ['Compiler design', 'Rust/Go backends', 'Performance engineering'] },
    ],
    skills: {
      core: ['Systems Design', 'Compilers', 'Distributed Systems', 'Security'],
      languages: ['Rust', 'TypeScript', 'Go', 'C', 'Python', 'Assembly'],
      frameworks: ['React', 'Axum', 'Tokio', 'Node.js', 'Vite'],
      tools: ['Git', 'Docker', 'Kubernetes', 'Nix', 'LLVM'],
      platforms: ['Linux', 'WebAssembly', 'WebGPU'],
      databases: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite'],
      cloud: ['AWS', 'GCP', 'Cloudflare', 'Self-hosted'],
    },
    services: [
      { title: 'Consulting', description: 'Architecture reviews and system design audits.' },
      { title: 'Development', description: 'Full-stack delivery from infra to UI.' },
      { title: 'Research', description: 'Applied research in OS, compilers, and AI.' },
      { title: 'Management', description: 'Fractional CTO and engineering leadership.' },
    ],
    projects: [
      { title: 'Blackwall OS', description: 'A hardened Linux distribution focused on privacy and developer ergonomics.', tech: ['Rust', 'Linux', 'Wayland'], image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80', demo: '/blackwall', github: 'https://github.com/anoneurx' },
      { title: 'ATLAS Language', description: 'A modern UI language for GPU-accelerated apps.', tech: ['Rust', 'WebGPU', 'Compilers'], image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80', demo: '/atlas' },
      { title: 'Nexora Browser', description: 'A privacy-first browser with built-in zero-trust networking.', tech: ['Chromium', 'Rust', 'TypeScript'], image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80', demo: '/nexora' },
    ],
    openSource: [
      { name: 'atlas-lang', description: 'GPU-accelerated UI language', stars: 1240, url: 'https://github.com/anoneurx/atlas' },
      { name: 'blackwall', description: 'Hardened Linux distro', stars: 870 },
    ],
    achievements: [
      { title: 'Hackathon Grand Prize', year: '2024', org: 'Global DevFest' },
      { title: 'Open Source Innovator', year: '2024', org: 'DevConf' },
      { title: 'Rust Foundation Grant', year: '2025', org: 'Rust Foundation' },
    ],
    education: [
      { degree: 'BSc Computer Science', school: 'NUST', period: '2018 — 2022' },
      { degree: 'Self-directed Systems Research', school: 'Independent', period: '2022 — Present' },
    ],
    publications: [
      { title: 'Designing Sovereign Operating Systems', venue: 'Anoneurx Journal', year: '2025' },
      { title: 'A Practical Approach to GPU UI Compilers', venue: 'arXiv', year: '2025' },
    ],
    leadership: [
      { title: 'Mentor', description: 'Mentored 30+ engineers across internships and fellowships.' },
      { title: 'Speaker', description: 'Spoke at multiple global developer conferences on OS and AI.' },
      { title: 'Community', description: 'Organizes Anoneurx open-source community meetups.' },
    ],
    testimonials: [
      { name: 'Sarah Lee', role: 'CTO, FintechCo', quote: 'Qasim is one of the rare engineers who can move seamlessly from kernel to UI.' },
      { name: 'Aman Verma', role: 'Engineering Lead', quote: 'Exceptional clarity of thought and shipping speed. A force multiplier.' },
    ],
    stats: [
      { label: 'Years of Experience', value: '7+' },
      { label: 'Projects Shipped', value: '40+' },
      { label: 'Open Source Stars', value: '2.1k' },
      { label: 'Contributions', value: '3.4k' },
    ],
    timeline: [
      { year: '2018', title: 'Started CS Journey', description: 'Began formal computer science studies at NUST.' },
      { year: '2020', title: 'First Systems Project', description: 'Built first compiler prototype in Rust.' },
      { year: '2023', title: 'Founded Anoneurx', description: 'Started Anoneurx as a deep-tech research lab.' },
      { year: '2025', title: 'Launched Blackwall & ATLAS', description: 'Public releases of OS and language.' },
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80', caption: 'Talk at DevConf 2024' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80', caption: 'Lab setup' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', caption: 'Building Blackwall' },
    ],
    availability: [
      { label: 'Open Source', status: 'open' },
      { label: 'Speaking', status: 'open' },
      { label: 'Consulting', status: 'limited' },
      { label: 'Freelance', status: 'closed' },
    ],
    faqs: [
      { q: 'What stack do you primarily work in?', a: 'Rust for systems, TypeScript/React for UI, and PostgreSQL for data.' },
      { q: 'Do you take on freelance projects?', a: 'Rarely. Most time goes to Anoneurx, but selective consulting is open.' },
      { q: 'How can I collaborate?', a: 'Reach out via email or through the careers portal for structured opportunities.' },
    ],
    currentFocus: ['Blackwall OS v2', 'ATLAS 0.3 compiler', 'Anoneurx Cloud'],
    nowBuilding: ['ATLAS GPU renderer', 'Blackwall package manager', 'Sovereign auth gateway'],
    ventures: [
      { name: 'Anoneurx', description: 'Deep-tech research lab and product studio.' },
      { name: 'Blackwall', description: 'Hardened operating system.' },
      { name: 'Nexora', description: 'Privacy-first browser.' },
    ],
    philosophy: 'Build small, sharp tools. Optimize for clarity. Respect the user. Ship.',
    funFacts: ['Writes Rust at 4am', 'Reads compiler papers for fun', 'Loves mechanical keyboards'],
    favoriteTech: ['Rust', 'PostgreSQL', 'Linux', 'WebGPU', 'Tokio'],
    books: [
      { title: 'Crafting Interpreters', author: 'Robert Nystrom' },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
    ],
    talks: [
      { title: 'Sovereign Operating Systems', venue: 'DevConf', year: '2025' },
      { title: 'Compilers for UI', venue: 'RustFest', year: '2024' },
    ],
  },
};

// ─── Department head stub builder ──────────────────────────────────────────────
function head(opts: {
  slug: string;
  department: string;
  name: string;
  title: string;
  tagline: string;
  photo: string;
  email: string;
  location?: string;
  bio: string;
  focus: string[];
  skills: Partial<TeamPortfolio['skills']>;
  projects: ProjectItem[];
}): TeamPortfolio {
  return {
    slug: opts.slug,
    department: opts.department,
    name: opts.name,
    title: opts.title,
    tagline: opts.tagline,
    photo: opts.photo,
    location: opts.location || 'Remote',
    email: opts.email,
    about: { bio: opts.bio, summary: opts.bio, interests: opts.focus, mission: opts.tagline },
    experience: [
      { company: 'Anoneurx', role: opts.title, period: '2023 — Present', description: opts.bio, responsibilities: opts.focus },
    ],
    skills: {
      core: opts.skills.core || opts.focus,
      languages: opts.skills.languages || [],
      frameworks: opts.skills.frameworks || [],
      tools: opts.skills.tools || [],
      platforms: opts.skills.platforms || [],
      databases: opts.skills.databases || [],
      cloud: opts.skills.cloud || [],
    },
    services: [
      { title: 'Consulting', description: `${opts.department} architecture & reviews.` },
      { title: 'Mentorship', description: `Guiding ${opts.department} engineers.` },
    ],
    projects: opts.projects,
    openSource: [],
    achievements: [{ title: `${opts.department} Excellence`, year: '2024', org: 'Anoneurx' }],
    education: [{ degree: 'BSc Computer Science', school: 'University', period: '2014 — 2018' }],
    publications: [],
    leadership: [{ title: `Head of ${opts.department}`, description: `Leads the ${opts.department} division.` }],
    testimonials: [],
    stats: [
      { label: 'Years', value: '6+' },
      { label: 'Projects', value: '20+' },
      { label: 'Team', value: '10+' },
      { label: 'Talks', value: '5+' },
    ],
    timeline: [
      { year: '2020', title: 'Joined the field', description: `Began deep work in ${opts.department}.` },
      { year: '2023', title: 'Joined Anoneurx', description: `Started leading ${opts.department}.` },
    ],
    media: [],
    availability: [
      { label: 'Mentorship', status: 'open' },
      { label: 'Consulting', status: 'limited' },
    ],
    faqs: [{ q: 'How can I work with your team?', a: 'Apply via the careers portal or reach out by email.' }],
    currentFocus: opts.focus,
    nowBuilding: opts.focus,
    ventures: [{ name: 'Anoneurx', description: 'Deep-tech research lab.' }],
    philosophy: 'Ship deliberately. Mentor constantly. Build for the long term.',
    funFacts: [],
    favoriteTech: opts.skills.languages || [],
    books: [],
    talks: [],
  };
}

const departmentHeads: TeamPortfolio[] = [
  head({ slug: 'ayeshakhan', department: 'AI Research', name: 'Ayesha Khan', title: 'Head of AI Research',
    tagline: 'Applied AI for production systems and agentic workflows.',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    email: 'ayesha@anoneurx.com',
    bio: 'Leads the AI Research division at Anoneurx, focused on model training, retrieval systems, and agent infrastructure.',
    focus: ['LLMs', 'RAG', 'Agent Systems', 'Vision'],
    skills: { languages: ['Python', 'TypeScript', 'Rust'], frameworks: ['PyTorch', 'JAX', 'LangChain'], cloud: ['AWS', 'GCP'], databases: ['Postgres', 'Pinecone'] },
    projects: [
      { title: 'Nexora AI', description: 'In-browser AI assistant with sovereign inference.', tech: ['PyTorch', 'WebGPU'], image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80' },
      { title: 'Agent Mesh', description: 'Distributed agent orchestration framework.', tech: ['Python', 'Rust'], image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80' },
    ],
  }),
  head({ slug: 'rohanmehta', department: 'Robotics', name: 'Rohan Mehta', title: 'Head of Robotics',
    tagline: 'Autonomous systems, perception stacks, and embedded control.',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
    email: 'rohan@anoneurx.com',
    bio: 'Leads robotics R&D, from kinematics to fleet orchestration. 9+ years across ground and aerial autonomy.',
    focus: ['SLAM', 'Control Systems', 'Perception', 'ROS2'],
    skills: { languages: ['C++', 'Python', 'Rust'], frameworks: ['ROS2', 'PX4'], tools: ['Gazebo', 'Isaac Sim'], platforms: ['Linux', 'NVIDIA Jetson'] },
    projects: [
      { title: 'Autonomous Drone Swarm', description: 'Coordinated multi-agent aerial platform.', tech: ['ROS2', 'PX4'], image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80' },
      { title: 'Warehouse Rover', description: 'Indoor autonomous logistics robot.', tech: ['C++', 'SLAM'], image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=80' },
    ],
  }),
  head({ slug: 'sarahokafor', department: 'Space Technology', name: 'Sarah Okafor', title: 'Head of Space Systems',
    tagline: 'CubeSat platforms, orbital mechanics, and mission planning.',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80',
    email: 'sarah@anoneurx.com',
    bio: 'Leads space systems engineering, building CubeSats and ground stations. Former mission engineer.',
    focus: ['CubeSat', 'Orbital Dynamics', 'Ground Stations', 'Telemetry'],
    skills: { languages: ['C', 'Python', 'Rust'], frameworks: ['Yamcs', 'GMAT'], tools: ['STK', 'KiCad'], platforms: ['RTOS'] },
    projects: [
      { title: 'CubeSat Constellation', description: 'Low-cost LEO observation network.', tech: ['C', 'RTOS'], image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80' },
      { title: 'Open Ground Station', description: 'Open-source UHF/VHF ground station kit.', tech: ['SDR', 'Python'], image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80' },
    ],
  }),
  head({ slug: 'jameschen', department: 'Web Engineering', name: 'James Chen', title: 'Head of Web Engineering',
    tagline: 'Performant web platforms, design systems, and DX tooling.',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=600&q=80',
    email: 'james@anoneurx.com',
    bio: 'Leads frontend and full-stack web engineering. Obsessed with type safety, performance budgets, and DX.',
    focus: ['React', 'Edge Compute', 'Design Systems', 'Performance'],
    skills: { languages: ['TypeScript', 'Rust', 'Go'], frameworks: ['React', 'Vite', 'Next.js', 'Tailwind'], cloud: ['Cloudflare', 'Vercel'], databases: ['Postgres', 'Redis'] },
    projects: [
      { title: 'Anoneurx Web Platform', description: 'Public site, dashboards, and dev portal.', tech: ['React', 'Vite'], image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80' },
      { title: 'UI Kit', description: 'Internal design system used across products.', tech: ['React', 'Radix', 'Tailwind'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80' },
    ],
  }),
  head({ slug: 'priyasharma', department: 'Cloud Infrastructure', name: 'Priya Sharma', title: 'Head of Cloud Infrastructure',
    tagline: 'Sovereign cloud, Kubernetes, and zero-trust networking.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    email: 'priya@anoneurx.com',
    bio: 'Leads cloud and platform engineering — Kubernetes, observability, and self-hosted infrastructure.',
    focus: ['Kubernetes', 'Observability', 'Zero Trust', 'Edge'],
    skills: { languages: ['Go', 'Rust', 'Python'], frameworks: ['Kubernetes', 'Terraform', 'Nix'], cloud: ['AWS', 'Hetzner', 'Self-hosted'], databases: ['Postgres', 'ClickHouse'] },
    projects: [
      { title: 'Anoneurx Cloud', description: 'Sovereign Kubernetes platform.', tech: ['Go', 'Kubernetes'], image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80' },
      { title: 'Observability Stack', description: 'OpenTelemetry-based logs, metrics, and traces.', tech: ['OTel', 'ClickHouse'], image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
    ],
  }),
];

for (const h of departmentHeads) teamPortfolios[h.slug] = h;

