import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Calendar,
  Bot,
  Database,
  GitBranch,
  Users,
  Shield,
  Zap,
  FileSearch,
  BarChart3,
  CreditCard,
  MessageSquare
} from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: {
    icon: typeof Bot;
    title: string;
    description: string;
  }[];
}

const experiences: Experience[] = [
  {
    company: "Cogito Tech",
    role: "Senior Data and Machine Learning Engineer",
    period: "Current",
    location: "Remote",
    achievements: [
      {
        icon: Bot,
        title: "Enterprise RAG Platform",
        description: "Built using LangChain and Pinecone with improved retrieval accuracy and lower latency",
      },
      {
        icon: MessageSquare,
        title: "Multimodal AI Copilots",
        description: "Developed with Whisper and GPT to automate customer support workflows",
      },
      {
        icon: GitBranch,
        title: "MLOps Pipelines",
        description: "Implemented with MLflow, Kubeflow, and Airflow achieving faster deployment cycles",
      },
      {
        icon: Database,
        title: "High-Throughput ETL",
        description: "Rebuilt data pipelines using Python, Spark, and dbt for improved performance",
      },
      {
        icon: Shield,
        title: "AI Governance",
        description: "Established model monitoring and responsible AI practices across the organization",
      },
      {
        icon: Users,
        title: "Mentorship",
        description: "Led technical mentorship activities for junior engineers and data scientists",
      },
    ],
  },
  {
    company: "KlearStack",
    role: "Machine Learning Engineer & Data Platform Lead",
    period: "Previous",
    location: "Hybrid",
    achievements: [
      {
        icon: Zap,
        title: "Automated ETL",
        description: "Built scalable data pipelines with Python and Spark for document processing",
      },
      {
        icon: FileSearch,
        title: "Document Intelligence",
        description: "Developed NLP and vision models for intelligent document understanding",
      },
      {
        icon: BarChart3,
        title: "Real-time Analytics",
        description: "Created streaming analytics pipelines using AWS and Kafka",
      },
      {
        icon: GitBranch,
        title: "CI/CD Integration",
        description: "Implemented infrastructure as code using Docker and Terraform",
      },
    ],
  },
  {
    company: "Difco",
    role: "AI Engineer & Data Scientist",
    period: "Previous",
    location: "On-site",
    achievements: [
      {
        icon: CreditCard,
        title: "Fraud Detection",
        description: "Built ML models that significantly reduced financial losses from fraud",
      },
      {
        icon: Database,
        title: "High-Volume Pipelines",
        description: "Processed more than 50 million transactions daily with streaming workflows",
      },
      {
        icon: BarChart3,
        title: "Analytics Dashboards",
        description: "Created Tableau and SQL dashboards for business intelligence",
      },
      {
        icon: Users,
        title: "Cross-functional Collaboration",
        description: "Worked closely with fraud analysts to optimize detection algorithms",
      },
    ],
  },
];

function ExperienceCard({ 
  experience, 
  index, 
  isVisible 
}: { 
  experience: Experience; 
  index: number; 
  isVisible: boolean;
}) {
  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-chart-2 to-transparent hidden md:block" />
      
      <div className="absolute left-0 top-8 w-3 h-3 -translate-x-1/2 rounded-full bg-primary glow-primary-sm hidden md:block" />
      
      <Card
        className="ml-0 md:ml-8 p-6 md:p-8 glass hover:-translate-y-1 transition-all duration-300 group"
        data-testid={`card-experience-${experience.company.toLowerCase().replace(' ', '-')}`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{experience.company}</h3>
                <p className="text-muted-foreground">{experience.role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="gap-1">
              <Calendar className="w-3 h-3" />
              {experience.period}
            </Badge>
            <Badge variant="outline">{experience.location}</Badge>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {experience.achievements.map((achievement, i) => (
            <div
              key={i}
              className="flex gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              data-testid={`achievement-item-${experience.company.toLowerCase().replace(' ', '-')}-${i}`}
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <achievement.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground mb-0.5">
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function ExperienceSection() {
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
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/30"
      data-testid="section-experience"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A decade of building scalable AI systems and data platforms across leading tech companies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mt-6" />
        </div>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
