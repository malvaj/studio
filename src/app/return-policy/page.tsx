'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export default function ReturnPolicyPage() {
  const { t } = useLanguage();
  const email = "info@rallyklasikoak.eus";
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">{t('returns.title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('returns.q1')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            {t('returns.a1_1')}
          </p>
           <p>
            {t('returns.a1_2')}
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('returns.q2')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
           <p
            dangerouslySetInnerHTML={{
              __html: t('returns.a2_1').replace(
                '{email}',
                `<a href="mailto:${email}" class="text-primary underline">${email}</a>`
              ),
            }}
          />
           <p>
            {t('returns.a2_2')}
          </p>
        </CardContent>
      </Card>
        <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('returns.q3')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
           {t('returns.a3_1')}
          </p>
           <p>
            {t('returns.a3_2')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
