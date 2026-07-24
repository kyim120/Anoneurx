import { useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Index = () => {
  useEffect(() => {
    document.title = "Anoneurx";
  }, []);

  return <PageTransition>
    <SEO
      title="Home"
      description="Anoneurx builds innovative software, operating systems, AI, cloud, and open source technologies — including Black Wall, Nexora, Anoneurx Cloud, Research, and Pay."
      path="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Anoneurx",
        url: "https://anoneurx.com",
        logo: "https://anoneurx.com/assets/logo.svg",
        sameAs: [],
      }}
    />
    <div className="min-h-screen">
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
          <div className="w-full max-w-4xl mx-auto text-center space-y-8 ">
            <p className="text-4xl sm:text-5xl text-white tracking-widest">
              ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-brand">ANONEURX
            </h1>

            <p className="text-md sm:text-lg text-white max-w-2xl mx-auto">
              ɪɴɴᴏᴠᴀᴛɪᴠᴇ sᴏғᴛᴡᴀʀᴇ ᴅᴇsɪɢɴᴇᴅ ᴛᴏ ᴇᴍᴘᴏᴡᴇʀ ᴅᴇᴠᴇʟᴏᴘᴇʀs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <Button className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-8 py-4 w-full sm:w-auto">
                  <span className="relative z-10 flex items-center gap-2">
                    sᴛᴀʀᴛ ʙᴜɪʟᴅɪɴɢ ʏᴏᴜʀ ɪᴅᴇᴀ
                  </span>
                </Button>
              </Link>
              <Link to="/arcadeum">
                <Button className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-8 py-4 w-full sm:w-auto">
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    ᴀɴᴏɴᴇᴜʀx ᴀʀᴄᴀᴅᴇᴜᴍ
                  </span>
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-8 py-4 w-full sm:w-auto">
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    ᴠɪᴇᴡ ᴘᴏʀᴛғᴏʟɪᴏ
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </PageTransition>;
};
export default Index;