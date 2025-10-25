import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { AboutSection } from "@/components/AboutSection";
import { CultureSection } from "@/components/CultureSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <WelcomeSection />
        <AboutSection />
        <CultureSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
