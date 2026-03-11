import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    period: "Aug 2023 — Dec 2024",
    title: "Assistant Teacher (Mathematics)",
    organization: "Ruhunnajat Ideal Madrasha, Narayanganj",
    description: "Taught Mathematics part-time to madrasa students while pursuing my undergraduate degree.",
  },
];

const education = [
  {
    period: "2023 — Present",
    title: "Pursuing Honors in Mathematics",
    institution: "Govt. Shahid Suhrawardy College, Dhaka",
    description: "Pursuing an undergraduate degree in Mathematics.",
  },
  {
    period: "2021 — 2022",
    title: "Higher Secondary Certificate",
    institution: "Dr. Mahbubur Rahman Mollah College, Dhaka",
    description: "Completed HSC with concentration in science and mathematics.",
  },
];

interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem = ({ period, title, subtitle, description, isLast }: TimelineItemProps) => (
  <div className="relative pl-8 pb-8">
    {/* Vertical line */}
    {!isLast && (
      <div className="absolute left-[7px] top-5 bottom-0 w-px bg-border" />
    )}
    {/* Dot */}
    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-accent bg-card" />
    
    <div className="space-y-1">
      <span className="text-xs text-accent font-medium tracking-wide">
        {period}
      </span>
      <h4 className="text-lg font-heading text-primary">{title}</h4>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <p className="text-muted-foreground text-sm pt-1">{description}</p>
    </div>
  </div>
);

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-3 block animate-fade-up">
            Resume
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary animate-fade-up animation-delay-100">
            My Journey
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Education */}
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary">Education</h3>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              {education.map((item, index) => (
                <TimelineItem
                  key={index}
                  period={item.period}
                  title={item.title}
                  subtitle={item.institution}
                  description={item.description}
                  isLast={index === education.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="animate-slide-in-right">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary">Experience</h3>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              {experience.map((item, index) => (
                <TimelineItem
                  key={index}
                  period={item.period}
                  title={item.title}
                  subtitle={item.organization}
                  description={item.description}
                  isLast={index === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
