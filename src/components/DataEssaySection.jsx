import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const INSIGHTS = [
  {
    num: "01",
    text: "Drug stockouts in Nigerian hospitals cause preventable deaths - and most go untracked due to absent data systems.",
  },
  {
    num: "02",
    text: "The gap between procurement decisions and patient outcomes can only be closed with real-time operational data.",
  },
  {
    num: "03",
    text: "Health systems that invest in data infrastructure outperform those that invest only in physical resources.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

export default function DataEssaySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-bg2 py-24 px-6 md:px-10">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >

        <motion.div variants={fadeUp}>
          <p className="section-label mb-3">Manifesto</p>
          <h2
            className="font-display font-extrabold text-text leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Why the Future of Healthcare Systems Depends on{" "}
            <span className="text-cyan">Data</span>
          </h2>

          <p className="text-muted text-base leading-8 mb-4">
            Nigeria's public health infrastructure faces a paradox: billions flow into
            procurement, yet patients routinely encounter empty shelves. The root cause
            isn't underfunding - it's an inability to see what's happening in real-time.
          </p>
          <p className="text-muted text-base leading-8 mb-8">
            When decision-makers operate 90+ spreadsheet data, they're flying
            blind. The solution requires building data infrastructure that makes healthcare
            systems legible to the people who run them.
          </p>

          <Link to="/essays" className="btn-primary">Read the Research →</Link>
        </motion.div>

        <div className="flex flex-col gap-4">
          {INSIGHTS.map((ins) => (
            <motion.div key={ins.num} variants={fadeUp} className="callout flex gap-5 items-start">
              <span
                className="font-display font-extrabold flex-shrink-0 leading-none"
                style={{ fontSize: "1.4rem", color: "var(--cyan)", opacity: 0.35 }}
              >
                {ins.num}
              </span>
              <p className="text-text text-sm leading-7">{ins.text}</p>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            className="mt-2 p-6"
            style={{ background: "rgba(0,255,213,0.03)", border: "1px solid rgba(0,255,213,0.15)" }}
          >
            <p className="font-display italic text-text leading-7 text-base">
          "Without data, you're just another person with an opinion."

            </p>
            <span className="font-mono text-cyan block mt-4" style={{ fontSize: "0.68rem" }}>
              - W. Edwards Deming
            </span>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
