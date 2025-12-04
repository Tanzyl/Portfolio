import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, FileText } from "lucide-react";

function FloatingShape({ 
  className, 
  delay = 0 
}: { 
  className?: string; 
  delay?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function AnimatedOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero"
      data-testid="section-hero"
    >
      <GridPattern />

      <AnimatedOrb 
        className="w-96 h-96 bg-primary -top-20 -right-20" 
        delay={0} 
      />
      <AnimatedOrb 
        className="w-80 h-80 bg-chart-2 -bottom-20 -left-20" 
        delay={2} 
      />
      <AnimatedOrb 
        className="w-64 h-64 bg-chart-3 top-1/3 right-1/4" 
        delay={4} 
      />

      <FloatingShape
        className="w-4 h-4 rounded-full bg-primary/30 top-1/4 left-1/4 animate-float"
        delay={0}
      />
      <FloatingShape
        className="w-3 h-3 rounded-full bg-chart-2/40 top-1/3 right-1/3 animate-float"
        delay={1}
      />
      <FloatingShape
        className="w-5 h-5 rounded-full bg-chart-3/30 bottom-1/4 left-1/3 animate-float"
        delay={2}
      />
      <FloatingShape
        className="w-2 h-2 rounded-full bg-primary/50 top-1/2 right-1/4 animate-float"
        delay={1.5}
      />
      <FloatingShape
        className="w-6 h-6 rotate-45 border-2 border-primary/20 top-1/5 right-1/5 animate-spin-slow"
        delay={0}
      />
      <FloatingShape
        className="w-8 h-8 rotate-12 border border-chart-2/20 bottom-1/3 right-1/4 animate-spin-slow"
        delay={0}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-testid="text-hero-name"
        >
          <span className="gradient-text">Mobi Ash</span>
        </h1>

        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-testid="text-hero-title"
        >
          Data & ML Engineer
        </h2>

        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-testid="text-hero-tagline"
        >
          Scalable AI Systems | MLOps | Generative AI
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            size="lg"
            className="group glow-primary-sm px-8"
            onClick={scrollToContact}
            data-testid="button-hero-contact"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group glass px-8"
            onClick={scrollToAbout}
            data-testid="button-hero-about"
          >
            <FileText className="w-4 h-4 mr-2" />
            Learn More
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="button-scroll-indicator"
        aria-label="Scroll down"
      >
        <span className="text-sm font-medium">Scroll</span>
        <ArrowDown className="w-5 h-5 scroll-indicator" />
      </button>
    </section>
  );
}
