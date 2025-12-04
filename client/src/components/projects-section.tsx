import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Network, 
  Workflow, 
  ExternalLink,
  Sparkles
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  icon: typeof Network;
  tags: string[];
  highlights: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    title: "Enterprise Knowledge Graph & RAG Platform",
    description: "A sophisticated enterprise-grade platform that combines knowledge graphs with Retrieval-Augmented Generation (RAG) for intelligent document understanding and question answering at scale.",
    icon: Network,
    tags: ["LangChain", "Pinecone", "Neo4j", "Python", "GPT-4"],
    highlights: [
      "Semantic search across millions of documents",
      "Graph-based relationship extraction",
      "Multi-modal content understanding",
      "Real-time knowledge updates",
    ],
    gradient: "from-primary via-chart-2 to-primary",
  },
  {
    title: "AI Workflow Automation Framework",
    description: "An end-to-end ML workflow automation framework that orchestrates training, evaluation, deployment, and monitoring of machine learning models with enterprise-grade reliability.",
    icon: Workflow,
    tags: ["Airflow", "MLflow", "Terraform", "Kubernetes", "AWS"],
    highlights: [
      "Automated model retraining pipelines",
      "Infrastructure as code deployment",
      "Real-time performance monitoring",
      "A/B testing and canary releases",
    ],
    gradient: "from-chart-2 via-chart-3 to-chart-2",
  },
];

function ProjectCard({ 
  project, 
  index, 
  isVisible 
}: { 
  project: Project; 
  index: number; 
  isVisible: boolean;
}) {
  const Icon = project.icon;
  
  return (
    <Card
      className={`relative overflow-visible p-8 glass hover:-translate-y-2 transition-all duration-500 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      data-testid={`card-project-${index}`}
    >
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-5 rounded-lg`} />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs"
              data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-').replace(/[-.]/g, '')}`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Key Features
          </h4>
          <ul className="grid sm:grid-cols-2 gap-2">
            {project.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function ProjectsSection() {
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
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/30"
      data-testid="section-projects"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions that push the boundaries of AI and data engineering
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
