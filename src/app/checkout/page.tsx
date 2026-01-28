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

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
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
            <p>Kargatzen...</p>
        </div>
    );
  }
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Ordainketa prozesatzen...",
        description: "Zure eskaera prestatzen ari gara."
    });

    setTimeout(() => {
        dispatch({ type: 'CLEAR_CART' });
        router.push('/order-success');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">Ordainketa</h1>
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Bidalketa Helbidea</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="izena">Izena</Label>
                        <Input id="izena" placeholder="Jon" required defaultValue={user.firstName || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="abizenak">Abizenak</Label>
                        <Input id="abizenak" placeholder="Doe" required defaultValue={user.lastName || ''} />
                    </div>
                    <div className="col-span-full space-y-2">
                        <Label htmlFor="helbidea">Helbidea</Label>
                        <Input id="helbidea" placeholder="Kale Nagusia 123" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hiria">Hiria</Label>
                        <Input id="hiria" placeholder="Bilbo" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="posta-kodea">Posta Kodea</Label>
                        <Input id="posta-kodea" placeholder="48001" required />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ordainketa Xehetasunak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Txartel Zenbakia</Label>
                        <Input id="card-number" placeholder="**** **** **** ****" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="expiry-date">Iraungitze Data</Label>
                            <Input id="expiry-date" placeholder="MM/AA" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Zure Eskaera</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {state.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Kopurua: {item.quantity}</p>
                                </div>
                                <p>{new Intl.NumberFormat('eu-ES', { style: 'currency', currency: 'EUR' }).format(item.price * item.quantity)}</p>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <p>Guztira</p>
                            <p>{new Intl.NumberFormat('eu-ES', { style: 'currency', currency: 'EUR' }).format(subtotal)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Button type="submit" className="mt-6 w-full" size="lg">
              Eskaera Berretsi
            </Button>
        </div>
      </form>
    </div>
  );
}
