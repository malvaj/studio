'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language-context';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const product = products.find((p) => p.id === parseInt(params.id, 10));

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }
    toast({
      title: t('product.added_to_cart_title'),
      description: t('product.added_to_cart_description')
        .replace('{quantity}', quantity.toString())
        .replace('{name}', product.name),
    });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={600}
            className="rounded-lg object-cover shadow-lg"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-headline text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <p className="mt-6 font-headline text-4xl font-semibold text-primary">
            {new Intl.NumberFormat('eu-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center"
              />
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-grow">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('product.add_to_cart')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
