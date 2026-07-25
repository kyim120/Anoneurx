import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import {
  Mail, MapPin, Linkedin, Github, Twitter, Globe, Download, ExternalLink,
  Briefcase, GraduationCap, Award, BookOpen, Mic, Quote, Calendar,
  CheckCircle2, MinusCircle, XCircle, Rocket, ArrowUpRight, ArrowRight,
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { fetchPortfolio, subscribe } from '@/lib/teamStore';
import type { TeamPortfolio as TeamPortfolioT } from '@/data/teamPortfolios';
import FacultyPortfolio from './FacultyPortfolio';

/* -------------------------------------------------------------------------- */
/*  Editorial design tokens — warm ink on soft paper, no neon                  */
/* -------------------------------------------------------------------------- */
const ink = {
  page: '#0b0b0d',            // deep charcoal
  paper: '#f4efe6',           // warm off-white
  paperDim: 'rgba(244, 239, 230, 0.72)',
  paperMute: 'rgba(244, 239, 230, 0.5)',
  paperGhost: 'rgba(244, 239, 230, 0.12)',
  line: 'rgba(244, 239, 230, 0.14)',
  sand: '#c9b99a',            // muted sand accent
  accent: '#8a94ff',           // desaturated indigo, used sparingly
};

const serif: React.CSSProperties = {
  fontFamily: `'Instrument Serif', 'Fraunces', 'Cormorant Garamond', Georgia, serif`,
  fontWeight: 400,
  letterSpacing: '-0.01em',
};
const grotesk: React.CSSProperties = {
  fontFamily: `'Inter', 'Manrope', ui-sans-serif, system-ui, sans-serif`,
};

/* -------------------------------------------------------------------------- */
/*  Chapters                                                                   */
/* -------------------------------------------------------------------------- */
type Chapter = { id: string; label: string };

const CHAPTERS: Chapter[] = [
  { id: 'intro',       label: 'Intro' },
  { id: 'about',       label: 'About' },
  { id: 'now',         label: 'Now' },
  { id: 'experience',  label: 'Experience' },
  { id: 'skills',      label: 'Craft' },
  { id: 'services',    label: 'Services' },
  { id: 'projects',    label: 'Projects' },
  { id: 'opensource',  label: 'Open Source' },
  { id: 'awards',      label: 'Awards' },
  { id: 'education',   label: 'Education' },
  { id: 'publications',label: 'Writing' },
  { id: 'leadership',  label: 'Leadership' },
  { id: 'testimonials',label: 'Words' },
  { id: 'timeline',    label: 'Timeline' },
  { id: 'gallery',     label: 'Gallery' },
  { id: 'ventures',    label: 'Ventures' },
  { id: 'talks',       label: 'Talks' },
  { id: 'philosophy',  label: 'Philosophy' },
  { id: 'availability',label: 'Availability' },
  { id: 'faq',         label: 'FAQ' },
  { id: 'contact',     label: 'Contact' },
];

/* -------------------------------------------------------------------------- */
/*  Motion primitives                                                          */
/* -------------------------------------------------------------------------- */
const rise = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string; i?: number }> = ({ children, className, i = 0 }) => (
  <motion.div
    className={className}
    variants={rise}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    custom={i}
  >
    {children}
  </motion.div>
);

/* Word-by-word display for the hero name */
const WordReveal: React.FC<{ text: string; className?: string; style?: React.CSSProperties }> = ({ text, className, style }) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <h1 className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? undefined : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 && <span>&nbsp;</span>}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

/* -------------------------------------------------------------------------- */
/*  Section shell — numbered chapter                                           */
/* -------------------------------------------------------------------------- */
const Chapter: React.FC<{ id: string; num: number; kicker: string; title: string; lede?: string; children: React.ReactNode }> = ({
  id, num, kicker, title, lede, children,
}) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24 border-t" style={{ borderColor: ink.line }}>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
      <div className="md:col-span-4">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="text-xs tabular-nums tracking-[0.3em]" style={{ color: ink.paperMute }}>
              {String(num).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-[0.28em]" style={{ color: ink.sand }}>{kicker}</span>
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05]" style={{ ...serif, color: ink.paper }}>
            {title}
          </h2>
          {lede && (
            <p className="mt-4 text-sm md:text-[15px] leading-relaxed max-w-sm" style={{ color: ink.paperDim }}>
              {lede}
            </p>
          )}
        </Reveal>
      </div>
      <div className="md:col-span-8">{children}</div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Small atoms                                                                */
