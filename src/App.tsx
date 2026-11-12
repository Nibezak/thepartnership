import { useCallback, useEffect, useState } from "react";
import HeaderGrowlio from "./components/templates/smm-agency-landing-page-growlio/Header Growlio";
import AboutUsGrowlio from "./components/templates/smm-agency-landing-page-growlio/About Us Growlio";
import OurServicesGrowlio from "./components/templates/smm-agency-landing-page-growlio/Our Services Growlio";
import { CoalitionScannerSection } from "./components/CoalitionScannerSection";
import CaseStudiesGrowlio from "./components/templates/smm-agency-landing-page-growlio/Case Studies Growlio";
import WhyChooseUsGrowlio from "./components/templates/smm-agency-landing-page-growlio/Why Choose Us Growlio";
import OurProcessGrowlio from "./components/templates/smm-agency-landing-page-growlio/Our Process Growlio";
import PricingGrowlio from "./components/templates/smm-agency-landing-page-growlio/Pricing Growlio";
import TestimonialsGrowlio from "./components/templates/smm-agency-landing-page-growlio/Testimonials Growlio";
import FAQGrowlio from "./components/templates/smm-agency-landing-page-growlio/FAQ Growlio";
import FooterGrowlio from "./components/templates/smm-agency-landing-page-growlio/Footer Growlio";
import { SiteNav } from "./components/SiteChrome";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ContactPage } from "./pages/ContactPage";
import { AppRoute } from "./data/agencyPagesData";

const VALID_ROUTES: AppRoute[] = ["/", "/about", "/work", "/clients", "/contact"];

function normalizeRoute(pathname: string): AppRoute {
  const cleaned = pathname.replace(/\/+$/, "") || "/";
  return VALID_ROUTES.includes(cleaned as AppRoute) ? (cleaned as AppRoute) : "/";
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    normalizeRoute(window.location.pathname)
  );

  const navigate = useCallback((nextRoute: AppRoute) => {
    const normalized = normalizeRoute(nextRoute);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, "", normalized);
    }
    setRoute(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav currentRoute={route} onNavigate={navigate} />
      {route !== "/" ? (
        <>
          <main className="flex-1">
            {route === "/about" && <AboutPage onNavigate={navigate} />}
            {route === "/work" && <WorkPage onNavigate={navigate} />}
            {route === "/clients" && <ClientsPage onNavigate={navigate} />}
            {route === "/contact" && <ContactPage />}
          </main>
          <FooterGrowlio onNavigate={navigate} />
        </>
      ) : (
        <main className="flex-1">
          <HeaderGrowlio onNavigate={navigate} />
          <AboutUsGrowlio onNavigate={navigate} />
          <OurServicesGrowlio onNavigate={navigate} />
          <CoalitionScannerSection onNavigateWork={() => navigate("/work")} />
          <CaseStudiesGrowlio onNavigate={navigate} />
          <WhyChooseUsGrowlio onNavigate={navigate} />
          <OurProcessGrowlio />
          <PricingGrowlio onNavigate={navigate} />
          <TestimonialsGrowlio />
          <FAQGrowlio onNavigate={navigate} />
          <FooterGrowlio onNavigate={navigate} />
        </main>
      )}
    </div>
  );
}

