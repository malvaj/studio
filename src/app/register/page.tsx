'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'Izena beharrezkoa da.' }),
  lastName: z.string().min(1, { message: 'Abizena beharrezkoa da.' }),
  email: z.string().email({ message: 'Helbide elektroniko baliogabea.' }),
  password: z.string().min(6, { message: 'Pasahitzak gutxienez 6 karaktere izan behar ditu.' }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register(values.email, values.password, values.firstName, values.lastName);
      toast({
        title: 'Erregistroa osatuta',
        description: 'Zure kontua behar bezala sortu da. Saioa hasi dezakezu orain.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Errorea erregistratzean',
        description: 'Ezin izan da kontua sortu. Baliteke emaila jada erabilita egotea.',
      });
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sortu kontu bat</CardTitle>
          <CardDescription>Sartu zure informazioa kontu berri bat sortzeko.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Izena</FormLabel>
                      <FormControl>
                        <Input placeholder="Jon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abizena</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    <FormLabel>Pasahitza</FormLabel>
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
                {form.formState.isSubmitting ? 'Sortzen...' : 'Kontua Sortu'}
              </Button>
              <div className="mt-4 text-center text-sm">
                Baduzu kontua?{' '}
                <Link href="/login" className="underline">
                  Saioa Hasi
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
