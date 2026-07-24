import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { applyStoredOSTheme } from "./OSThemeToggle";
import heroBg from "@/assets/opensource/bg.png";

const OpenSourceLayout = () => {
  const location = useLocation();

  useEffect(() => {
    applyStoredOSTheme();
    document.title = "Anoneurx Open Source";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen transition-colors bg-transparent text-white">
      {/* ================= GLOBAL BACKGROUND (clean, no overlays) ================= */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <main className="min-h-[70vh] relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default OpenSourceLayout;
