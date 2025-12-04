import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-8 border-t border-border bg-background/50"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span data-testid="text-footer-year">{currentYear}</span>
            <span className="gradient-text font-semibold" data-testid="text-footer-name">Mobi Ash</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground" data-testid="text-footer-built">
            Built with
            <Heart className="w-4 h-4 text-destructive mx-1 fill-current" />
            and modern tech
          </div>

          <div className="text-sm text-muted-foreground" data-testid="text-footer-title">
            Data & ML Engineer
          </div>
        </div>
      </div>
    </footer>
  );
}
