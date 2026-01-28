export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rally Klasikoak. Eskubide guztiak erreserbatuta.
        </p>
      </div>
    </footer>
  );
}
