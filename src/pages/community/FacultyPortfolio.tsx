import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { fetchPortfolio, subscribe } from '@/lib/teamStore';
import type { TeamPortfolio as TeamPortfolioT } from '@/data/teamPortfolios';
import {
  Mail, MapPin, Clock, GraduationCap, BookOpen, Users, FileText,
  ArrowLeft, ExternalLink, Award, Linkedin, Globe,
} from 'lucide-react';

/**
 * Faculty (university teacher) portfolio.
 * Formal academic layout — cream paper, dark serif, no neon.
 * Distinct from the dev editorial template.
 */
const FacultyPortfolio: React.FC = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5ee] flex items-center justify-center">
        <span className="text-sm tracking-[0.3em] uppercase text-stone-500">Loading faculty…</span>
      </div>
    );
  }
  if (!profile) return <Navigate to="/team" replace />;

  return (
    <PageTransition>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
      />
      <div className="min-h-screen bg-[#f8f5ee] text-stone-900" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
        <style>{`
          .fac-serif { font-family: 'Libre Baskerville', 'Cormorant Garamond', Georgia, serif; }
        `}</style>

        {/* Top bar */}
        <div className="border-b border-stone-300/70">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/professors" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-600 hover:text-stone-900">
              <ArrowLeft className="w-3.5 h-3.5" /> Faculty
            </Link>
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Anoneurx University · Faculty Directory
            </div>
          </div>
        </div>

        {/* Hero */}
        <header className="max-w-5xl mx-auto px-6 pt-14 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">
            <div className="mx-auto md:mx-0">
              <div className="w-52 h-52 rounded-full overflow-hidden ring-4 ring-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.35)] bg-stone-200">
                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" loading="eager" />
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-stone-500">{profile.department}</div>
              <h1 className="fac-serif text-4xl md:text-5xl leading-[1.05] mt-3 text-stone-950">
                {profile.name}
              </h1>
              <div className="mt-2 fac-serif italic text-lg text-stone-700">{profile.title}</div>
              <p className="mt-5 text-[15px] leading-relaxed text-stone-700 max-w-2xl">
                {profile.tagline}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-stone-700">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-stone-950">
                  <Mail className="w-3.5 h-3.5" /> {profile.email}
                </a>
                {profile.officeLocation && (
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {profile.officeLocation}
                  </div>
                )}
                {profile.officeHours && (
                  <div className="inline-flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Office hours: {profile.officeHours}
                  </div>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-stone-950">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-stone-950">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Stats strip */}
        {profile.stats && profile.stats.length > 0 && (
          <section className="border-y border-stone-300/70 bg-[#f2eee2]">
            <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <div className="fac-serif text-3xl md:text-4xl text-stone-950">{s.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-stone-500">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <main className="max-w-5xl mx-auto px-6 py-14 space-y-16">
          {/* Biography */}
          <Section num="I" title="Biography" icon={FileText}>
            <p className="text-[15px] leading-[1.8] text-stone-800 max-w-3xl">{profile.about?.bio}</p>
            {profile.about?.mission && (
              <p className="mt-4 fac-serif italic text-stone-600 max-w-3xl">“{profile.about.mission}”</p>
            )}
          </Section>

          {/* Research Areas */}
          {profile.researchAreas && profile.researchAreas.length > 0 && (
            <Section num="II" title="Research Areas" icon={BookOpen}>
              <div className="flex flex-wrap gap-2">
                {profile.researchAreas.map((r) => (
                  <span key={r} className="text-sm border border-stone-400/70 text-stone-800 px-3 py-1.5 rounded-full">
                    {r}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Courses Taught */}
          {profile.coursesTaught && profile.coursesTaught.length > 0 && (
            <Section num="III" title="Courses Taught" icon={GraduationCap}>
              <div className="border-t border-stone-300/70">
                {profile.coursesTaught.map((c) => (
                  <div key={c.code} className="grid grid-cols-[90px_1fr_auto] gap-4 py-4 border-b border-stone-300/70 items-baseline">
                    <div className="font-mono text-xs text-stone-500">{c.code}</div>
                    <div>
                      <div className="fac-serif text-lg text-stone-950">{c.title}</div>
                      {c.term && <div className="text-xs text-stone-500 mt-0.5">{c.term}</div>}
                    </div>
                    {c.students != null && (
                      <div className="text-xs text-stone-600 whitespace-nowrap">{c.students} students</div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Publications */}
          {profile.publications && profile.publications.length > 0 && (
            <Section num="IV" title="Selected Publications" icon={FileText}>
              <ol className="space-y-4 list-none">
                {profile.publications.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[40px_1fr] gap-4 pb-4 border-b border-stone-300/70">
                    <div className="fac-serif text-stone-400 text-lg">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="fac-serif text-[17px] text-stone-950 leading-snug">{p.title}</div>
                      <div className="text-xs italic text-stone-600 mt-1">
                        {p.venue} · {p.year}
                      </div>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-stone-700 hover:text-stone-950 underline underline-offset-4">
                          View publication <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* Students Supervised */}
          {profile.studentsSupervised && profile.studentsSupervised.length > 0 && (
            <Section num="V" title="Students Supervised" icon={Users}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {profile.studentsSupervised.map((s) => (
                  <div key={s.name} className="border border-stone-300/70 rounded-lg p-5 bg-white/40">
                    <div className="fac-serif text-lg text-stone-950">{s.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mt-1">
                      {s.degree} · {s.year}
                    </div>
                    {s.thesis && (
                      <div className="mt-3 text-sm text-stone-700 italic">“{s.thesis}”</div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <Section num="VI" title="Education" icon={GraduationCap}>
              <ul className="space-y-3">
                {profile.education.map((e) => (
                  <li key={e.degree} className="grid grid-cols-[1fr_auto] gap-4 py-3 border-b border-stone-300/70 items-baseline">
                    <div>
                      <div className="fac-serif text-lg text-stone-950">{e.degree}</div>
                      <div className="text-sm text-stone-600 mt-0.5">{e.school}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-stone-500 whitespace-nowrap">{e.period}</div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Honors */}
          {profile.achievements && profile.achievements.length > 0 && (
            <Section num="VII" title="Honors & Awards" icon={Award}>
              <ul className="space-y-2">
                {profile.achievements.map((a) => (
                  <li key={a.title} className="flex items-start gap-3 py-2 text-stone-800">
                    <Award className="w-4 h-4 mt-0.5 text-amber-700 shrink-0" />
                    <div className="text-sm">
                      <span className="fac-serif text-[15px] text-stone-950">{a.title}</span>
                      <span className="text-stone-500"> · {a.org} · {a.year}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Contact */}
          <Section num="VIII" title="Contact" icon={Mail}>
            <div className="border border-stone-300/70 rounded-xl p-6 bg-white/50">
              <p className="text-sm text-stone-700 max-w-xl">
                For office hours, thesis supervision, or academic collaboration, reach out via email or drop by during scheduled hours.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 mt-4 rounded-full bg-stone-900 text-stone-50 text-sm px-5 py-2.5 hover:bg-stone-700 transition"
              >
                <Mail className="w-4 h-4" /> {profile.email}
              </a>
            </div>
          </Section>
        </main>

        <footer className="border-t border-stone-300/70 py-8 text-center text-xs uppercase tracking-[0.3em] text-stone-500">
          Anoneurx University · Faculty Profile
        </footer>
      </div>
    </PageTransition>
  );
};

const Section: React.FC<{ num: string; title: string; icon: any; children: React.ReactNode }> = ({
  num, title, icon: Icon, children,
}) => (
  <section className="scroll-mt-24">
    <div className="flex items-center gap-4 mb-6">
      <div className="fac-serif text-stone-400 text-lg">{num}.</div>
      <Icon className="w-4 h-4 text-stone-500" />
      <h2 className="fac-serif text-2xl md:text-3xl text-stone-950">{title}</h2>
      <div className="flex-1 h-px bg-stone-300/70 ml-2" />
    </div>
    {children}
  </section>
);

export default FacultyPortfolio;
