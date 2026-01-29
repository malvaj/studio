'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">Pribatutasun Politika</h1>
      <Card>
        <CardHeader>
          <CardTitle>Zer informazio biltzen dugu?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Zuregandik informazioa biltzen dugu gure webgunean erregistratzen zarenean, eskaera bat egiten duzunean edo gure buletinean harpidetzen zarenean.
          </p>
          <p>
            Eskaera edo erregistroa egitean, dagokion moduan, zure izena, helbide elektronikoa, posta-helbidea edo telefono-zenbakia eska dakizuke. Hala ere, gure webgunea modu anonimoan bisita dezakezu.
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Zertarako erabiltzen dugu zure informazioa?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>Biltzen dugun informazioa helburu hauetarako erabil daiteke:</p>
          <ul className="list-disc pl-6">
            <li>Zure esperientzia pertsonalizatzeko</li>
            <li>Gure webgunea hobetzeko</li>
            <li>Bezeroarentzako zerbitzua hobetzeko</li>
            <li>Transakzioak prozesatzeko</li>
            <li>Aldizkako mezu elektronikoak bidaltzeko</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Nola babesten dugu zure informazioa?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Hainbat segurtasun-neurri ezartzen ditugu zure informazio pertsonalaren segurtasuna mantentzeko eskaera bat egiten duzunean edo zure informazio pertsonala sartu, bidali edo atzitzen duzunean.
          </p>
        </CardContent>
      </Card>
       <Card className="mt-8">
        <CardHeader>
          <CardTitle>Zure baimena</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Gure webgunea erabiliz, gure pribatutasun-politika onartzen duzu.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
