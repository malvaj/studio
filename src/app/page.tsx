'use client';

import Image from 'next/image';
import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function Home() {
  const { t } = useLanguage();
  const heroImage =
    'https://picsum.photos/seed/rally-hero/1280/720';

  return (
    <div className="space-y-12">
      <section className="relative h-[60vh] w-full">
        <Image
          src={heroImage}
          alt="Rally auto klasikoa"
          fill
          className="object-cover"
          priority
          data-ai-hint="classic rally"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl">
            {t('home.hero_title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
            {t('home.hero_subtitle')}
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="#produktuak">{t('home.explore_collection')}</Link>
          </Button>
        </div>
      </section>

      <section id="produktuak" className="container mx-auto px-4 py-12 md:px-6">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold tracking-tighter md:text-4xl">
          {t('home.our_treasures')}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
