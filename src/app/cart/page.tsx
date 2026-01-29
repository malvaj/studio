'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { t, language } = useLanguage();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currencyFormatter = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'eu-ES', { style: 'currency', currency: 'EUR' });

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">{t('cart.title')}</h1>
      {state.items.length === 0 ? (
        <Card className="text-center">
          <CardContent className="p-12">
            <p className="mb-4 text-muted-foreground">{t('cart.empty')}</p>
            <Button asChild>
              <Link href="/">{t('cart.continue_shopping')}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('cart.product')}</TableHead>
                    <TableHead>{t('cart.price')}</TableHead>
                    <TableHead className="text-center">{t('cart.quantity')}</TableHead>
                    <TableHead className="text-right">{t('cart.total')}</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Image src={item.imageUrl} alt={item.name} width={100} height={67} className="rounded-md" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{currencyFormatter.format(item.price)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                          <Input type="number" value={item.quantity} className="w-16 text-center" readOnly />
                          <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{currencyFormatter.format(item.price * item.quantity)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('cart.summary_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>{currencyFormatter.format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.shipping_calculated')}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>{t('cart.grand_total')}</span>
                  <span>{currencyFormatter.format(subtotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">{t('cart.proceed_to_checkout')}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
