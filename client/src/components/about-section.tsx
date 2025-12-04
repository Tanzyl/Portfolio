import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Cloud, Workflow, Sparkles } from "lucide-react";

function AnimatedCounter({ 
  end, 
  suffix = "", 
  duration = 2000 
}: { 
  end: number; 
  suffix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const highlights = [
  {
    icon: Brain,
    title: "AI Systems",
    description: "Enterprise-grade LLM & RAG solutions",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Multi-cloud platform expertise",
  },
  {
    icon: Workflow,
    title: "MLOps",
    description: "End-to-end ML lifecycle automation",
  },
  {
    icon: Sparkles,
    title: "Gen AI",
    description: "Cutting-edge generative models",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "M+", label: "Daily Transactions" },
  { value: 150, suffix: "K+", label: "Cost Savings" },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-summary">
              Senior Data and Machine Learning Engineer with extensive experience designing 
              and scaling advanced AI systems, cloud-native pipelines, and production ML 
              solutions across multiple cloud platforms.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Proven success improving data velocity, model accuracy, and operational 
              efficiency using automation and intelligent design. Strong focus on LLM 
              technology, Generative AI, Retrieval-Augmented Generation, and modern 
              data engineering excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experienced across fintech, SaaS, and enterprise environments, bringing 
              a unique blend of deep technical expertise and business acumen to every project.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {highlights.map((item, index) => (
              <Card
                key={item.title}
                className="p-5 glass hover:-translate-y-2 transition-all duration-300 group"
                style={{ transitionDelay: `${index * 50}ms` }}
                data-testid={`card-highlight-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1" data-testid={`text-highlight-title-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.title}</h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-highlight-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div
          className={`mt-20 grid sm:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl glass"
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
