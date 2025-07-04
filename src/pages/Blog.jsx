// src/pages/Blog.jsx
import { BlogSection } from "@/components/BlogSection";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

export const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <StarBackground />
      <main className="pt-24">
        <BlogSection />
      </main>
    </div>
  );
};
