import { supabase } from '@/integrations/supabase/client';
import { teamPortfolios, TeamPortfolio } from '@/data/teamPortfolios';

/**
 * Team portfolio store — sourced from Lovable Cloud (shared DB).
 * Seed data in `teamPortfolios.ts` is used as a fallback when the DB has no
 * matching row so preview/first-load shows meaningful content.
 */

const TABLE = 'team_portfolios';
const BUCKET = 'team-media';

type Row = {
  slug: string;
  name: string;
  department: string;
  title: string;
  tagline: string;
  photo: string;
  location: string;
  email: string;
  availability_status: string;
  data: Partial<TeamPortfolio>;
  updated_at: string;
};

const listeners = new Set<() => void>();
let cache: TeamPortfolio[] | null = null;
let cachePromise: Promise<TeamPortfolio[]> | null = null;

function rowToPortfolio(r: Row): TeamPortfolio {
  const seed = teamPortfolios[r.slug];
  const merged: TeamPortfolio = {
    ...(seed || emptyPortfolio(r.slug)),
    ...(r.data as TeamPortfolio),
    slug: r.slug,
    name: r.name,
    department: r.department,
    title: r.title,
    tagline: r.tagline,
    photo: r.photo,
    location: r.location,
    email: r.email,
  };
  return merged;
}

function portfolioToRow(p: TeamPortfolio): Row {
  const availability_status =
    (p.availability || []).find((a) => a.status === 'open')
      ? 'open'
      : (p.availability || []).find((a) => a.status === 'limited')
      ? 'limited'
      : (p.availability || []).length
      ? 'closed'
      : 'open';
  return {
    slug: p.slug,
    name: p.name || '',
    department: p.department || '',
    title: p.title || '',
    tagline: p.tagline || '',
    photo: p.photo || '',
    location: p.location || '',
    email: p.email || '',
    availability_status,
    data: p,
    updated_at: new Date().toISOString(),
  };
}

function notify() {
  cache = null;
  listeners.forEach((cb) => cb());
}

export async function fetchAllPortfolios(): Promise<TeamPortfolio[]> {
  if (cache) return cache;
  if (cachePromise) return cachePromise;
  cachePromise = (async () => {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) {
      console.error('team_portfolios fetch failed', error);
      return Object.values(teamPortfolios);
    }
    const dbMap = new Map<string, TeamPortfolio>();
    (data as Row[]).forEach((r) => dbMap.set(r.slug, rowToPortfolio(r)));
    // Merge seeds that aren't in DB
    Object.values(teamPortfolios).forEach((s) => {
      if (!dbMap.has(s.slug)) dbMap.set(s.slug, s);
    });
    cache = Array.from(dbMap.values());
    return cache;
  })();
  const result = await cachePromise;
  cachePromise = null;
  return result;
}

export async function fetchPortfolio(slug: string): Promise<TeamPortfolio | undefined> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('slug', slug).maybeSingle();
  if (error) console.error('fetchPortfolio', error);
  if (data) return rowToPortfolio(data as Row);
  return teamPortfolios[slug];
}

export async function savePortfolio(p: TeamPortfolio): Promise<void> {
  const row = portfolioToRow(p) as unknown as Record<string, unknown>;
  const { error } = await supabase.from(TABLE).upsert(row as never, { onConflict: 'slug' });
  if (error) throw error;
  notify();
}

export async function deletePortfolio(slug: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('slug', slug);
  if (error) throw error;
  notify();
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Realtime channel: refresh cache when the table changes anywhere
if (typeof window !== 'undefined') {
  supabase
    .channel('team_portfolios_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: TABLE }, () => notify())
    .subscribe();
}

// ---------- Uploads ----------

/** Upload a file to the shared team-media bucket. Returns a durable signed URL. */
export async function uploadTeamMedia(file: File, folder = 'gallery'): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(key, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  // Long-lived signed URL (10 years) so galleries render everywhere without re-signing.
  const { data, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(key, 60 * 60 * 24 * 365 * 10);
  if (signError || !data) throw signError || new Error('sign failed');
  return data.signedUrl;
}

export function emptyPortfolio(slug = ''): TeamPortfolio {
  return {
    slug,
    department: '',
    name: '',
    title: '',
    tagline: '',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80',
    location: '',
    email: '',
    about: { bio: '', summary: '', interests: [], mission: '' },
    experience: [],
    skills: { core: [], languages: [], frameworks: [], tools: [], platforms: [], databases: [], cloud: [] },
    services: [],
    projects: [],
    openSource: [],
    achievements: [],
    education: [],
    publications: [],
    leadership: [],
    testimonials: [],
    stats: [],
    timeline: [],
    media: [],
    availability: [{ label: 'Consulting', status: 'open' }],
    faqs: [],
    currentFocus: [],
    nowBuilding: [],
    ventures: [],
    philosophy: '',
    funFacts: [],
    favoriteTech: [],
    books: [],
    talks: [],
  };
}

// Convenience for admin: sync a seed profile into the DB so it can be edited.
export async function importSeedToDb(slug: string): Promise<void> {
  const seed = teamPortfolios[slug];
  if (!seed) return;
  await savePortfolio(seed);
}

/** Compute a simple availability summary from the portfolio. */
export function availabilityOf(p: TeamPortfolio): 'open' | 'limited' | 'closed' {
  const av = p.availability || [];
  if (av.some((a) => a.status === 'open')) return 'open';
  if (av.some((a) => a.status === 'limited')) return 'limited';
  if (av.length) return 'closed';
  return 'open';
}
