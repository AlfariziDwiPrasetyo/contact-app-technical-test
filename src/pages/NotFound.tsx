import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="relative w-full max-w-md text-center">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/50 blur-3xl" />

        <div className="relative">
          {/* Icon  */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <FileQuestion size={48} strokeWidth={1.5} />
          </div>

          {/* Teks */}
          <h1 className="mb-2 text-8xl font-extrabold tracking-tighter text-foreground/20">
            404
          </h1>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
            Halaman Tidak Ditemukan
          </h2>
          <p className="mb-10 text-balance text-muted-foreground">
            Maaf, kami tidak bisa menemukan halaman yang kamu cari. Mungkin link
            tersebut sudah mati atau ada kesalahan penulisan URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="default" className="gap-2 px-8">
              <Link to="/">
                <Home size={18} />
                Beranda
              </Link>
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
