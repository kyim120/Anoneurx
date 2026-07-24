import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import images from "@/constants/images";

const PublicLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (mobile vs desktop)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Background map (desktop vs mobile)
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
  };

  // Get current background
  const isOpensource = location.pathname.startsWith('/opensource');
  const isBlackwall = location.pathname.startsWith('/blackwall');
  const isResearch = location.pathname.startsWith('/research')
    || location.pathname.startsWith('/read-paper')
    || location.pathname === '/view-in-journal'
    || location.pathname === '/strategic-kpis';

  const currentBg = isOpensource
    ? null
    : isBlackwall
    ? { desktop: images.blackwall, mobile: images.blackwall }
    : isResearch
    ? { desktop: images.research, mobile: images.research }
    : backgroundMap[location.pathname] || { desktop: images.universal, mobile: images.universalMobile };

  const isAuthPage = ['/auth', '/login', '/signup'].includes(location.pathname);
  const isPaymentPage = location.pathname.startsWith('/payment');
  const hideNavAndFooter = isAuthPage || isPaymentPage;

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      {currentBg && (
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${isMobile ? currentBg.mobile : currentBg.desktop})`,
          }}
        />
      )}

      {/* Content */}
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
