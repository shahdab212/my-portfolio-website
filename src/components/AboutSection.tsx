import { Calendar, MapPin, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const getAge = () => {
  const birth = new Date(2003, 7, 4); // August 4, 2003
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return `${age} years old`;
};

const personalInfo = [
  { icon: Calendar, label: "Age", value: getAge() },
  { icon: MapPin, label: "Location", value: "Rupganj, Narayanganj" },
  { icon: Globe, label: "Languages", value: "Bengali, English" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-3 block">
            About
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">
            Get to Know Me
          </h2>
        </div>

        {/* Content */}
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h3 className="font-heading text-3xl md:text-4xl text-primary mb-2">
            Hi! I'm Abu Rayhan Rathi
          </h3>
          <p className="text-accent font-medium mb-8 tracking-wide">Mathematics Student · Linux Enthusiast · Python Tinkerer</p>

          <div className="space-y-4 text-foreground/90 leading-relaxed mb-12 text-left">
            <p>
              I study mathematics at Government Shahid Suhrawardy College and
              teach part-time at a madrasa and coaching center — keeping me
              grounded in both theory and practice every day.
            </p>
            <p>
              Outside the classroom, I spend my time automating repetitive tasks
              with Python, tinkering with Linux (Arch, btw), and contributing to
              open-source tools. I believe in building things that are simple,
              purposeful, and lasting — guided by trust in Allah (subhanahu wa ta'ala).
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {personalInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <info.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {info.label}
                  </span>
                  <p className="text-foreground font-medium text-sm">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;