'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import type { Order } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const { t, language } = useLanguage();

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currencyFormatter = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'eu-ES', { style: 'currency', currency: 'EUR' });
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, loading, router]);
  
  if (state.items.length === 0 && typeof window !== 'undefined') {
    router.push('/');
    return null;
  }
  
  if (loading || !user) {
     return (
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12 md:px-6">
            <p>{t('checkout.loading')}</p>
        </div>
    );
  }
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({
            variant: "destructive",
            title: t('checkout.error_saving_order_title'),
            description: t('checkout.login_required_error'),
        });
        return;
    }
    
    toast({
        title: t('checkout.processing_payment_title'),
        description: t('checkout.processing_payment_description'),
    });

    const newOrder: Order = {
        id: new Date().getTime().toString(),
        userId: user.uid,
        items: state.items,
        total: subtotal,
        date: new Date().toISOString(),
    };

    try {
        const storedOrders: Record<string, Order[]> = JSON.parse(localStorage.getItem('rally-orders') || '{}');
        const userOrders = storedOrders[user.uid] || [];
        userOrders.unshift(newOrder); // Add to the beginning to show newest first
        storedOrders[user.uid] = userOrders;
        localStorage.setItem('rally-orders', JSON.stringify(storedOrders));
    } catch (error) {
        console.error("Failed to save order to localStorage", error);
        toast({
            variant: "destructive",
            title: t('checkout.error_saving_order_title'),
            description: t('checkout.error_saving_order_description'),
        });
        return;
    }

    setTimeout(() => {
        dispatch({ type: 'CLEAR_CART' });
        router.push('/order-success');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">{t('checkout.title')}</h1>
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>{t('checkout.shipping_address')}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="izena">{t('checkout.first_name')}</Label>
                        <Input id="izena" placeholder="Jon" required defaultValue={user.firstName || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="abizenak">{t('checkout.last_name')}</Label>
                        <Input id="abizenak" placeholder="Doe" required defaultValue={user.lastName || ''} />
                    </div>
                    <div className="col-span-full space-y-2">
                        <Label htmlFor="helbidea">{t('checkout.address')}</Label>
                        <Input id="helbidea" placeholder="Kale Nagusia 123" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hiria">{t('checkout.city')}</Label>
                        <Input id="hiria" placeholder="Bilbo" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="posta-kodea">{t('checkout.zip_code')}</Label>
                        <Input id="posta-kodea" placeholder="48001" required />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('checkout.payment_details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">{t('checkout.card_number')}</Label>
                        <Input id="card-number" placeholder="**** **** **** ****" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="expiry-date">{t('checkout.expiry_date')}</Label>
                            <Input id="expiry-date" placeholder="MM/AA" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cvc">{t('checkout.cvc')}</Label>
                            <Input id="cvc" placeholder="123" required />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>{t('checkout.your_order')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {state.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{t('checkout.quantity_short').replace('{quantity}', item.quantity.toString())}</p>
                                </div>
                                <p>{currencyFormatter.format(item.price * item.quantity)}</p>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <p>{t('cart.grand_total')}</p>
                            <p>{currencyFormatter.format(subtotal)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Button type="submit" className="mt-6 w-full" size="lg">
              {t('checkout.confirm_order')}
            </Button>
        </div>
      </form>
    </div>
  );
}
