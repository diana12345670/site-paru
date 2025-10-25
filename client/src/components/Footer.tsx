import { Heart } from "lucide-react";
import logoColorido from "@assets/logo-kariri-colorido.png_1761066141574.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    institucional: [
      { label: "Sobre Nós", href: "#about" },
      { label: "Nossa História", href: "#about" },
      { label: "Cultura Viva", href: "#culture" },
    ],
    comunidade: [
      { label: "Galeria", href: "#gallery" },
      { label: "Contato", href: "#contact" },
      { label: "Visite-nos", href: "#contact" },
    ],
    redes: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/aldeiakariri_xocomultietnica/",
      },
      { label: "Facebook", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoColorido}
                alt="Aldeia Kariri Xocó"
                className="h-16 w-auto"
              />
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Instituto Indígena Pawi Crody - Preservando e celebrando a cultura
              Kariri Xocó Multiétnica.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">
              Institucional
            </h4>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">
              Comunidade
            </h4>
            <ul className="space-y-3">
              {footerLinks.comunidade.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-community-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">
              Redes Sociais
            </h4>
            <ul className="space-y-3">
              {footerLinks.redes.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-social-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Aldeia Kariri Xocó Multiétnica. Todos os direitos
              reservados.
            </p>
            <p className="font-body text-sm text-muted-foreground flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 text-primary fill-primary" />{" "}
              pela comunidade
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
