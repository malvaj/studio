'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">{t('privacy.title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('privacy.q1')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            {t('privacy.a1_1')}
          </p>
          <p>
            {t('privacy.a1_2')}
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('privacy.q2')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>{t('privacy.a2_1')}</p>
          <ul className="list-disc pl-6">
            <li>{t('privacy.l1')}</li>
            <li>{t('privacy.l2')}</li>
            <li>{t('privacy.l3')}</li>
            <li>{t('privacy.l4')}</li>
            <li>{t('privacy.l5')}</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('privacy.q3')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            {t('privacy.a3')}
          </p>
        </CardContent>
      </Card>
       <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('privacy.q4')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            {t('privacy.a4')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
