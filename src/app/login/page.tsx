'use client';

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
import { useLanguage } from '@/context/language-context';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const formSchema = z.object({
    email: z.string().email({ message: t('login.email_invalid') }),
    password: z.string().min(1, { message: t('login.password_empty') }),
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
        title: t('login.welcome_title'),
        description: t('login.welcome_description'),
      });
      const redirectUrl = searchParams.get('redirect') || '/account';
      router.push(redirectUrl);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('login.error_title'),
        description: t('login.error_description'),
      });
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.description')}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.email_label')}</FormLabel>
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
                      <FormLabel>{t('login.password_label')}</FormLabel>
                      <Link href="/forgot-password" passHref className="ml-auto inline-block text-sm underline">
                        {t('login.forgot_password')}
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
                {form.formState.isSubmitting ? t('login.submitting_button') : t('login.submit_button')}
              </Button>
              <div className="mt-4 text-center text-sm">
                {t('login.no_account')}{' '}
                <Link href="/register" className="underline">
                  {t('login.register_link')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
