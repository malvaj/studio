'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/context/language-context';

export default function FAQPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">{t('faq.title')}</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t('faq.q1')}</AccordionTrigger>
          <AccordionContent>
            {t('faq.a1')}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t('faq.q2')}</AccordionTrigger>
          <AccordionContent>
            {t('faq.a2')}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{t('faq.q3')}</AccordionTrigger>
          <AccordionContent>
            {t('faq.a3')}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>{t('faq.q4')}</AccordionTrigger>
          <AccordionContent>
            {t('faq.a4')}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>{t('faq.q5')}</AccordionTrigger>
          <AccordionContent>
            {t('faq.a5')}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
