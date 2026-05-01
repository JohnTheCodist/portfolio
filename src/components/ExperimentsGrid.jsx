import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TOOLS = [
  { name: "Python",    level: 85, color: "var(--cyan)" },
  { name: "SQL",       level: 80, color: "var(--cyan)" },
  { name: "Excel",  level: 83, color: "var(--cyan)"  },
  { name: "Power BI",     level: 90, color: "var(--cyan)"  },
  { name: "JavaScript",level: 75, color: "var(--red)" },
];

const TIMELINE = [
  {
    year: "2026",
    label: "DSHub Internship",
    desc: "Data Science & Analytics track. Built malaria outbreak prediction pipeline on 8,000-record dataset.",
    active: true,
  },
   {
    year: "2025",
    label: "AltSchool Africa",
    desc: "Diploma in Data Science/Analytics. Learned the full analytics stack - Python, SQL, ML fundamentals.",
    active: false,
  },
  {
    year: "Prior",
    label: "Pharmacist",
    desc: "Licensed pharmacist. Clinical background informs how I read health data - not just numbers, but patients.",
    active: false,
  },
];

const PILLS = [
  "Health Outcomes Analysis",
  "Epidemiological Data",
  "Clinical Data Pipelines",
  "DHIS2 · NCDC Data",
  "Disease Surveillance",
  "Predictive Modeling",
  "Data Storytelling",
  "NDPR Compliance",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

export default function AboutMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-bg py-24 px-6 md:px-10">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >

        {/* ── Section label ── */}
        <motion.div variants={fadeUp} className="mb-14">
          <p className="section-label mb-2">About</p>
          <h2
            className="font-display font-extrabold text-text"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Pharmacist turned<br />Health Data Analyst
          </h2>
        </motion.div>

        {/* ── Main grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            alignItems: "start",
          }}
        >

          {/* ── Card 1: Bio ── */}
          <motion.div
            variants={fadeUp}
            className="lab-card gradient-border rounded-sm p-6"
            style={{ gridColumn: "span 1" }}
          >
            {/* Avatar initials */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "1.5px solid var(--cyan)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                boxShadow: "0 0 16px rgba(56,217,192,0.15)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "var(--cyan)",
                  letterSpacing: "0.05em",
                }}
              >
                          <img
  src="/images/profile.jpeg"
  alt="JA"
  className="w-11 h-10 rounded-full object-cover"
/>
              </span>
            </div>

            <p className="text-muted text-sm leading-7">
              I'm a licensed pharmacist who pivoted into data science and analytics because I kept seeing
              health systems make decisions without looking at their own data. I trained at{" "}
              <span className="text-text" style={{ fontWeight: 600 }}>AltSchool Africa</span> and
              completed an internship at{" "}
              <span className="text-text" style={{ fontWeight: 600 }}>DSHub</span>, where I built
              predictive models for malaria outbreak likelihood and many more impactful projects across Nigerian states .
            </p>

            <p className="text-muted text-sm leading-7 mt-4">
              My edge is the clinical lens - I don't just clean data, I understand what a lab
              value, a drug dispensing record, or a missed ANC visit actually means for a patient.
            </p>

            {/* Location + availability */}
            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: "0.68rem",
                  fontFamily: "monospace",
                  color: "var(--muted)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "4px 10px",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ color: "var(--cyan)", fontSize: "0.6rem" }}>◉</span>
                Lagos, Nigeria
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: "0.68rem",
                  fontFamily: "monospace",
                  color: "var(--muted)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "4px 10px",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ color: "var(--cyan)", fontSize: "0.6rem" }}>↗</span>
                Open to remote + onsite
              </span>
            </div>
          </motion.div>

          {/* ── Card 2: Tool proficiency ── */}
          <motion.div
            variants={fadeUp}
            className="lab-card gradient-border rounded-sm p-6"
          >
            <p
              className="font-mono text-muted uppercase tracking-widest mb-5"
              style={{ fontSize: "0.6rem" }}
            >
              Tool proficiency
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {TOOLS.map((t) => (
                <div key={t.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontFamily: "monospace",
                        color: "var(--text)",
                      }}
                    >
                      {t.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontFamily: "monospace",
                        color: "var(--muted)",
                      }}
                    >
                      {t.level}%
                    </span>
                  </div>
                  {/* Track */}
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.07)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${t.level}%` } : { width: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        background: t.color,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 3: Timeline ── */}
          <motion.div
            variants={fadeUp}
            className="lab-card gradient-border rounded-sm p-6"
          >
            <p
              className="font-mono text-muted uppercase tracking-widest mb-5"
              style={{ fontSize: "0.6rem" }}
            >
              Journey
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    paddingBottom: i < TIMELINE.length - 1 ? 20 : 0,
                    position: "relative",
                  }}
                >
                  {/* Line */}
                  {i < TIMELINE.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 19,
                        top: 24,
                        bottom: 0,
                        width: 1,
                        background: "rgba(255,255,255,0.07)",
                      }}
                    />
                  )}
                  {/* Dot */}
                  <div
                    style={{
                      width: 38,
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: item.active ? "var(--cyan)" : "rgba(255,255,255,0.15)",
                        border: item.active ? "none" : "1px solid rgba(255,255,255,0.2)",
                        boxShadow: item.active ? "0 0 8px rgba(56,217,192,0.4)" : "none",
                        marginTop: 3,
                      }}
                    />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3 }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.6rem",
                          color: item.active ? "var(--cyan)" : "var(--muted)",
                          opacity: 0.8,
                        }}
                      >
                        {item.year}
                      </span>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "var(--text)",
                          fontFamily: "var(--font-display, inherit)",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 4: Focus areas ── */}
          <motion.div
            variants={fadeUp}
            className="lab-card gradient-border rounded-sm p-6"
            style={{ gridColumn: "span 1" }}
          >
            <p
              className="font-mono text-muted uppercase tracking-widest mb-5"
              style={{ fontSize: "0.6rem" }}
            >
              Focus areas
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PILLS.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "monospace",
                    color: i % 2 === 0 ? "var(--cyan)" : "var(--muted)",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(56,217,192,0.2)" : "rgba(255,255,255,0.08)"}`,
                    padding: "5px 10px",
                    borderRadius: 4,
                    letterSpacing: "0.03em",
                  }}
                >
                  {pill}
                </motion.span>
              ))}
            </div>

            {/* Target role callout */}
            <div
              style={{
                marginTop: 20,
                padding: "12px 14px",
                borderRadius: 6,
                borderLeft: "2px solid var(--cyan)",
                background: "rgba(56,217,192,0.04)",
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.62rem",
                  color: "var(--cyan)",
                  marginBottom: 3,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Target role
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--text)", fontWeight: 600 }}>
                Health Data Analyst
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 2, lineHeight: 1.5 }}>
                Hospitals · Health-tech · NGOs · Public health agencies · HMOs
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}