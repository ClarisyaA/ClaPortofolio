import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 85, category: "frontend" },
  { name: "JavaScript", level: 75, category: "frontend" },

  // Backend / Programming
  { name: "Python", level: 70, category: "backend" },
  { name: "Java", level: 70, category: "backend" },
  { name: "C++", level: 70, category: "backend" },
  { name: "PHP", level: 70, category: "backend" },
  { name: "MySQL", level: 70, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 75, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
  { name: "VS Code", level: 85, category: "tools" },
  { name: "Canva", level: 90, category: "tools" },
  { name: "Microsoft Office", level: 90, category: "tools" },
  { name: "CapCut", level: 90, category: "tools" },

  // Soft Skills
    { name: "Leadership", level: 90, category: "softskills" },
    { name: "Communication", level: 85, category: "softskills" },
    { name: "Time Management", level: 90, category: "softskills" },
    { name: "Teamwork", level: 85, category: "softskills" },
    { name: "Problem Solving", level: 90, category: "softskills" },
    { name: "Public Speaking", level: 80, category: "softskills" },

];

const categories = ["all", "frontend", "backend", "tools", "softskills"];

export const SkillsSection = () => {
        const [activeCategory, setActiveCategory] = useState("all");

        const filteredSkills = skills.filter((skill) => activeCategory === "all" || skill.category === activeCategory);

    return (
        <section id="skills" className="py-24 px-24 relative bg-secondary/30">
            <div className="container mx-auto maz-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" >
                    My<span className="text-primary text-glow"> Skills</span>
                </h2>

                <div className="flex flex-warp justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button
                        onClick={() => setActiveCategory(category)}
                        key={key} className={cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                            activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground hover:bd-secondary"
                        )}>
                            {category}
                        </button>
                    ))}

                </div>

                <div className="grid grid-col1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill,key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">

                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>

                           <div className="w-full bg-secondary/50 h-2 rounded-lg border-1 border-primary overflow-hidden">
                                <div className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out" 
                                style={{width:skill.level+ "%"}}/>
                            </div>
                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                        </div>                       
                    ))}

                </div>

            </div>
        </section>
    );
};