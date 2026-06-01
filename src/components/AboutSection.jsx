import {
  Bot,
  ChartNoAxesCombined,
  Code2,
  Database,
  GraduationCap,
  Users,
} from "lucide-react";

const focusAreas = [
  {
    title: "AI & Computer Vision",
    description:
      "Building real-time intelligent systems with OpenCV, MediaPipe, pose estimation, video processing, and robotics integration.",
    icon: Bot,
  },
  {
    title: "Data Science",
    description:
      "Developing predictive models, segmentation workflows, dashboards, and interpretable analysis with Python, XGBoost, PCA, and K-Means.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Web Development",
    description:
      "Creating responsive web applications with React, Next.js, Laravel Blade, Tailwind CSS, Supabase, Prisma, and API integrations.",
    icon: Code2,
  },
  {
    title: "Leadership & Product Thinking",
    description:
      "Leading partnerships, fundraising, project execution, and cross-functional teams across campus organizations and technology programs.",
    icon: Users,
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary text-glow">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Informatics Engineering student at Universitas Padjadjaran focused on AI, computer vision,
            machine learning, and practical web systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <div className="space-y-6 text-left">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <GraduationCap size={16} />
              <span className="min-w-0 break-words">Informatics Engineering, Universitas Padjadjaran</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              Turning data, AI, and web ideas into useful products.
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I work across AI-powered applications, computer vision systems, machine learning models,
              and frontend development. My recent projects include mental wellness AI, dysarthria
              classification, a RAG-based learning assistant, credit risk prediction, and a computer
              vision referee robot.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond technical projects, I have experience as a laboratory teaching assistant, data
              science cohort participant, project-based virtual intern, and student organization leader.
              I enjoy combining technical execution with communication, teamwork, and product thinking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#contact" className="cosmic-button text-center">
                Get In Touch
              </a>
              <a
                href="https://drive.google.com/file/d/1Mh-4ENh8hiOMmuFxXW_eGspV4ATJPLdI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="gradient-border bg-card p-5 card-hover">
                  <div className="flex flex-col items-start gap-4 text-left">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{area.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="sm:col-span-2 rounded-lg border border-border bg-card p-5 text-left">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Current Direction</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I am currently strengthening my skills in production-oriented AI systems, data analysis,
                automation, database-backed web apps, and real-world problem solving through projects and
                cohort-based learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
