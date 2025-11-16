import { IndigenousPattern } from "./IndigenousPattern";
import logoColorido from "@assets/logo-kariri-colorido.png_1761066141574.png";
import elderImage from "@assets/rpdape_1761069177771.jpg";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 text-chart-2 pointer-events-none">
        <IndigenousPattern className="w-48 h-48" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
              Nossa História
            </h2>
            
            <div className="space-y-6 font-body text-lg text-foreground/90 leading-relaxed">
              <p>
                O povo Kariri Xocó possui uma história milenar de resistência e
                preservação cultural. Habitantes originais das terras do
                Nordeste brasileiro, mantemos vivas nossas tradições através
                das gerações.
              </p>
              
              <p>
                Nossa aldeia multiétnica é um espaço de união, onde diferentes
                povos indígenas se encontram para celebrar, aprender e
                fortalecer nossa identidade coletiva. Aqui, a diversidade é
                nossa força.
              </p>

              <div className="bg-card border-2 border-card-border rounded-2xl p-6 mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={logoColorido}
                    alt="Instituto Pawi Crody"
                    className="w-16 h-16"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      Instituto Indígena Pawi Crody
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Educação e Preservação Cultural
                    </p>
                  </div>
                </div>
                <p className="text-base text-foreground/80">
                  O Instituto Pawi Crody é o coração educacional da nossa
                  aldeia, dedicado a preservar nossos saberes ancestrais e
                  preparar as novas gerações para um futuro que honra nossas
                  raízes.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={elderImage}
                alt="Sabedoria ancestral"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl max-w-xs border-2 border-primary-border">
              <p className="font-accent italic text-lg leading-relaxed">
                "Preservar nossa cultura é honrar nossos ancestrais e garantir
                o futuro dos nossos filhos."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
