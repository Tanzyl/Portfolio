import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Linkedin,
  Github,
  ArrowUpRight
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mobidatadev@gmail.com",
    href: "mailto:mobidatadev@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(253) 356-7927",
    href: "tel:+12533567927",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Columbus, OH",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "#",
  },
];

export function ContactSection() {
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
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/30 relative overflow-hidden"
      data-testid="section-contact"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next AI project? Let's connect and discuss how we can work together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="p-8 glass">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Let's Build Something Amazing
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new projects, opportunities, 
                and ways to bring AI solutions to life. Whether you're looking to 
                build scalable ML systems, implement RAG solutions, or optimize 
                your data pipelines, I'd love to hear from you.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background transition-colors group ${
                      item.href ? "cursor-pointer" : ""
                    }`}
                    onClick={() => item.href && window.open(item.href, "_self")}
                    data-testid={`contact-${item.label.toLowerCase()}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                    {item.href && (
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      data-testid={`button-social-${link.label.toLowerCase()}`}
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </Button>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="p-8 animated-border overflow-visible">
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center mb-6 shadow-lg animate-glow-pulse">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Ready to Connect?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Drop me an email and I'll get back to you as soon as possible.
                  </p>
                  <Button
                    size="lg"
                    className="glow-primary-sm px-8"
                    onClick={() => window.open("mailto:mobidatadev@gmail.com", "_self")}
                    data-testid="button-send-email"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Currently available for new opportunities</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
