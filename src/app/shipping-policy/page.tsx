'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">Bidalketa Politikak</h1>
      <Card>
        <CardHeader>
          <CardTitle>Prozesatzeko Denbora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Eskaera guztiak gure biltegitik 1-3 lanegunetan prozesatu eta bidaltzen dira. Asteburuetan edo jaiegunetan egindako eskaerak hurrengo lanegunean prozesatuko dira.
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Bidalketa Tarifak eta Denborak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p><strong>Estatuko Bidalketa (Espainia):</strong> 5-7 lanegun. Bidalketa kostua pisuaren eta helmugaren arabera kalkulatuko da ordainketa-pantailan.</p>
          <p><strong>Nazioarteko Bidalketa:</strong> 7-21 lanegun. Nazioarteko bidalketa-gastuek ez dituzte aduana-zergak edo zergak barne hartzen. Bezeroa da bere herrialdeko inportazio-gastuen erantzulea.</p>
          <p>
            Autoen tamaina eta pisu berezia direla eta, bidalketa-gastuak nabarmen alda daitezke. Garraio espezializatua behar duten ibilgailuentzat, zurekin harremanetan jarriko gara logistika koordinatzeko.
          </p>
        </CardContent>
      </Card>
        <Card className="mt-8">
        <CardHeader>
          <CardTitle>Eskaeraren Jarraipena</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
           Zure eskaera bidalitakoan, jarraipen-zenbaki bat duen mezu elektroniko bat jasoko duzu, paketearen bidaia jarraitu ahal izateko.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
