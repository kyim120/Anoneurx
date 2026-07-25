import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import images from "@/constants/images";
import universityWallpaper from "@/assets/wallpapers/university.jpg";

const PublicLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundMap: Record<string, { desktop: string; mobile: string }> = {
    "/": { desktop: images.universal, mobile: images.universalMobile },
    "/contact": { desktop: images.universal, mobile: images.universalMobile },
    "/auth": { desktop: images.universal, mobile: images.universalMobile },
    "/login": { desktop: images.universal, mobile: images.universalMobile },
    "/signup": { desktop: images.universal, mobile: images.universalMobile },
    "/about": { desktop: images.universal, mobile: images.universalMobile },
    "/artificial-intelligence": { desktop: images.universal, mobile: images.universalMobile },
    "/robotics-systems": { desktop: images.universal, mobile: images.universalMobile },
    "/space-projects": { desktop: images.universal, mobile: images.universalMobile },
    "/web-development": { desktop: images.universal, mobile: images.universalMobile },
    "/internships": { desktop: images.universal, mobile: images.universalMobile },
    "/portfolio": { desktop: images.universal, mobile: images.universalMobile },
    "/dev-lab": { desktop: images.universal, mobile: images.universalMobile },
    "/dev-team": { desktop: images.universal, mobile: images.universalMobile },
    "/support": { desktop: images.universal, mobile: images.universalMobile },
  };

  const path = location.pathname;
  const isOpensource = path.startsWith('/opensource');
  const isBlackwall = path.startsWith('/blackwall');
  const isResearch =
    path.startsWith('/research') ||
    path.startsWith('/read/') ||
    path.startsWith('/read-paper/') ||
    path.startsWith('/share/') ||
    path === '/view-in-journal' ||
    path === '/strategic-kpis';
  const isUniversity =
    path.startsWith('/university') ||
    path.startsWith('/courses') ||
    path.startsWith('/professors');

  const currentBg = isOpensource
    ? null
    : isBlackwall
    ? { desktop: images.blackwall, mobile: images.blackwall }
    : isResearch
    ? { desktop: images.research, mobile: images.research }
    : isUniversity
    ? { desktop: universityWallpaper, mobile: universityWallpaper }
    : backgroundMap[path] || { desktop: images.universal, mobile: images.universalMobile };

  const isAuthPage = ['/auth', '/login', '/signup'].includes(path);
  const isPaymentPage = path.startsWith('/payment');
  const hideNavAndFooter = isAuthPage || isPaymentPage;

  return (
    <div className="min-h-screen relative">
      {currentBg && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${isMobile ? currentBg.mobile : currentBg.desktop})`,
          }}
        />
      )}
      {/* Slight veil for readability on university wallpaper */}
      {isUniversity && (
        <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {!hideNavAndFooter && <Navigation />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!hideNavAndFooter && <Footer />}
      </div>
    </div>
  );
};

export default PublicLayout;
