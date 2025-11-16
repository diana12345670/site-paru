import { Card } from "@/components/ui/card";
import { Palette, Music, Book, Flame } from "lucide-react";

export function CultureSection() {
  const culturalElements = [
    {
      icon: Palette,
      title: "Artesanato",
      description:
        "Criamos peças únicas de cerâmica, cestaria e tecelagem que contam histórias ancestrais.",
      color: "text-chart-1",
    },
    {
      icon: Music,
      title: "Música e Dança",
      description:
        "Nossas canções e danças tradicionais celebram a conexão com a natureza e os espíritos.",
      color: "text-chart-2",
    },
    {
      icon: Book,
      title: "Língua e Saberes",
      description:
        "Preservamos nossa língua nativa e os conhecimentos tradicionais sobre medicina e agricultura.",
      color: "text-chart-3",
    },
    {
      icon: Flame,
      title: "Rituais Sagrados",
      description:
        "Mantemos vivos os rituais que conectam nossa comunidade com o sagrado e a terra.",
      color: "text-chart-4",
    },
  ];

  return (
    <section id="culture" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
            Cultura Viva
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nossa cultura é dinâmica e vibrante, manifestando-se em cada aspecto
            da vida cotidiana. Conheça os pilares que sustentam nossa identidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {culturalElements.map((element, index) => {
            const Icon = element.icon;
            return (
              <Card
                key={index}
                className="p-8 hover-elevate active-elevate-2 transition-all duration-300 border-2"
                data-testid={`card-culture-${index}`}
              >
                <div className={`${element.color} mb-6`}>
                  <Icon className="w-12 h-12" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                  {element.title}
                </h3>
                <p className="font-body text-muted-foreground text-base leading-relaxed">
                  {element.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