/* -------------------------------------------------------------------------- */
const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] tracking-wide"
    style={{ border: `1px solid ${ink.line}`, color: ink.paperDim, background: 'transparent' }}
  >
    {children}
  </span>
);

const InkLink: React.FC<{ href: string; children: React.ReactNode; external?: boolean }> = ({ href, children, external }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    className="group relative inline-flex items-center gap-1 text-sm"
    style={{ color: ink.paper }}
  >
    <span className="relative">
      {children}
      <span
        className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: ink.paper }}
      />
    </span>
    {external && <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />}
  </a>
);

const IconLink: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="inline-flex items-center justify-center w-9 h-9 rounded-full transition"
    style={{ border: `1px solid ${ink.line}`, color: ink.paperDim }}
  >
    {children}
  </a>
);

const availabilityMeta = {
  open:    { icon: CheckCircle2, label: 'Open',    color: '#a7c957' },
  limited: { icon: MinusCircle,  label: 'Limited', color: ink.sand   },
  closed:  { icon: XCircle,      label: 'Closed',  color: '#c76c6c'  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Chapter rail (desktop only)                                                */
/* -------------------------------------------------------------------------- */
const ChapterRail: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => {
  const [active, setActive] = useState<string>(chapters[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
      <ul className="space-y-2">
        {chapters.map((c, i) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="group flex items-center gap-3 text-[11px] tabular-nums tracking-[0.2em] uppercase transition"
                style={{ color: isActive ? ink.paper : ink.paperMute }}
              >
                <span
                  className="block transition-all duration-500"
                  style={{
                    height: 1,
                    width: isActive ? 32 : 12,
                    background: isActive ? ink.paper : ink.line,
                  }}
                />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ opacity: isActive ? 1 : undefined }}>
                  {String(i + 1).padStart(2, '0')} · {c.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                        */
/* -------------------------------------------------------------------------- */
const Hero: React.FC<{ profile: TeamPortfolioT }> = ({ profile }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  const status = profile.availability?.[0]?.status ?? 'open';
  const statusInfo = availabilityMeta[status as keyof typeof availabilityMeta];

  return (
    <section id="intro" ref={ref} className="relative pt-28 md:pt-36 pb-16 md:pb-24">
      {/* subtle warm grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(201,185,154,0.9), transparent 40%), radial-gradient(circle at 80% 30%, rgba(138,148,255,0.4), transparent 40%)",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end">
        <div className="md:col-span-7 order-2 md:order-1">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: ink.paperMute }}>
              <span>{profile.department || 'Team'}</span>
              <span style={{ color: ink.line }}>——</span>
              <span className="inline-flex items-center gap-1.5" style={{ color: statusInfo.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusInfo.color }} />
                {statusInfo.label}
              </span>
            </div>
          </Reveal>

          <div className="mt-6">
            <WordReveal
              text={profile.name}
              className="text-[13vw] md:text-[9vw] lg:text-[8rem] leading-[0.95] tracking-tight"
              style={{ ...serif, color: ink.paper }}
            />
          </div>

          <Reveal i={2}>
            <p className="mt-6 text-lg md:text-xl max-w-xl" style={{ ...grotesk, color: ink.paperDim, fontWeight: 300 }}>
              {profile.title}
            </p>
          </Reveal>

          <Reveal i={3}>
            <div className="mt-6 h-px w-24" style={{ background: ink.sand }} />
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: ink.paperDim }}>
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal i={4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm transition"
                style={{ background: ink.paper, color: ink.page }}
              >
                <Mail className="w-4 h-4" /> Get in touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm transition"
                  style={{ border: `1px solid ${ink.line}`, color: ink.paper }}
                >
                  <Download className="w-4 h-4" /> Résumé
                </a>
              )}
              <div className="flex items-center gap-2">
                {profile.linkedin && <IconLink href={profile.linkedin} label="LinkedIn"><Linkedin className="w-4 h-4" /></IconLink>}
                {profile.github   && <IconLink href={profile.github}   label="GitHub"  ><Github   className="w-4 h-4" /></IconLink>}
                {profile.twitter  && <IconLink href={profile.twitter}  label="Twitter" ><Twitter  className="w-4 h-4" /></IconLink>}
                {profile.website  && <IconLink href={profile.website}  label="Website" ><Globe    className="w-4 h-4" /></IconLink>}
              </div>
            </div>
          </Reveal>

          <Reveal i={5}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.24em]" style={{ color: ink.paperMute }}>
              <span className="inline-flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
              <span className="inline-flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {profile.email}</span>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 order-1 md:order-2">
          <motion.div style={{ y }} className="relative">
            <div className="absolute -inset-3 rounded-[2rem]" style={{ border: `1px solid ${ink.line}` }} />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a1c 0%, #2a2a2d 100%)' }}>
              {/^(chief|ceo|founder)/i.test(profile.title) ? (
                <div className="text-center px-6">
                  <div className="text-[7rem] leading-none font-serif" style={{ color: ink.paper }}>
                    {profile.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.4em]" style={{ color: ink.paperMute }}>
                    {profile.name}
                  </div>
                </div>
              ) : (
                <motion.img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  initial={reduce ? undefined : { scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  loading="eager"
                />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '3px 3px',
                }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em]" style={{ color: ink.paperMute }}>
              <span>Portrait · {profile.name.split(' ')[0]}</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                     */
/* -------------------------------------------------------------------------- */
const Marquee: React.FC<{ items: string[] }> = ({ items }) => {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-6 border-y" style={{ borderColor: ink.line }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      >
        {doubled.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-10 text-3xl md:text-5xl" style={{ ...serif, color: ink.paperGhost }}>
            {w}
            <span className="w-2 h-2 rounded-full" style={{ background: ink.sand }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Project card with cursor spotlight                                          */
/* -------------------------------------------------------------------------- */
const ProjectCard: React.FC<{ p: TeamPortfolioT['projects'][number]; i: number }> = ({ p, i }) => {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const reduce = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      className="group relative overflow-hidden rounded-2xl"
      style={{ border: `1px solid ${ink.line}`, background: '#111114' }}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={i}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos({ x: -1000, y: -1000 })}
    >
      {p.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(244,239,230,0.08), transparent 60%)`,
        }}
      />
      <div className="relative p-6">
        <h3 className="text-2xl leading-tight" style={{ ...serif, color: ink.paper }}>{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: ink.paperDim }}>{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
        {(p.demo || p.github) && (
          <div className="mt-5 flex gap-5">
            {p.demo   && <InkLink href={p.demo}   external>Live demo</InkLink>}
            {p.github && <InkLink href={p.github} external>Source</InkLink>}
          </div>
        )}
      </div>
    </motion.article>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main page                                                                   */
/* -------------------------------------------------------------------------- */
const TeamPortfolio: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<TeamPortfolioT | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!name) return;
      const p = await fetchPortfolio(name);
      if (mounted) { setProfile(p); setLoading(false); }
    };
    load();
    const unsub = subscribe(load);
    return () => { mounted = false; unsub(); };
  }, [name]);

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const availableChapters = useMemo(() => {
    if (!profile) return CHAPTERS;
    return CHAPTERS.filter((c) => {
      switch (c.id) {
        case 'now':          return (profile.currentFocus?.length ?? 0) + (profile.nowBuilding?.length ?? 0) > 0;
        case 'experience':   return (profile.experience?.length ?? 0) > 0;
        case 'skills':       return Object.values(profile.skills || {}).some((v: any) => v?.length);
        case 'services':     return (profile.services?.length ?? 0) > 0;
        case 'projects':     return (profile.projects?.length ?? 0) > 0;
        case 'opensource':   return (profile.openSource?.length ?? 0) > 0;
        case 'awards':       return (profile.achievements?.length ?? 0) > 0;
        case 'education':    return (profile.education?.length ?? 0) > 0;
        case 'publications': return (profile.publications?.length ?? 0) > 0;
        case 'leadership':   return (profile.leadership?.length ?? 0) > 0;
        case 'testimonials': return (profile.testimonials?.length ?? 0) > 0;
        case 'timeline':     return (profile.timeline?.length ?? 0) > 0;
        case 'gallery':      return (profile.media?.length ?? 0) > 0;
        case 'ventures':     return (profile.ventures?.length ?? 0) > 0;
        case 'talks':        return (profile.talks?.length ?? 0) > 0;
        case 'availability': return (profile.availability?.length ?? 0) > 0;
        case 'faq':          return (profile.faqs?.length ?? 0) > 0;
        default: return true;
      }
    });
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: ink.page, color: ink.paperMute, ...serif }}>
        <span className="text-lg tracking-widest uppercase">Loading portrait…</span>
      </div>
    );
  }
  if (!profile) return <Navigate to="/team" replace />;

  // Route to the academic layout for university faculty.
  if (profile.kind === 'faculty') return <FacultyPortfolio />;


  const marqueeItems = (profile.favoriteTech && profile.favoriteTech.length > 0
    ? profile.favoriteTech
    : (profile.skills?.core || [])).slice(0, 12);

  let chapterIndex = 0;
  const nextIdx = () => ++chapterIndex;

  return (
    <PageTransition>
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
      />

      <div style={{ background: ink.page, color: ink.paper, ...grotesk }}>
        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progressScale, background: ink.paper, transformOrigin: '0% 50%' }}
          className="fixed top-0 left-0 right-0 h-[2px] z-40"
        />

        <ChapterRail chapters={availableChapters} />

        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* HERO */}
          <Hero profile={profile} />

          {/* STATS as editorial band */}
          {profile.stats?.length > 0 && (
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-t" style={{ borderColor: ink.line }}>
              {profile.stats.map((s, i) => (
                <Reveal key={s.label} i={i}>
                  <div>
                    <div className="text-5xl md:text-6xl leading-none" style={{ ...serif, color: ink.paper }}>{s.value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: ink.paperMute }}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </section>
          )}

          {/* Marquee */}
          {marqueeItems.length > 0 && <Marquee items={marqueeItems} />}

          {/* ABOUT */}
          <Chapter id="about" num={nextIdx()} kicker="About" title="A biography of ideas." lede="The context, the mission, and the interests behind the work.">
            <Reveal>
              <p className="text-xl md:text-2xl leading-relaxed" style={{ ...serif, color: ink.paper }}>
                {profile.about?.bio}
              </p>
              <p className="mt-6 text-[15px] leading-relaxed max-w-2xl" style={{ color: ink.paperDim }}>
                {profile.about?.summary}
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t" style={{ borderColor: ink.line }}>
                <div>
                  <div className="text-xs uppercase tracking-[0.28em]" style={{ color: ink.sand }}>Mission</div>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: ink.paperDim }}>{profile.about?.mission}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.28em]" style={{ color: ink.sand }}>Interests</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {profile.about?.interests?.map((i) => <Chip key={i}>{i}</Chip>)}
                  </div>
                </div>
              </div>
            </Reveal>
          </Chapter>

          {/* NOW */}
          {(profile.currentFocus?.length || profile.nowBuilding?.length) > 0 && (
            <Chapter id="now" num={nextIdx()} kicker="Now" title="What's on the desk." lede="Live threads and current builds.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Reveal>
                  <div className="text-xs uppercase tracking-[0.28em]" style={{ color: ink.sand }}>Current focus</div>
                  <ul className="mt-4 space-y-3">
                    {profile.currentFocus.map((f) => (
                      <li key={f} className="flex gap-3 text-[15px]" style={{ color: ink.paperDim }}>
                        <span className="mt-2 w-3 h-px shrink-0" style={{ background: ink.paper }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal i={1}>
                  <div className="text-xs uppercase tracking-[0.28em]" style={{ color: ink.sand }}>Now building</div>
                  <ul className="mt-4 space-y-3">
                    {profile.nowBuilding.map((f) => (
                      <li key={f} className="flex gap-3 text-[15px]" style={{ color: ink.paperDim }}>
                        <span className="mt-2 w-3 h-px shrink-0" style={{ background: ink.paper }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Chapter>
          )}

          {/* EXPERIENCE */}
          {profile.experience?.length > 0 && (
            <Chapter id="experience" num={nextIdx()} kicker="Career" title="Places, roles, chapters.">
              <div>
                {profile.experience.map((e, i) => (
                  <Reveal key={e.company + e.role} i={i}>
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 py-8 border-t first:border-t-0" style={{ borderColor: ink.line }}>
                      <div className="text-xs uppercase tracking-[0.24em]" style={{ color: ink.paperMute }}>{e.period}</div>
                      <div>
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em]" style={{ color: ink.sand }}>
                          <Briefcase className="w-3.5 h-3.5" /> {e.company}
                        </div>
                        <h3 className="mt-2 text-2xl md:text-3xl" style={{ ...serif, color: ink.paper }}>{e.role}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: ink.paperDim }}>{e.description}</p>
                        {e.responsibilities?.length > 0 && (
                          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {e.responsibilities.map((r) => (
                              <li key={r} className="flex gap-2 text-sm" style={{ color: ink.paperMute }}>
                                <span style={{ color: ink.sand }}>—</span>{r}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* SKILLS as tag cloud */}
          {Object.values(profile.skills || {}).some((v: any) => v?.length) && (
            <Chapter id="skills" num={nextIdx()} kicker="Craft" title="The toolkit." lede="Languages, frameworks, systems and the things I reach for first.">
              <div className="space-y-8">
                {(['core','languages','frameworks','tools','platforms','databases','cloud'] as const).map((k) => {
                  const items = (profile.skills as any)?.[k] as string[] | undefined;
                  if (!items?.length) return null;
                  return (
                    <Reveal key={k}>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: ink.paperMute }}>{k}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {items.map((s) => <Chip key={s}>{s}</Chip>)}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Chapter>
          )}

          {/* SERVICES */}
          {profile.services?.length > 0 && (
            <Chapter id="services" num={nextIdx()} kicker="Services" title="How I can help.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.services.map((s, i) => (
                  <Reveal key={s.title} i={i}>
                    <div className="p-6 rounded-2xl h-full" style={{ border: `1px solid ${ink.line}` }}>
                      <h3 className="text-xl" style={{ ...serif, color: ink.paper }}>{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: ink.paperDim }}>{s.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* PROJECTS */}
          {profile.projects?.length > 0 && (
            <Chapter id="projects" num={nextIdx()} kicker="Work" title="Featured projects." lede="Selected pieces, chosen for depth over quantity.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
              </div>
            </Chapter>
          )}

          {/* OPEN SOURCE */}
          {profile.openSource?.length > 0 && (
            <Chapter id="opensource" num={nextIdx()} kicker="Community" title="Open source.">
              <div className="divide-y" style={{ borderColor: ink.line }}>
                {profile.openSource.map((o, i) => (
                  <Reveal key={o.name} i={i}>
                    <div className="flex items-center justify-between gap-6 py-5 border-t" style={{ borderColor: ink.line }}>
                      <div>
                        <h4 className="text-lg" style={{ ...serif, color: ink.paper }}>{o.name}</h4>
                        <p className="mt-1 text-sm" style={{ color: ink.paperMute }}>{o.description}</p>
                      </div>
                      {o.url && <InkLink href={o.url} external>Repo</InkLink>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* AWARDS */}
          {profile.achievements?.length > 0 && (
            <Chapter id="awards" num={nextIdx()} kicker="Recognition" title="Awards & honors.">
              <ul className="space-y-4">
                {profile.achievements.map((a, i) => (
                  <Reveal key={a.title} i={i}>
                    <li className="flex items-start gap-4 pb-4 border-b" style={{ borderColor: ink.line }}>
                      <Award className="w-4 h-4 mt-1.5 shrink-0" style={{ color: ink.sand }} />
                      <div className="flex-1">
                        <div className="text-base" style={{ ...serif, color: ink.paper }}>{a.title}</div>
                        <div className="text-xs uppercase tracking-[0.24em] mt-1" style={{ color: ink.paperMute }}>{a.org} · {a.year}</div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Chapter>
          )}

          {/* EDUCATION */}
          {profile.education?.length > 0 && (
            <Chapter id="education" num={nextIdx()} kicker="Background" title="Education.">
              <ul className="space-y-4">
                {profile.education.map((e, i) => (
                  <Reveal key={e.degree} i={i}>
                    <li className="flex items-start gap-4 pb-4 border-b" style={{ borderColor: ink.line }}>
                      <GraduationCap className="w-4 h-4 mt-1.5 shrink-0" style={{ color: ink.sand }} />
                      <div>
                        <div className="text-base" style={{ ...serif, color: ink.paper }}>{e.degree}</div>
                        <div className="text-xs uppercase tracking-[0.24em] mt-1" style={{ color: ink.paperMute }}>{e.school} · {e.period}</div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Chapter>
          )}

          {/* PUBLICATIONS */}
          {profile.publications?.length > 0 && (
            <Chapter id="publications" num={nextIdx()} kicker="Writing" title="Publications.">
              <ul>
                {profile.publications.map((p, i) => (
                  <Reveal key={p.title} i={i}>
                    <li className="flex items-baseline justify-between gap-6 py-4 border-b" style={{ borderColor: ink.line }}>
                      <div>
                        <div className="text-base" style={{ ...serif, color: ink.paper }}>{p.title}</div>
                        <div className="text-xs uppercase tracking-[0.24em] mt-1" style={{ color: ink.paperMute }}>{p.venue} · {p.year}</div>
                      </div>
                      {p.link && <InkLink href={p.link} external>Read</InkLink>}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Chapter>
          )}

          {/* LEADERSHIP */}
          {profile.leadership?.length > 0 && (
            <Chapter id="leadership" num={nextIdx()} kicker="Impact" title="Leadership.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.leadership.map((l, i) => (
                  <Reveal key={l.title} i={i}>
                    <div className="p-6 rounded-2xl h-full" style={{ border: `1px solid ${ink.line}` }}>
                      <h3 className="text-lg" style={{ ...serif, color: ink.paper }}>{l.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: ink.paperDim }}>{l.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* TESTIMONIALS as pull-quotes */}
          {profile.testimonials?.length > 0 && (
            <Chapter id="testimonials" num={nextIdx()} kicker="Words" title="In their words.">
              <div className="space-y-12">
                {profile.testimonials.map((t, i) => (
                  <Reveal key={t.name} i={i}>
                    <figure>
                      <Quote className="w-8 h-8" style={{ color: ink.sand }} />
                      <blockquote className="mt-4 text-2xl md:text-3xl leading-snug" style={{ ...serif, fontStyle: 'italic', color: ink.paper }}>
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 text-xs uppercase tracking-[0.28em]" style={{ color: ink.paperMute }}>
                        {t.name} · <span style={{ color: ink.sand }}>{t.role}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* TIMELINE */}
          {profile.timeline?.length > 0 && (
            <Chapter id="timeline" num={nextIdx()} kicker="Journey" title="The line so far.">
              <ol className="relative pl-8">
                <span className="absolute left-2 top-0 bottom-0 w-px" style={{ background: ink.line }} />
                {profile.timeline.map((t, i) => (
                  <Reveal key={t.year + t.title} i={i}>
                    <li className="relative pb-10 last:pb-0">
                      <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full" style={{ background: ink.paper, border: `2px solid ${ink.page}` }} />
                      <div className="text-xs uppercase tracking-[0.28em]" style={{ color: ink.sand }}>
                        <Calendar className="inline w-3.5 h-3.5 mr-2 -mt-0.5" />{t.year}
                      </div>
                      <h4 className="mt-2 text-xl" style={{ ...serif, color: ink.paper }}>{t.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: ink.paperDim }}>{t.description}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </Chapter>
          )}

          {/* GALLERY */}
          {profile.media?.length > 0 && (
            <Chapter id="gallery" num={nextIdx()} kicker="Gallery" title="Frames from the studio.">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {profile.media.map((m, i) => (
                  <Reveal key={i} i={i}>
                    <figure className="group overflow-hidden rounded-lg" style={{ border: `1px solid ${ink.line}` }}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={m.url}
                          alt={m.caption || 'gallery'}
                          className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                      </div>
                      {m.caption && (
                        <figcaption className="p-3 text-[10px] uppercase tracking-[0.24em]" style={{ color: ink.paperMute }}>{m.caption}</figcaption>
                      )}
                    </figure>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* VENTURES */}
          {profile.ventures?.length > 0 && (
            <Chapter id="ventures" num={nextIdx()} kicker="Builds" title="Ventures & products.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.ventures.map((v, i) => (
                  <Reveal key={v.name} i={i}>
                    <div className="p-5 rounded-2xl h-full" style={{ border: `1px solid ${ink.line}` }}>
                      <Rocket className="w-4 h-4 mb-3" style={{ color: ink.sand }} />
                      <h4 className="text-lg" style={{ ...serif, color: ink.paper }}>{v.name}</h4>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: ink.paperDim }}>{v.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* TALKS */}
          {profile.talks?.length > 0 && (
            <Chapter id="talks" num={nextIdx()} kicker="Speaking" title="Talks & appearances.">
              <ul>
                {profile.talks.map((t, i) => (
                  <Reveal key={t.title} i={i}>
                    <li className="flex items-baseline justify-between gap-6 py-4 border-b" style={{ borderColor: ink.line }}>
                      <div className="flex items-baseline gap-3">
                        <Mic className="w-3.5 h-3.5 shrink-0" style={{ color: ink.sand }} />
                        <div>
                          <div className="text-base" style={{ ...serif, color: ink.paper }}>{t.title}</div>
                          <div className="text-xs uppercase tracking-[0.24em] mt-1" style={{ color: ink.paperMute }}>{t.venue} · {t.year}</div>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Chapter>
          )}

          {/* PHILOSOPHY */}
          <Chapter id="philosophy" num={nextIdx()} kicker="Ethos" title="Work philosophy.">
            <Reveal>
              <blockquote className="text-3xl md:text-4xl leading-snug" style={{ ...serif, fontStyle: 'italic', color: ink.paper }}>
                &ldquo;{profile.philosophy}&rdquo;
              </blockquote>
              {profile.funFacts?.length > 0 && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.funFacts.map((f, i) => (
                    <Reveal key={f} i={i}>
                      <div className="flex items-start gap-3 text-sm" style={{ color: ink.paperDim }}>
                        <span style={{ color: ink.sand }}>·</span> {f}
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </Chapter>

          {/* AVAILABILITY */}
          {profile.availability?.length > 0 && (
            <Chapter id="availability" num={nextIdx()} kicker="Status" title="Availability.">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.availability.map((a, i) => {
                  const meta = availabilityMeta[a.status];
                  const Icon = meta.icon;
                  return (
                    <Reveal key={a.label} i={i}>
                      <div className="p-5 rounded-xl" style={{ border: `1px solid ${ink.line}` }}>
                        <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: ink.paperMute }}>{a.label}</div>
                        <div className="mt-3 inline-flex items-center gap-2 text-sm" style={{ color: meta.color }}>
                          <Icon className="w-4 h-4" /> {meta.label}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Chapter>
          )}

          {/* FAQ */}
          {profile.faqs?.length > 0 && (
            <Chapter id="faq" num={nextIdx()} kicker="Q&A" title="Common questions.">
              <div>
                {profile.faqs.map((f, i) => (
                  <Reveal key={f.q} i={i}>
                    <details className="group py-6 border-t" style={{ borderColor: ink.line }}>
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="text-lg pr-4" style={{ ...serif, color: ink.paper }}>{f.q}</span>
                        <span className="text-2xl transition-transform group-open:rotate-45" style={{ color: ink.sand }}>+</span>
                      </summary>
                      <p className="mt-3 text-[15px] leading-relaxed max-w-2xl" style={{ color: ink.paperDim }}>{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          )}

          {/* CONTACT */}
          <Chapter id="contact" num={nextIdx()} kicker="Colophon" title="Let's build something.">
            <Reveal>
              <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: ink.paperDim }}>
                Open to collaborations, speaking, and thoughtful conversations about systems, languages and design.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm" style={{ background: ink.paper, color: ink.page }}>
                  <Mail className="w-4 h-4" /> Email
                </a>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm" style={{ border: `1px solid ${ink.line}`, color: ink.paper }}>
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm" style={{ border: `1px solid ${ink.line}`, color: ink.paper }}>
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                <Link to="/team" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm" style={{ color: ink.paperMute }}>
                  ← Back to team
                </Link>
              </div>
            </Reveal>
          </Chapter>

          {/* Colophon footer */}
          <div className="py-10 flex items-center justify-between text-[10px] uppercase tracking-[0.3em]" style={{ color: ink.paperMute, borderTop: `1px solid ${ink.line}` }}>
            <span>{profile.name} · Portfolio</span>
            <span>Set in Instrument Serif & Inter</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TeamPortfolio;
