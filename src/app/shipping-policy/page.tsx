'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export default function ShippingPolicyPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">{t('shipping.title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('shipping.q1')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            {t('shipping.a1')}
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('shipping.q2')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('shipping.a2_1')}} />
          <p dangerouslySetInnerHTML={{ __html: t('shipping.a2_2')}} />
          <p>
            {t('shipping.a2_3')}
          </p>
        </CardContent>
      </Card>
        <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('shipping.q3')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
           {t('shipping.a3')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
