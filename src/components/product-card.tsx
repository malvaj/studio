'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: t('product.added_to_cart_title'),
      description: t('product.added_to_cart_description').replace('{quantity}', '1').replace('{name}', product.name),
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-video overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="mb-2 text-lg font-bold hover:text-primary">{product.name}</CardTitle>
        </Link>
        <p className="font-headline text-2xl font-semibold text-primary">
          {new Intl.NumberFormat('eu-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t('product.add_to_cart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
