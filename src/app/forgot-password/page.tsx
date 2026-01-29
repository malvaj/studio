'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email({ message: 'Helbide elektroniko baliogabea.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate sending a password reset email
    console.log(values);
    toast({
      title: 'Berrezartzeko esteka bidalita',
      description: 'Mezu elektroniko bat bidali dugu zure pasahitza berrezartzeko argibideekin.',
    });
    form.reset();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Pasahitza Berreskuratu</CardTitle>
          <CardDescription>
            Sartu zure helbide elektronikoa eta pasahitza berrezartzeko esteka bat bidaliko dizugu.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
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
            </CardContent>
            <CardContent>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Bidalten...' : 'Berrezartzeko esteka bidali'}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
