'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Order } from '@/lib/types';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      try {
        const allOrders: Record<string, Order[]> = JSON.parse(localStorage.getItem('rally-orders') || '{}');
        setOrders(allOrders[user.uid] || []);
      } catch (error) {
        console.error("Failed to load orders from localStorage", error);
        setOrders([]);
      }
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12 md:px-6">
            <p>Kargatzen...</p>
        </div>
    );
  }
  
  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || '';
    const last = lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  }

  const currencyFormatter = new Intl.NumberFormat('eu-ES', { style: 'currency', currency: 'EUR' });
  const dateFormatter = (dateString: string) => new Date(dateString).toLocaleDateString('eu-ES');


  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">Nire Kontua</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.firstName || 'User'} />
                  <AvatarFallback className="text-3xl">{getInitials(user.firstName, user.lastName)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.firstName} {user.lastName}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Profilaren informazioa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex">
                        <p className="w-1/3 text-muted-foreground">Izen-abizenak</p>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                     <div className="flex">
                        <p className="w-1/3 text-muted-foreground">Helbide elektronikoa</p>
                        <p>{user.email}</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Eskaeren historia</CardTitle>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <div className="text-center text-muted-foreground">
                            <p>Oraindik ez duzu eskaerarik egin.</p>
                        </div>
                    ) : (
                        <Accordion type="single" collapsible className="w-full">
                            {orders.map((order) => (
                              <AccordionItem value={order.id} key={order.id}>
                                <AccordionTrigger>
                                  <div className="flex w-full items-center justify-between pr-4 text-sm">
                                    <span className="font-medium">#{order.id.slice(-6)}</span>
                                    <span className="text-muted-foreground">{dateFormatter(order.date)}</span>
                                    <span className="font-semibold">{currencyFormatter.format(order.total)}</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-3 pt-2">
                                    {order.items.map(item => (
                                        <li key={item.id} className="flex items-center justify-between text-sm">
                                            <div>
                                              <span className="font-medium">{item.name}</span>
                                              <span className="text-muted-foreground"> (x{item.quantity})</span>
                                            </div>
                                            <span>{currencyFormatter.format(item.price * item.quantity)}</span>
                                        </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
