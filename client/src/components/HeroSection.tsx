import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { CocarPattern } from "./IndigenousPattern";
import heroImage from "@assets/principal_1761069098182.jpg";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center center'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,10%,0.7)] via-[hsl(220,20%,10%,0.5)] to-[hsl(220,20%,10%,0.8)]" />

      <div className="absolute top-20 right-10 text-primary pointer-events-none">
        <CocarPattern className="w-64 h-32 opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-tight">
          Aldeia Kariri Xocó
          <br />
          <span className="text-primary">Multiétnica</span>
        </h1>
        
        <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Celebrando nossas tradições ancestrais, preservando nossa cultura viva
          e compartilhando a sabedoria dos povos indígenas com o mundo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection("about")}
            size="lg"
            className="font-body font-semibold text-base backdrop-blur-sm bg-primary/90 hover:bg-primary border-2 border-primary-border"
            data-testid="button-hero-about"
          >
            Conheça Nossa História
          </Button>
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            variant="outline"
            className="font-body font-semibold text-base backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border-2 border-white/30"
            data-testid="button-hero-contact"
          >
            Entre em Contato
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("welcome")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
