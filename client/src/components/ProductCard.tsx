import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default function ProductCard({ name, price, image, category, description }: ProductCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleBuyClick = () => {
    setShowDialog(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl">{name}</CardTitle>
            <Badge variant="secondary" className="shrink-0">{category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              R$ {price.toFixed(2)}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleBuyClick} className="w-full" size="lg">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>🚧 Em Desenvolvimento</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Ops! Esta funcionalidade ainda está em desenvolvimento. 
              <br /><br />
              Em breve você poderá adquirir nossos lindos produtos artesanais!
              <br /><br />
              Enquanto isso, entre em contato conosco para mais informações sobre nossos artesanatos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowDialog(false)}>Entendi</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
