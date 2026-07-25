import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Code, Mail, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ShareOverlayProps {
  shareUrl: string;
  title?: string;
  onClose: () => void;
}

const ShareOverlay = ({ shareUrl, title, onClose }: ShareOverlayProps) => {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleEmbedCopy = async () => {
    const embedCode = `<iframe src="${shareUrl}" width="600" height="400" frameborder="0"></iframe>`;
    try {
      await navigator.clipboard.writeText(embedCode);
      setEmbedCopied(true);
      toast.success("Embed code copied!");
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch {
      toast.error("Failed to copy embed code");
    }
  };

  const shareText = title ? `${title} - ${shareUrl}` : shareUrl;

  const socialPlatforms = [
    {
      name: "WhatsApp",
      color: "text-green-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M11.999 2C6.476 2 2 6.477 2 12.002c0 1.769.46 3.428 1.267 4.877L2.05 21.95l5.184-1.197A9.95 9.95 0 0 0 12 22c5.523 0 10-4.477 10-10 0-5.522-4.477-10-10.001-10zm0 18.18a8.15 8.15 0 0 1-4.198-1.163l-.3-.179-3.077.71.737-3.005-.196-.309A8.18 8.18 0 0 1 3.82 12c0-4.513 3.667-8.18 8.18-8.18s8.18 3.667 8.18 8.18-3.667 8.18-8.18 8.18z" />
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "X",
      color: "text-white",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title || "Check out this paper")}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      color: "text-blue-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      color: "text-blue-400",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Telegram",
      color: "text-sky-400",
      icon: <Send className="w-6 h-6" />,
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || "")}`,
    },
    {
      name: "Reddit",
      color: "text-orange-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
        </svg>
      ),
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title || "")}`,
    },
    {
      name: "Email",
      color: "text-indigo-400",
      icon: <Mail className="w-6 h-6" />,
      href: `mailto:?subject=${encodeURIComponent(title || "Research Paper")}&body=${encodeURIComponent(shareText)}`,
    },
    {
      name: embedCopied ? "Copied!" : "Copy",
      color: "text-slate-300",
      icon: <Copy className="w-6 h-6" />,
      action: handleEmbedCopy,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/10 backdrop-blur-md"
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-8 md:p-12 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header */}
          <div className="mb-8 text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Research</span>
            <h2 className="mt-3 text-2xl font-bold text-white mb-2 tracking-tight">Share Paper</h2>
            {title && (
              <p className="text-sm text-slate-400 max-w-md mx-auto line-clamp-2">{title}</p>
            )}
          </div>

          {/* Social Icons Grid */}
          <div className="flex flex-wrap justify-center gap-4 relative z-10 mb-8">
            {socialPlatforms.map((platform, idx) => {
              const content = (
                <>
                  {platform.icon}
                  <span className="text-xs font-semibold">{platform.name}</span>
                </>
              );

              if (platform.action) {
                return (
                  <button
                    key={idx}
                    onClick={platform.action}
                    className={`flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-2xl ${platform.color} hover:bg-white/5 transition-colors`}
                    aria-label={platform.name}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <a
                  key={idx}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-2xl ${platform.color} hover:bg-white/5 transition-colors`}
                  aria-label={platform.name}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareOverlay;
