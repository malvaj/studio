'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">Galdera Ohikoenak</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Zein ordainketa-metodo onartzen dituzue?</AccordionTrigger>
          <AccordionContent>
            Kreditu- eta zordunketa-txartel nagusiak (Visa, MasterCard, American Express) onartzen ditugu, baita PayPal bidezko ordainketak ere.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Nazioartera bidaltzen duzue?</AccordionTrigger>
          <AccordionContent>
            Bai, mundu osora bidaltzen dugu. Bidalketa-gastuak eta -denborak zure kokapenaren arabera aldatuko dira. Informazio gehiago gure Bidalketa Politiketan aurki dezakezu.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Zenbat denbora behar du nire eskaerak iristeko?</AccordionTrigger>
          <AccordionContent>
            Eskaerak 1-2 lanegunetan prozesatzen dira. Bidalketa-denborak aldatu egiten dira helmugaren arabera. Espainian, 3-5 lanegun inguru behar izaten ditu. Nazioarteko bidalketek 7-21 egun har ditzakete.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Auto bat itzul dezaket?</AccordionTrigger>
          <AccordionContent>
            Bai, itzulketak onartzen ditugu eskaera jaso eta 14 eguneko epean. Autoak jaso zenuen egoera berean egon behar du. Mesedez, kontsultatu gure Itzulketa Politika xehetasun gehiagorako.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Autoak benetakoak al dira edo erreplikak?</AccordionTrigger>
          <AccordionContent>
            Gure bildumako auto gehienak jatorrizko modelo zaharberrituak dira. Produktu bakoitzaren deskribapenean autoaren jatorriari eta historiari buruzko xehetasunak ematen ditugu. Erreplikarik badago, argi eta garbi adierazten da.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
