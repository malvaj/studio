'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReturnPolicyPage() {
  const email = "info@rallyklasikoak.eus";
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">Itzulketa Politika</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gure Itzulketa Politika</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Zure erosketarekin guztiz pozik ez bazaude, pozik lagunduko dizugu. Itzulketak onartzen ditugu produktua jaso eta 14 eguneko epean.
          </p>
           <p>
            Itzulketa bat jasotzeko, artikuluak erabili gabe egon behar du eta jaso zenuen egoera berean. Jatorrizko ontzian ere egon behar du.
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Itzultze Prozesua</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
           <p
            dangerouslySetInnerHTML={{
              __html: `Itzulketa bat hasteko, jarri gurekin harremanetan <a href="mailto:${email}" class="text-primary underline">${email}</a> helbidean zure eskaera-zenbakiarekin eta itzulketaren arrazoiarekin.`,
            }}
          />
           <p>
            Itzultzeko bidalketa-gastuak zure kontura izango dira. Bidalketa-gastuak ez dira itzulgarriak. Itzulketa bat jasotzen baduzu, itzultzeko bidalketaren kostua zure itzulketatik kenduko da.
          </p>
        </CardContent>
      </Card>
        <Card className="mt-8">
        <CardHeader>
          <CardTitle>Itzulketak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
           Zure itzulketa jaso eta ikuskatu ondoren, mezu elektroniko bat bidaliko dizugu itzulitako artikulua jaso dugula jakinarazteko. Zure itzulketaren onarpenaren edo ezespenaren berri ere emango dizugu.
          </p>
           <p>
            Onartzen bada, zure itzulketa prozesatuko da, eta kreditu bat automatikoki aplikatuko da zure jatorrizko ordainketa-metodoari, egun jakin batzuen buruan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
