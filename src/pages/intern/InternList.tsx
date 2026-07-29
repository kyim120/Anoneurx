import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, ArrowRight, MapPin } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { slugify } from "@/lib/utils";
import { internProfiles } from "@/data/internProfiles";

const fade = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

const InternList: React.FC = () => {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");

  const departments = useMemo(
    () => ["all", ...Array.from(new Set(internProfiles.map((i) => i.department)))],
    [],
  );

  const filtered = internProfiles.filter((i) => {
    if (dept !== "all" && i.department !== dept) return false;
    if (status !== "all" && i.status !== status) return false;
    if (q && !`${i.name} ${i.department} ${i.university || ""} ${i.bio}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <PageTransition>
      <SEO
        title="Interns"
        description="Meet the Anoneurx interns — the next generation of engineers, researchers and open source contributors."
        path="/intern"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-responsive max-w-6xl text-white">
          <motion.div initial="hidden" animate="visible" variants={fade} className="text-center space-y-4 mb-10">
            <Badge className="bg-white/[0.06] border-white/10 text-white/80">
              <Users className="w-4 h-4 mr-2" /> Anoneurx Interns
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Interns building the next Anoneurx</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Every intern that has trained, contributed, or graduated from Anoneurx — across AI, Robotics, Cyber Security, Data Science and more.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search interns by name, department, university…"
                className="pl-9 bg-white/[0.04] border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="md:w-[200px] bg-white/[0.04] border-white/10 text-white">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>{d === "all" ? "All departments" : d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="md:w-[180px] bg-white/[0.04] border-white/10 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Alumni">Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((i) => (
              <Link key={i.name} to={`/intern/${slugify(i.department)}/${slugify(i.name)}`}>
                <Card className="bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-primary/30 transition-all h-full group">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={i.photo} alt={i.name} className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors truncate">{i.name}</h3>
                        <p className="text-xs text-white/60 truncate">{i.department} · {i.batch}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge className="bg-white/[0.05] border-white/10 text-white/70 text-[10px]">{i.status}</Badge>
                      {i.university && <Badge className="bg-white/[0.05] border-white/10 text-white/60 text-[10px]">{i.university}</Badge>}
                    </div>
                    <p className="text-xs text-white/55 line-clamp-2">{i.bio}</p>
                    {i.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                        <MapPin className="w-3 h-3" /> {i.location}
                      </div>
                    )}
                    <div className="flex justify-end pt-2 border-t border-white/[0.06]">
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {!filtered.length && <p className="text-white/50 col-span-full text-center py-10">No interns match those filters.</p>}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default InternList;
