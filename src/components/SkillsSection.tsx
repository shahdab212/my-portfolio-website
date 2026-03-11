import { Code, Terminal, Brain, Sparkles } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Languages",
    skills: ["Python", "C"],
    color: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Terminal,
    title: "Technical",
    skills: ["Linux (Arch)", "Bash Scripting", "Git"],
    color: "from-sky-500/20 to-sky-600/10",
    iconColor: "text-sky-400",
  },

  {
    icon: Brain,
    title: "Core",
    skills: ["Mathematics", "Logic", "Problem Solving"],
    color: "from-violet-500/20 to-violet-600/10",
    iconColor: "text-violet-400",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3 animate-fade-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              Skills
            </span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-primary animate-fade-up animation-delay-100">
            My Arsenal
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto animate-fade-up animation-delay-200">
            Tools and technologies I work with
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border group-hover:border-accent/30 transition-all duration-300 h-full">
                {/* Icon header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                  </div>
                  <h3 className="font-heading text-xl text-primary">{category.title}</h3>
                </div>
                
                {/* Skills list */}
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-foreground/85"
                    >
                      <span className={`w-2 h-2 rounded-full ${category.iconColor} group-hover:scale-125 transition-transform`} 
                        style={{ transitionDelay: `${skillIndex * 50}ms` }}
                      />
                      <span className="text-sm font-medium">{skill}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative corner */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-border/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-border/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
