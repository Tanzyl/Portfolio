import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Cloud, 
  Brain, 
  Cpu, 
  Database,
  Layers
} from "lucide-react";

interface SkillCategory {
  title: string;
  icon: typeof Code2;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Tools",
    icon: Code2,
    color: "from-primary to-chart-2",
    skills: [
      "Python",
      "SQL",
      "PySpark",
      "Airflow",
      "dbt",
      "Kafka",
      "Redis",
      "Spark Streaming",
      "Pandas",
      "NumPy",
    ],
  },
  {
    title: "MLOps & DevOps",
    icon: Layers,
    color: "from-chart-2 to-chart-3",
    skills: [
      "Kubeflow",
      "SageMaker",
      "Vertex AI",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Argo Workflows",
      "GitHub Actions",
    ],
  },
  {
    title: "AI & LLM",
    icon: Brain,
    color: "from-chart-3 to-chart-4",
    skills: [
      "RAG with LangChain",
      "Vector Databases",
      "LLM Fine-tuning",
      "LoRA & PEFT",
      "Prompt Engineering",
      "Multimodal Copilots",
    ],
  },
  {
    title: "ML Frameworks",
    icon: Cpu,
    color: "from-chart-4 to-chart-5",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "MLflow",
      "Hugging Face",
      "XGBoost",
      "LightGBM",
    ],
  },
  {
    title: "Cloud Platforms",
    icon: Cloud,
    color: "from-chart-5 to-primary",
    skills: [
      "AWS",
      "GCP",
      "Azure",
      "Snowflake",
      "Redshift",
      "BigQuery",
      "Databricks",
    ],
  },
];

function SkillChip({ 
  skill, 
  delay 
}: { 
  skill: string; 
  delay: number;
}) {
  return (
    <Badge
      variant="secondary"
      className="px-4 py-2 text-sm font-medium hover:scale-105 transition-transform cursor-default"
      style={{ animationDelay: `${delay}ms` }}
      data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-').replace(/[&/]/g, '')}`}
    >
      {skill}
    </Badge>
  );
}

function CategoryCard({ 
  category, 
  index, 
  isVisible 
}: { 
  category: SkillCategory; 
  index: number; 
  isVisible: boolean;
}) {
  const Icon = category.icon;
  
  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <SkillChip
            key={skill}
            skill={skill}
            delay={index * 100 + skillIndex * 30}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
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
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32"
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building production-grade AI and data systems
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass">
            <Database className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Constantly expanding with emerging AI technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
