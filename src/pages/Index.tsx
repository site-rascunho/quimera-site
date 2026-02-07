import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import IndustriesSection from "@/components/IndustriesSection";
import { ContactSection, Footer } from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <IndustriesSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
};

export default Index;
