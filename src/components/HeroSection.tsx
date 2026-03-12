import { Facebook, Send, BookOpen, ArrowDown, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/rathirayhan",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://facebook.com/rathi021",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://t.me/rayhanrathi",
    icon: Send,
    label: "Telegram",
  },
  {
    href: "https://www.goodreads.com/rathirayhan",
    icon: BookOpen,
    label: "Goodreads",
  },
];

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background depth decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large soft blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ring/5 rounded-full blur-[140px]" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Corner accent lines */}
        <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-accent/20 rounded-tl-lg" />
        <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-accent/20 rounded-tr-lg" />
        <div className="absolute bottom-20 left-12 w-16 h-16 border-b border-l border-accent/20 rounded-bl-lg" />
        <div className="absolute bottom-20 right-12 w-16 h-16 border-b border-r border-accent/20 rounded-br-lg" />
      </div>

      <div className="container mx-auto px-6 py-20" ref={ref}>
        <div className={`flex flex-col items-center text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Profile Avatar */}
          <div className="relative mb-10">
            {/* Decorative ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-primary/20 blur-sm" />
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-secondary border-2 border-accent/30 shadow-elevated overflow-hidden">
              <img
                src="/profile.png"
                alt="Abu Rayhan Rathi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h1
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-4"
            style={{ transitionDelay: "100ms" }}
          >
            Abu Rayhan Rathi
          </h1>

          {/* Tagline */}
          <p
            className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase mb-8"
            style={{ transitionDelay: "200ms" }}
          >
            Mathematics Student | Linux Enthusiast
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mb-10 bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-8 py-6 text-base"
            style={{ transitionDelay: "300ms" }}
          >
            Let's Connect
          </Button>

          {/* Social Links */}
          <div className="flex items-center gap-4" style={{ transitionDelay: "400ms" }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover-lift"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
