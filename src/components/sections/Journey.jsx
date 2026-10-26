import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FadeIn, Magnetic, RevealText, RollButton, SectionLabel } from "@/components/motion/primitives";
import { Timeline } from "@/components/Timeline";
import { timelineExperiences } from "@/data/experiences";

export const Journey = () => {
  const navigate = useNavigate();

  return (
    <section id="journey" className="relative py-24 sm:py-36">
      <div className="container-x">
        <SectionLabel>Experience</SectionLabel>
        <div className="mb-20 mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="display text-4xl sm:text-6xl">
            <RevealText text="Recent roles" />
          </h2>
          <FadeIn className="max-w-sm text-muted">
            Teaching, leading, building and selling — the most recent chapters. The full story lives on its own page.
          </FadeIn>
        </div>

        <Timeline items={timelineExperiences.slice(0, 5)} />

        <div className="mt-20 flex justify-center">
          <Magnetic>
            <RollButton className="btn-ink !px-8 !py-4" onClick={() => navigate("/experience")}>
              See the full journey <ArrowRight size={16} />
            </RollButton>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
