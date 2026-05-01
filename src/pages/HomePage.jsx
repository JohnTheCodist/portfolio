import { Link }              from "react-router-dom";
import { motion }            from "framer-motion";
import { useInView }         from "framer-motion";
import { useRef }            from "react";
import { useSanity }         from "../lib/useSanity";
import { getProjects }       from "../lib/queries";

import HeroSection           from "../components/HeroSection";
import Ticker                from "../components/Ticker";
import ProjectCard           from "../components/ProjectCard";
import DataEssaySection      from "../components/DataEssaySection";
import ExperimentsGrid       from "../components/ExperimentsGrid";
import ContactForm           from "../components/ContactForm";

function normaliseProject(p) {
  return { ...p, slug: p.slug?.current ?? p.slug ?? "",description: p.description || p.shortDescription || "", tags: Array.isArray(p.tags) ? p.tags : [] };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } },
};

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >

      {children}
    </motion.div>
  );
}

function CaseStudiesSection() {
  const { data: raw } = useSanity(getProjects);
  const projects = (raw || []).map(normaliseProject);
  const featured = projects.slice(0, 2);

  return (
    <section className="bg-bg py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-12">
            <p className="section-label mb-2">Strategic Work</p>
            <h2
              className="font-display font-extrabold text-text"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Case Studies
            </h2>
            <p className="text-muted mt-2 text-base max-w-lg leading-7">
              Deep-dive analyses and product explorations at the intersection of data
              infrastructure and healthcare access.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <ProjectCard project={p} large />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link to="/projects" className="btn-outline">View All Projects →</Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <CaseStudiesSection />
      <DataEssaySection />
      <ExperimentsGrid />
      <ContactForm />
    </>
  );
}
