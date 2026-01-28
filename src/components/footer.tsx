import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
          <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-semibold">Rally Klasikoak</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              B taldeko eta rallyko ikono mitikoenak. Zure grina, gure motorra.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Laguntza</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">Galdera ohikoenak</Link></li>
              <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-foreground">Bidalketa politikak</Link></li>
              <li><Link href="/return-policy" className="text-muted-foreground hover:text-foreground">Itzulketa politika</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">Pribatutasun politika</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Kontaktua</h4>
            <address className="mt-4 not-italic text-sm text-muted-foreground">
              <p>Kale Nagusia 123, 48001 Bilbo</p>
              <p>Bizkaia, Euskadi</p>
              <a href="mailto:info@rallyklasikoak.eus" className="mt-2 block hover:text-foreground">info@rallyklasikoak.eus</a>
              <a href="tel:+34944000000" className="mt-1 block hover:text-foreground">+34 944 00 00 00</a>
            </address>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Jarrai gaitzazu</h4>
            <div className="mt-4 flex justify-center space-x-4 md:justify-start">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rally Klasikoak. Eskubide guztiak erreserbatuta.</p>
        </div>
      </div>
    </footer>
  );
}
