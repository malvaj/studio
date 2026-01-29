'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12 md:px-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-6 font-headline text-3xl font-bold">Eskerrik asko!</h1>
          <p className="mt-2 text-muted-foreground">Zure eskaera behar bezala jaso da. Laster mezu elektroniko bat jasoko duzu xehetasunekin.</p>
          <Button asChild className="mt-8 w-full">
            <Link href="/">Hasierara Itzuli</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
