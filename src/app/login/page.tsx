'use client';

import { Suspense } from 'react'; // <--- Importamos Suspense
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

// 1. Movemos la lógica a un componente interno
function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email({ message: 'Helbide elektroniko baliogabea.' }),
    password: z.string().min(1, { message: 'Pasahitza ezin da hutsik egon.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password);
      toast({
        title: 'Ongi etorri!',
        description: 'Saioa ondo hasi duzu.',
      });
      const redirectUrl = searchParams.get('redirect') || '/account';
      router.push(redirectUrl);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Errorea saioa hastean',
        description: 'Helbide elektronikoa edo pasahitza ez da zuzena.',
      });
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Saioa Hasi</CardTitle>
          <CardDescription>Sartu zure helbide elektronikoa zure kontuan sartzeko.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Helbide elektronikoa</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="zure@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Pasahitza</FormLabel>
                      <Link href="/forgot-password" passHref className="ml-auto inline-block text-sm underline">
                        Pasahitza ahaztu duzu?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sartzen...' : 'Saioa Hasi'}
              </Button>
              <div className="mt-4 text-center text-sm">
                Ez duzu konturik?{' '}
                <Link href="/register" className="underline">
                  Erregistratu
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

// 2. El componente principal envuelve el contenido en Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center">Kargatzen...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
