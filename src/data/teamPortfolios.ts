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
  kind?: 'dev' | 'faculty';
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
  officeHours?: string;
  officeLocation?: string;
  coursesTaught?: { code: string; title: string; term?: string; students?: number }[];
  researchAreas?: string[];
  studentsSupervised?: { name: string; degree: string; year: string; thesis?: string }[];
  about: {
    bio: string;
    summary: string;
    interests: string[];
    mission: string;
  };
  education?: EducationItem[];
  experience?: ExperienceItem[];
  skills?: {
    core?: string[];
    languages?: string[];
    frameworks?: string[];
    tools?: string[];
    platforms?: string[];
    databases?: string[];
    cloud?: string[];
  };
  services?: { title: string; description: string; icon?: string }[];
  projects?: ProjectItem[];
  openSource?: { name: string; description: string; stars?: number; url?: string }[];
  achievements?: AchievementItem[];
  publications?: PublicationItem[];
  leadership?: { title: string; description: string }[];
  testimonials?: TestimonialItem[];
  stats?: { label: string; value: string }[];
  timeline?: TimelineItem[];
  media?: { type: 'image' | 'video'; url: string; caption?: string }[];
  availability?: { label: string; status: 'open' | 'limited' | 'closed' }[];
  faqs?: FaqItem[];
  currentFocus?: string[];
  nowBuilding?: string[];
  ventures?: { name: string; description: string }[];
  philosophy?: string;
  funFacts?: string[];
  favoriteTech?: string[];
  books?: { title: string; author: string }[];
  talks?: { title: string; venue: string; year: string }[];
}

