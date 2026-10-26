import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/chrome/PageTransition";
import { RevealText, SectionLabel } from "@/components/motion/primitives";

export const Blog = () => (
  <PageTransition label="Blog">
    <main className="flex min-h-[80svh] flex-col justify-center pt-32">
      <div className="container-x">
        <SectionLabel>Blog</SectionLabel>
        <h1 className="display mt-5 text-6xl sm:text-8xl">
          <RevealText text="Blog" delay={0.6} />
        </h1>
        <motion.div
          className="mt-10 max-w-lg rounded-lg border border-dashed border-line p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <p className="font-medium">No posts yet.</p>
          <p className="mt-1 text-muted">
            I haven't published anything here so far. In the meantime, my projects and experience are on the home page.
          </p>
          <Link to="/" className="btn-ghost mt-5">
            <ArrowLeft size={15} /> Back to home
          </Link>
        </motion.div>
      </div>
    </main>
  </PageTransition>
);
