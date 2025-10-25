import { Card } from "@/components/ui/card";
import { Heart, Users, Sparkles } from "lucide-react";

export function WelcomeSection() {
  const values = [
    {
      icon: Heart,
      title: "Tradição",
      description: "Mantemos vivas as práticas e saberes ancestrais dos nossos povos.",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Unidos na diversidade, fortalecendo nossos laços multiétnicos.",
    },
    {
      icon: Sparkles,
      title: "Cultura Viva",
      description: "Celebramos nossas tradições através de arte, música e artesanato.",
    },
  ];

  return (
    <section id="welcome" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
            Bem-vindo à Nossa Aldeia
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A Aldeia Kariri Xocó Multiétnica é um espaço sagrado onde preservamos
            e compartilhamos a riqueza cultural dos povos indígenas. Através do
            Instituto Indígena Pawi Crody, trabalhamos para fortalecer nossa
            identidade e educar as futuras gerações.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="p-8 text-center hover-elevate transition-all duration-300 border-2"
                data-testid={`card-value-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
