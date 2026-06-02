import {
  SiAlpinedotjs,
  SiArduino,
  SiCodeigniter,
  SiCplusplus,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiJavascript,
  SiJupyter,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpenai,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { BarChart3, Bot, BrainCircuit, ChartNoAxesCombined, Code2, DatabaseZap } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Python", icon: SiPython, tone: "text-yellow-500" },
  { name: "JavaScript", icon: SiJavascript, tone: "text-yellow-400" },
  { name: "C++", icon: SiCplusplus, tone: "text-blue-500" },
  { name: "SQL", icon: DatabaseZap, tone: "text-cyan-500" },
  { name: "React", icon: SiReact, tone: "text-sky-400" },
  { name: "Next.js", icon: SiNextdotjs, tone: "text-foreground" },
  { name: "Laravel", icon: SiLaravel, tone: "text-red-500" },
  { name: "CodeIgniter 4", icon: SiCodeigniter, tone: "text-red-600" },
  { name: "Tailwind CSS", icon: SiTailwindcss, tone: "text-cyan-400" },
  { name: "Alpine.js", icon: SiAlpinedotjs, tone: "text-teal-500" },
  { name: "Streamlit", icon: SiStreamlit, tone: "text-red-500" },
  { name: "MySQL", icon: SiMysql, tone: "text-blue-500" },
  { name: "PostgreSQL", icon: SiPostgresql, tone: "text-blue-600" },
  { name: "Supabase", icon: SiSupabase, tone: "text-emerald-500" },
  { name: "Pandas", icon: SiPandas, tone: "text-indigo-500" },
  { name: "NumPy", icon: SiNumpy, tone: "text-blue-500" },
  { name: "Scikit-learn", icon: SiScikitlearn, tone: "text-orange-500" },
  { name: "XGBoost", icon: ChartNoAxesCombined, tone: "text-green-500" },
  { name: "RAG", icon: SiOpenai, tone: "text-emerald-500" },
  { name: "OpenCV", icon: SiOpencv, tone: "text-green-500" },
  { name: "MediaPipe", icon: BrainCircuit, tone: "text-purple-500" },
  { name: "Pose Estimation", icon: Bot, tone: "text-pink-500" },
  { name: "PySerial", icon: SiArduino, tone: "text-teal-500" },
  { name: "Git", icon: SiGit, tone: "text-orange-600" },
  { name: "GitHub", icon: SiGithub, tone: "text-foreground" },
  { name: "Jupyter", icon: SiJupyter, tone: "text-orange-500" },
  { name: "Google Colab", icon: SiGooglecolab, tone: "text-yellow-500" },
  { name: "VS Code", icon: Code2, tone: "text-blue-500" },
  { name: "Power BI", icon: BarChart3, tone: "text-yellow-500" },
  { name: "Figma", icon: SiFigma, tone: "text-pink-500" },
  { name: "Vercel", icon: SiVercel, tone: "text-foreground" },
];

const firstRow = skills.slice(0, 15);
const secondRow = skills.slice(15);

const SkillPill = ({ skill }) => {
  const Icon = skill.icon;

  return (
    <div className="skill-pill">
      <Icon className={cn("h-7 w-7 shrink-0", skill.tone)} />
      <span className="whitespace-nowrap text-sm font-semibold">{skill.name}</span>
    </div>
  );
};

const SkillMarquee = ({ items, reverse = false }) => (
  <div className="skill-marquee" aria-hidden="true">
    <div className={cn("skill-marquee-track", reverse && "skill-marquee-reverse")}>
      {[...items, ...items].map((skill, index) => (
        <SkillPill key={`${skill.name}-${index}`} skill={skill} />
      ))}
    </div>
  </div>
);

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 md:px-24 relative bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My<span className="text-primary text-glow"> Skills</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Tools and technologies I use across AI, data, web development, and creative problem solving.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <SkillMarquee items={firstRow} />
        <SkillMarquee items={secondRow} reverse />
      </div>
    </section>
  );
};
