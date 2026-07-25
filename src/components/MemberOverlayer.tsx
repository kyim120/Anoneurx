import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Mail, Globe, Github, GraduationCap } from 'lucide-react';

export interface Member {
  name: string;
  role: string;
  bio: string;
  fullBio?: string;
  image: string;
  expertise: string[];
  education?: { degree: string; school: string; period: string }[];
  badges?: string[];
  department?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    scholar?: string;
    email?: string;
    website?: string;
  };
}

interface MemberOverlayerProps {
  member: Member | null;
  onClose: () => void;
}

export const MemberOverlayer: React.FC<MemberOverlayerProps> = ({ member, onClose }) => {
  if (!member) return null;

  const defaultSocials = {
    twitter: member.socials?.twitter || `https://x.com/search?q=${encodeURIComponent(member.name)}`,
    linkedin: member.socials?.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.name)}`,
    github: member.socials?.github || `https://github.com/search?q=${encodeURIComponent(member.name)}`,
    email: member.socials?.email || `mailto:${member.name.toLowerCase().replace(/[^a-z]/g, '')}@anoneurx.edu`,
    website: member.socials?.website || `https://anoneurx.edu/faculty/${member.name.toLowerCase().replace(/[^a-z]/g, '')}`,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-white/5 hover:bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Left Column: Image + Badges */}
            <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-52 shrink-0">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-52 rounded-xl object-cover shadow-lg border border-white/10"
                />
              ) : (
                <div className="w-full h-52 rounded-xl bg-gradient-to-br from-primary/40 to-white/10 flex items-center justify-center text-5xl font-semibold text-white shadow-lg border border-white/10">
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
              )}

              {/* Badges Under Image */}
              {member.badges && member.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full pt-1">
                  {member.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-primary/20 text-primary border border-primary/30 rounded-full tracking-wide shadow-sm uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
                {member.name}
              </h2>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 font-semibold text-base md:text-lg mb-4">
                {member.role}
              </p>

              {/* Social Links Row */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {defaultSocials.linkedin && (
                  <a
                    href={defaultSocials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-gray-300 hover:text-blue-400 border border-white/10 hover:border-blue-500/40 transition-all text-xs flex items-center gap-1.5"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {defaultSocials.twitter && (
                  <a
                    href={defaultSocials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all text-xs flex items-center gap-1.5"
                    title="X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter / X</span>
                  </a>
                )}
                {defaultSocials.github && (
                  <a
                    href={defaultSocials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-purple-400 border border-white/10 hover:border-purple-500/40 transition-all text-xs flex items-center gap-1.5"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {defaultSocials.email && (
                  <a
                    href={defaultSocials.email}
                    className="p-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-gray-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40 transition-all text-xs flex items-center gap-1.5"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                )}
                {/* {defaultSocials.website && (
                  <a
                    href={defaultSocials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-cyan-600/20 text-gray-300 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/40 transition-all text-xs flex items-center gap-1.5"
                    title="Website"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )} */}
              </div>

              {/* Bio */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Biography
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {member.fullBio || member.bio}
                </p>
              </div>

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    Education
                  </h4>
                  <div className="space-y-2">
                    {member.education.map((edu, idx) => (
                      <div key={idx} className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-semibold text-white">{edu.degree}</span>
                          <span className="text-xs text-primary">{edu.period}</span>
                        </div>
                        <p className="text-xs text-gray-400">{edu.school}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Areas of Expertise */}
              {member.expertise && member.expertise.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 text-xs font-medium bg-white/5 text-white rounded-lg border border-white/10 hover:border-primary/50 transition-colors shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MemberOverlayer;