export const teamPortfolios: Record<string, TeamPortfolio> = {
  muhammadqasim: {
    slug: 'muhammadqasim',
    department: 'CEO',
    name: 'Muhammad Qasim',
    title: 'Founder & Systems Architect',
    tagline: 'Building operating systems, programming languages, and the future of computing.',
    photo: '',
    location: 'Islamabad, Pakistan',
    email: 'qasim@anoneurx.com',
    linkedin: 'https://linkedin.com/in/itskashie',
    github: 'https://github.com/itskashie',
    twitter: 'https://twitter.com/anoneurx',
    website: 'https://anoneurx.com',
    resumeUrl: '#',
    about: {
      bio: 'Founder of Anoneurx, a deep-tech lab building secure operating systems, AI infrastructure, and custom programming languages. Passionate about low-level systems, distributed architectures, and the craft of software.',
      summary: '7+ years architecting full-stack platforms, distributed systems, and OS-level tooling. Led teams shipping products used by thousands.',
      interests: ['Operating Systems', 'Compilers', 'AI Infrastructure', 'Cryptography', 'Distributed Systems'],
      mission: 'Empower developers and organizations with sovereign, secure, and performant computing primitives.',
    },
    education: [
      { degree: 'BSc Computer Science', school: 'NUST', period: '2018 — 2022' }
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
  skills: Partial<NonNullable<TeamPortfolio['skills']>>;
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

// ─── University faculty (academic portfolio template) ────────────────────────
function faculty(opts: {
  slug: string;
  name: string;
  title: string;
  department: string;
  tagline: string;
  bio: string;
  email: string;
  photo: string;
  officeHours?: string;
  officeLocation?: string;
  researchAreas: string[];
  coursesTaught: { code: string; title: string; term?: string; students?: number }[];
  publications: PublicationItem[];
  education: EducationItem[];
  students?: { name: string; degree: string; year: string; thesis?: string }[];
}): TeamPortfolio {
  return {
    slug: opts.slug,
    kind: 'faculty',
    department: opts.department,
    name: opts.name,
    title: opts.title,
    tagline: opts.tagline,
    photo: opts.photo,
    location: 'Anoneurx University',
    email: opts.email,
    officeHours: opts.officeHours,
    officeLocation: opts.officeLocation,
    researchAreas: opts.researchAreas,
    coursesTaught: opts.coursesTaught,
    studentsSupervised: opts.students || [],
    about: {
      bio: opts.bio,
      summary: opts.bio,
      interests: opts.researchAreas,
      mission: 'Advance knowledge, mentor students, and bridge academic theory with industrial reality.',
    },
    experience: [
      { company: 'Anoneurx University', role: opts.title, period: '2018 — Present', description: opts.bio, responsibilities: ['Teaching', 'Research', 'Student Supervision'] },
    ],
    skills: { core: opts.researchAreas, languages: [], frameworks: [], tools: [], platforms: [], databases: [], cloud: [] },
    services: [],
    projects: [],
    openSource: [],
    achievements: [{ title: 'Distinguished Teaching Award', year: '2024', org: 'Anoneurx University' }],
    education: opts.education,
    publications: opts.publications,
    leadership: [],
    testimonials: [],
    stats: [
      { label: 'Courses Taught', value: `${opts.coursesTaught.length}` },
      { label: 'Publications', value: `${opts.publications.length}+` },
      { label: 'Research Areas', value: `${opts.researchAreas.length}` },
      { label: 'Students Advised', value: `${(opts.students || []).length}+` },
    ],
    timeline: [],
    media: [],
    availability: [{ label: 'Office Hours', status: 'open' }],
    faqs: [],
    currentFocus: opts.researchAreas.slice(0, 3),
    nowBuilding: [],
    ventures: [],
    philosophy: 'Teach with clarity. Research with rigor. Mentor with patience.',
    funFacts: [],
    favoriteTech: [],
    books: [],
    talks: [],
  };
}

const facultyMembers: TeamPortfolio[] = [
  faculty({
    slug: 'sarahchen',
    name: 'Dr. Sarah Chen',
    title: 'Professor of Artificial Intelligence',
    department: 'Faculty of AI',
    tagline: 'Researching deep learning, NLP, and the science of language models.',
    bio: 'Dr. Sarah Chen leads the AI Research group at Anoneurx University. Her work focuses on foundation models, retrieval-augmented systems, and the theoretical foundations of large language models. She has authored over 60 peer-reviewed papers and supervised 20+ graduate students.',
    email: 'sarah.chen@anoneurx.edu',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    officeHours: 'Tue & Thu · 2:00–4:00 PM',
    officeLocation: 'AI Building, Room 314',
    researchAreas: ['Deep Learning', 'Natural Language Processing', 'Foundation Models', 'Interpretability'],
    coursesTaught: [
      { code: 'CS 401', title: 'Introduction to Neural Networks', term: 'Fall 2025', students: 180 },
      { code: 'CS 502', title: 'Advanced NLP', term: 'Spring 2026', students: 60 },
      { code: 'CS 610', title: 'Seminar in Foundation Models', term: 'Fall 2025', students: 22 },
    ],
    publications: [
      { title: 'Attention Beyond Transformers: A Survey', venue: 'JMLR', year: '2025' },
      { title: 'Interpretable Attention Patterns in LLMs', venue: 'NeurIPS', year: '2024' },
      { title: 'Retrieval-Augmented Generation at Scale', venue: 'ICML', year: '2024' },
    ],
    education: [
      { degree: 'Ph.D. Computer Science', school: 'Stanford University', period: '2010 — 2015' },
      { degree: 'M.S. Machine Learning', school: 'Carnegie Mellon University', period: '2008 — 2010' },
    ],
    students: [
      { name: 'Aditya Rao', degree: 'Ph.D.', year: '2026', thesis: 'Scaling laws in mixture-of-experts models' },
      { name: 'Yuki Tanaka', degree: 'M.S.', year: '2025', thesis: 'Efficient RAG for domain-specific tasks' },
    ],
  }),
  faculty({
    slug: 'jamesmitchell',
    name: 'Prof. James Mitchell',
    title: 'Professor of Robotics',
    department: 'Faculty of Robotics',
    tagline: 'Kinematics, autonomous systems, and human-robot collaboration.',
    bio: 'Professor James Mitchell heads the Robotics Department at Anoneurx University. His research explores autonomous manipulation, legged locomotion, and safety-critical control systems for robots operating alongside humans.',
    email: 'james.mitchell@anoneurx.edu',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    officeHours: 'Mon & Wed · 10:00 AM–12:00 PM',
    officeLocation: 'Robotics Lab, Room 210',
    researchAreas: ['Autonomous Systems', 'Manipulation', 'Legged Locomotion', 'Control Theory'],
    coursesTaught: [
      { code: 'ROB 301', title: 'Kinematics & Dynamics', term: 'Fall 2025', students: 90 },
      { code: 'ROB 402', title: 'Autonomous Navigation', term: 'Spring 2026', students: 55 },
    ],
    publications: [
      { title: 'Reactive Safety for Legged Robots', venue: 'ICRA', year: '2025' },
      { title: 'Learning Contact-Rich Manipulation', venue: 'RSS', year: '2024' },
    ],
    education: [
      { degree: 'Ph.D. Robotics', school: 'MIT', period: '2005 — 2010' },
      { degree: 'M.Eng. Mechanical Engineering', school: 'ETH Zürich', period: '2003 — 2005' },
    ],
    students: [
      { name: 'Elena Rodriguez', degree: 'Ph.D.', year: '2027', thesis: 'Compliant control for prosthetics' },
    ],
  }),
  faculty({
    slug: 'amaraokafor',
    name: 'Dr. Amara Okafor',
    title: 'Associate Professor of Space Systems',
    department: 'Faculty of Space Technology',
    tagline: 'Orbital mechanics, mission design, and CubeSat platforms.',
    bio: 'Dr. Amara Okafor directs the Space Systems Lab. She works on small-satellite constellations, mission design for low-Earth orbit, and open ground-station infrastructure that lets universities operate their own CubeSats.',
    email: 'amara.okafor@anoneurx.edu',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80',
    officeHours: 'Wed · 1:00–4:00 PM',
    officeLocation: 'Aerospace Building, Room 405',
    researchAreas: ['Orbital Mechanics', 'CubeSat Design', 'Ground Stations', 'Mission Planning'],
    coursesTaught: [
      { code: 'AE 210', title: 'Introduction to Astrodynamics', term: 'Fall 2025', students: 110 },
      { code: 'AE 501', title: 'Small Satellite Design', term: 'Spring 2026', students: 40 },
    ],
    publications: [
      { title: 'Cooperative CubeSat Constellations for Earth Observation', venue: 'JBIS', year: '2025' },
    ],
    education: [
      { degree: 'Ph.D. Aerospace Engineering', school: 'Caltech', period: '2012 — 2017' },
    ],
    students: [
      { name: 'Rohan Kapoor', degree: 'M.S.', year: '2025', thesis: 'De-orbit strategies for 3U CubeSats' },
    ],
  }),
  faculty({
    slug: 'liamtorres',
    name: 'Prof. Liam Torres',
    title: 'Professor of Distributed Systems',
    department: 'Faculty of Blockchain & Systems',
    tagline: 'Consensus protocols, secure computation, and trustless infrastructure.',
    bio: 'Professor Liam Torres teaches distributed systems and cryptography. His research group investigates Byzantine fault tolerance, zero-knowledge proofs, and the economics of decentralized protocols.',
    email: 'liam.torres@anoneurx.edu',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=600&q=80',
    officeHours: 'Fri · 9:00 AM–12:00 PM',
    officeLocation: 'Systems Hall, Room 118',
    researchAreas: ['Consensus Algorithms', 'Zero-Knowledge Proofs', 'Distributed Databases', 'Protocol Design'],
    coursesTaught: [
      { code: 'CS 350', title: 'Distributed Systems', term: 'Fall 2025', students: 140 },
      { code: 'CS 512', title: 'Applied Cryptography', term: 'Spring 2026', students: 65 },
    ],
    publications: [
      { title: 'Practical BFT for Public Blockchains', venue: 'OSDI', year: '2024' },
      { title: 'Zero-Knowledge Rollups: A Survey', venue: 'CCS', year: '2024' },
    ],
    education: [
      { degree: 'Ph.D. Computer Science', school: 'UC Berkeley', period: '2008 — 2013' },
    ],
  }),
];

for (const f of facultyMembers) teamPortfolios[f.slug] = f;
