import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoColorido from "@assets/logo-kariri-colorido.png_1761066141574.png";

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Se não estiver na página Home, redireciona primeiro
    if (!isHome) {
      window.location.href = `/#${id}`;
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: "Início", id: "hero", type: "section" as const },
    { label: "Sobre Nós", id: "about", type: "section" as const },
    { label: "Cultura", id: "culture", type: "section" as const },
    { label: "Loja", id: "/loja", type: "page" as const },
    { label: "Galeria", id: "gallery", type: "section" as const },
    { label: "Contato", id: "contact", type: "section" as const },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
{isHome ? (
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md p-2 -ml-2"
                data-testid="button-logo"
              >
                <img
                  src={logoColorido}
                  alt="Aldeia Kariri Xocó"
                  className="h-12 w-auto"
                />
                <div className="hidden md:block text-left">
                  <p className="font-heading font-bold text-lg leading-tight text-foreground">
                    Instituto Indígena
                  </p>
                  <p className="font-heading font-bold text-sm text-primary">
                    Pawi Crody
                  </p>
                </div>
              </button>
            ) : (
              <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md p-2 -ml-2"
                data-testid="button-logo"
              >
                <img
                  src={logoColorido}
                  alt="Aldeia Kariri Xocó"
                  className="h-12 w-auto"
                />
                <div className="hidden md:block text-left">
                  <p className="font-heading font-bold text-lg leading-tight text-foreground">
                    Instituto Indígena
                  </p>
                  <p className="font-heading font-bold text-sm text-primary">
                    Pawi Crody
                  </p>
                </div>
              </Link>
            )}

            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                item.type === "page" ? (
                  <Link 
                    key={item.id} 
                    href={item.id}
                    className="px-4 py-2 text-sm font-body font-semibold text-foreground hover-elevate active-elevate-2 rounded-md transition-all relative group"
                    data-testid={`link-${item.id}`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="px-4 py-2 text-sm font-body font-semibold text-foreground hover-elevate active-elevate-2 rounded-md transition-all relative group"
                    data-testid={`link-${item.id}`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                  </button>
                )
              ))}
            </div>

            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection("contact")}
                variant="default"
                data-testid="button-visit-cta"
                className="font-body font-semibold"
              >
                Visite-nos
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
            {menuItems.map((item) => (
              item.type === "page" ? (
                <Link 
                  key={item.id} 
                  href={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-heading font-bold text-foreground hover:text-primary transition-colors"
                  data-testid={`mobile-link-${item.id}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-3xl font-heading font-bold text-foreground hover:text-primary transition-colors"
                  data-testid={`mobile-link-${item.id}`}
                >
                  {item.label}
                </button>
              )
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="mt-4 font-body font-semibold text-lg"
              data-testid="button-mobile-visit-cta"
            >
              Visite-nos
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
