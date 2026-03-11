import { Facebook, Send, BookOpen, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
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
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Profile Avatar */}
          <div className="relative mb-10 animate-fade-up">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-secondary border-2 border-border shadow-elevated flex items-center justify-center">
              <span className="font-heading text-4xl md:text-5xl text-primary select-none">AR</span>
            </div>
          </div>

          {/* Name */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-4 animate-fade-up animation-delay-100">
            Abu Rayhan Rathi
          </h1>

          {/* Tagline */}
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase mb-8 animate-fade-up animation-delay-200">
            Mathematics Student | Linux Enthusiast
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mb-10 bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-8 py-6 text-base animate-fade-up animation-delay-300"
          >
            Let's Connect
          </Button>

          {/* Social Links */}
          <div className="flex items-center gap-4 animate-fade-up animation-delay-400">
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
