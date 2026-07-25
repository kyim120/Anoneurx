import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Linkedin, Github, MapPin, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { fetchAllPortfolios, subscribe, availabilityOf } from '@/lib/teamStore';
import type { TeamPortfolio } from '@/data/teamPortfolios';
import MemberOverlayer, { Member } from '@/components/MemberOverlayer';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

type SortKey = 'relevance' | 'name-asc' | 'name-desc' | 'department' | 'availability';
type Availability = 'all' | 'open' | 'limited' | 'closed';

const AVAIL_BADGE: Record<Exclude<Availability, 'all'>, string> = {
  open: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  limited: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  closed: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const mapPortfolioToMember = (m: TeamPortfolio): Member => ({
  name: m.name,
  role: m.title,
  department: m.department,
  badges: [m.department, availabilityOf(m)].filter(Boolean),
  bio: m.tagline,
  fullBio: m.about?.bio || m.tagline,
  image: m.photo,
  expertise: m.skills?.core || [],
  education: m.education,
  socials: {
    linkedin: m.linkedin,
    github: m.github,
    email: m.email,
    twitter: m.twitter,
    website: m.website,
  }
});

const Team = () => {
  const [members, setMembers] = useState<TeamPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState<string>('All');
  const [avail, setAvail] = useState<Availability>('all');
  const [sort, setSort] = useState<SortKey>('relevance');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const data = await fetchAllPortfolios();
      if (!mounted) return;
      setMembers(data);
      setLoading(false);
    };
    load();
    const unsub = subscribe(load);
    return () => { mounted = false; unsub(); };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);
    const matchesQuery = (m: TeamPortfolio) => {
      if (!tokens.length) return true;
      const hay = [
        m.name, m.title, m.department, m.tagline, m.location, m.about?.bio,
        ...(m.skills?.core || []), ...(m.skills?.languages || []), ...(m.skills?.frameworks || []),
        ...(m.about?.interests || []), ...(m.currentFocus || []), ...(m.favoriteTech || []),
      ].filter(Boolean).join(' ').toLowerCase();
      return tokens.every((t) => hay.includes(t));
    };
    return members.filter((m) => {
      if (dept !== 'All' && m.department !== dept) return false;
      if (avail !== 'all' && availabilityOf(m) !== avail) return false;
      return matchesQuery(m);
    });
  }, [members, query, dept, avail]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'department') list.sort((a, b) => a.department.localeCompare(b.department) || a.name.localeCompare(b.name));
    else if (sort === 'availability') {
      const rank: Record<string, number> = { open: 0, limited: 1, closed: 2 };
      list.sort((a, b) => (rank[availabilityOf(a)] ?? 3) - (rank[availabilityOf(b)] ?? 3));
    }
    return list;
  }, [filtered, sort]);

  const ceo = sorted.find((m) => /ceo|founder/i.test(m.title));
  const others = sorted.filter((m) => m !== ceo);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center space-y-5">
              <Badge className="bg-white/[0.06] border-white/[0.1] text-white/80 px-4 py-2">
                <Users className="w-4 h-4 mr-2" /> The Anoneurx Team
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Meet the people behind Anoneurx</h1>
              <p className="text-white/60 max-w-2xl mx-auto">
                Founders, department heads, and engineers building operating systems, AI, robotics, space tech, and the web.
              </p>
            </motion.div>

            {/* CEO highlight */}
            {ceo && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div 
                  onClick={() => setSelectedMember(mapPortfolioToMember(ceo))}
                  className="cursor-pointer"
                >
                  <Card className="bg-gradient-to-br from-primary/15 to-white/[0.03] backdrop-blur-2xl border-primary/20 hover:border-primary/40 transition-all group">
                    <CardContent className="p-6 md:p-8 grid md:grid-cols-[180px_1fr] gap-6 items-center">
                      <div className="relative mx-auto md:mx-0">
                        <div className="absolute -inset-2 rounded-full bg-primary/30 blur-2xl" />
                        {ceo.photo ? (
                          <img 
                            src={ceo.photo} 
                            alt={ceo.name}
                            className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-white/15 object-cover shadow-xl"
                          />
                        ) : (
                          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-white/15 bg-gradient-to-br from-primary/40 to-white/10 flex items-center justify-center text-4xl md:text-5xl font-semibold tracking-tight text-white shadow-xl">
                            {ceo.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Badge className="bg-primary/20 text-primary border-primary/30">{ceo.department}</Badge>
                        <h2 className="text-2xl md:text-3xl font-semibold">{ceo.name}</h2>
                        <p className="text-primary/90">{ceo.title}</p>
                        <p className="text-white/65 max-w-2xl">{ceo.tagline}</p>
                        <div className="flex items-center gap-2 text-sm text-white/70 group-hover:text-primary transition-colors pt-2">
                          View details <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Members grid */}
            <section className="space-y-5">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">Department Heads & Team</h2>
              </div>

              {others.length === 0 ? (
                <div className="text-center py-12 text-white/50">
                  {loading ? 'Loading…' : 'No matches.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {others.map((m, i) => {
                    const av = availabilityOf(m);
                    return (
                      <motion.div
                        key={m.slug}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ delay: (i % 4) * 0.06 }}
                      >
                        <div 
                          onClick={() => setSelectedMember(mapPortfolioToMember(m))}
                          className="cursor-pointer h-full"
                        >
                          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] hover:border-primary/30 transition-all h-full group">
                            <CardContent className="p-5 space-y-3">
                              <div className="flex items-center gap-3">
                                <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover:border-primary/40 transition-colors" />
                                <div className="min-w-0">
                                  <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">{m.name}</h3>
                                  <p className="text-xs text-primary/80 truncate">{m.title}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <Badge className="bg-white/[0.05] text-white/70 border-white/10 text-[10px]">{m.department}</Badge>
                                <span className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded border ${AVAIL_BADGE[av]}`}>
                                  {av}
                                </span>
                              </div>
                              <p className="text-xs text-white/55 line-clamp-2">{m.tagline}</p>
                              {m.location && (
                                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                                  <MapPin className="w-3 h-3" /> {m.location}
                                </div>
                              )}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {(m.skills?.core || []).slice(0, 3).map((s) => (
                                  <span key={s} className="text-[10px] text-white/60 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{s}</span>
                                ))}
                              </div>
                              
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Member Overlayer Modal Component */}
      <MemberOverlayer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </PageTransition>
  );
};

export default Team;
