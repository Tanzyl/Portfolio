import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Rocket, 
  Shield, 
  FileText,
  TrendingUp,
  DollarSign,
  Award
} from "lucide-react";

interface Achievement {
  icon: typeof Rocket;
  title: string;
  description: string;
  metric?: string;
  gradient: string;
}

const achievements: Achievement[] = [
  {
    icon: Rocket,
    title: "Company-wide AI Adoption Roadmap",
    description: "Led the strategic initiative to define and implement a comprehensive AI adoption roadmap across all departments",
    gradient: "from-primary to-chart-2",
  },
  {
    icon: DollarSign,
    title: "Cost Optimization",
    description: "Standardized monitoring and implemented cost optimization strategies resulting in significant annual savings",
    metric: "$150K+ saved annually",
    gradient: "from-chart-2 to-chart-3",
  },
  {
    icon: FileText,
    title: "Responsible AI Whitepaper",
    description: "Authored a comprehensive whitepaper on Responsible AI practices and RAG evaluation methodologies",
    gradient: "from-chart-3 to-chart-4",
  },
];

function AchievementCard({ 
  achievement, 
  index, 
  isVisible 
}: { 
  achievement: Achievement; 
  index: number; 
  isVisible: boolean;
}) {
  const Icon = achievement.icon;
  
  return (
    <Card
      className={`p-6 glass hover:-translate-y-2 transition-all duration-500 group relative overflow-visible ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`card-achievement-${index}`}
    >
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${achievement.gradient} opacity-5 rounded-lg`} />
      </div>

      <div className="relative">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {achievement.description}
        </p>

        {achievement.metric && (
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold"
            data-testid={`text-metric-${index}`}
          >
            <TrendingUp className="w-4 h-4" />
            {achievement.metric}
          </div>
        )}
      </div>
    </Card>
  );
}

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

export function AchievementsSection() {
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
      id="achievements"
      ref={sectionRef}
      className="py-24 md:py-32"
      data-testid="section-achievements"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Measurable impact and contributions to the field of AI and data engineering
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div
          className={`flex justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="inline-flex items-center gap-6 p-6 glass">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold gradient-text">
                  <AnimatedCounter end={10} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Years of Excellence</p>
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-chart-2" />
              <div>
                <div className="text-2xl font-bold gradient-text">
                  Enterprise
                </div>
                <p className="text-sm text-muted-foreground">Production Systems</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
