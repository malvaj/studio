'use client';

import Link from 'next/link';
import { Car, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import LanguageSwitcher from './language-switcher';

export default function Header() {
  const { state } = useCart();
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || '';
    const last = lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">{t('header.title')}</span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                       <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.firstName || 'User'} />
                        <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">{t('header.my_account')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      {t('header.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className='hidden md:flex md:gap-2'>
                  <Button variant="ghost" asChild>
                    <Link href="/login">{t('header.login')}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">{t('header.register')}</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          <Link href="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">{t('header.cart')}</span>
            </Button>
            {isClient && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
