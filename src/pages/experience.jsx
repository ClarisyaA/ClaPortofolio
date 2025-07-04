import { ExperienceSection } from "../components/experienceSection";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

export const Experience = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <StarBackground />
      <main>
        <ExperienceSection />
      </main>
    </div>
  );
};
