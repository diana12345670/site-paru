import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import earrings1 from "@assets/stock_images/colorful_beaded_earr_1b94fd79.jpg";
import necklace1 from "@assets/stock_images/traditional_beaded_n_90efe226.jpg";
import bracelet2 from "@assets/stock_images/handmade_bracelet_ar_13195b7e.jpg";

const products = [
  {
    id: "1",
    name: "Brincos de Miçanga Coloridos",
    price: 75.00,
    image: "https://i.ibb.co/rKvR3nSP/Captura-de-tela-2025-10-31-125134.png",
    category: "Brincos",
    description: "Lindos brincos artesanais feitos com miçangas tradicionais, cada peça é única e carrega a história de nossa cultura."
  },
  {
    id: "2",
    name: "Brincos Mandala Multicoloridos",
    price: 78.00,
    image: "https://i.ibb.co/N6B6dn7q/Imagem-do-Whats-App-de-2025-10-30-s-18-18-19-b21f28a1.jpg",
    category: "Brincos",
    description: "Deslumbrantes brincos artesanais com design de mandala, feitos com miçangas nas cores turquesa, laranja, vermelho, verde e preto, criando um padrão vibrante e único."
  },
  {
    id: "3",
    name: "Brincos Borboleta Vermelho e Amarelo",
    price: 75.00,
    image: "https://i.ibb.co/7tYWyHJv/Imagem-do-Whats-App-de-2025-10-30-s-18-18-17-9d044e1b.jpg",
    category: "Brincos",
    description: "Lindos brincos artesanais em formato de borboleta, feitos com miçangas nas cores vibrantes vermelho, amarelo, laranja e preto, com franjas decorativas."
  },
  {
    id: "4",
    name: "Pawí Tradicional Kariri Xocó",
    price: 70.00,
    image: "https://i.ibb.co/CcDsbkS/Imagem-do-Whats-App-de-2025-10-30-s-18-18-19-c5f299a2.jpg",
    category: "Cachimbos",
    description: "Pawí (cachimbo) tradicional Kariri Xocó, confeccionado artesanalmente segundo os ensinamentos ancestrais. Peça ritualística usada em cerimônias sagradas, feita com materiais naturais e decorada com elementos tradicionais de nossa cultura."
  },
  {
    id: "5",
    name: "Colar de Miçanga Multicolorido",
    price: 105.00,
    image: "https://i.ibb.co/YBb8npqg/Captura-de-tela-2025-10-30-184520.png",
    category: "Colares",
    description: "Colar alegre e colorido, perfeito para celebrar nossas tradições."
  },
  {
    id: "6",
    name: "Colar Tradicional Laranja",
    price: 108.00,
    image: "https://i.ibb.co/yBdTrMH7/Imagem-do-Whats-App-de-2025-10-30-s-18-18-19-1414ea0f.jpg",
    category: "Colares",
    description: "Colar artesanal em tons terrosos, conectando você com a natureza."
  },
  {
    id: "7",
    name: "Cocar Tradicional de Penas",
    price: 310.00,
    image: "https://i.ibb.co/svWZSXXG/Imagem-do-Whats-App-de-2025-10-30-s-18-18-21-90944a27.jpg",
    category: "Cocares",
    description: "Cocar tradicional confeccionado com penas naturais, uma peça sagrada de grande significado cultural."
  },
  {
    id: "8",
    name: "Cocar Cerimonial",
    price: 350.00,
    image: "https://i.ibb.co/jksw7127/Captura-de-tela-2025-10-30-184046.png",
    category: "Cocares",
    description: "Cocar especial usado em cerimônias importantes, feito artesanalmente por nossos anciãos."
  },
  {
    id: "9",
    name: "Pulseira de Miçanga Tradicional",
    price: 65.00,
    image: "https://i.ibb.co/KjNkZsnH/Captura-de-tela-2025-10-30-184330.png",
    category: "Pulseiras",
    description: "Pulseira delicada feita com miçangas coloridas, perfeita para o dia a dia."
  }
];

export default function Shop() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nossa Loja de Artesanato
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Cada peça conta uma história. Adquira artesanatos autênticos feitos à mão por nossos artesãos.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="bg-primary/10 rounded-lg p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4">Sobre Nossos Produtos</h3>
                <p className="text-muted-foreground">
                  Todos os nossos produtos são feitos artesanalmente pelos membros da Aldeia Kariri Xocó.
                  Cada peça é única e carrega consigo a tradição e sabedoria de nossos ancestrais.
                  Ao adquirir nossos artesanatos, você está apoiando diretamente nossa comunidade
                  e ajudando a preservar nossa cultura milenar.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
