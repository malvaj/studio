'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
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
                    <div className="text-center text-muted-foreground">
                        <p>Oraindik ez duzu eskaerarik egin.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
