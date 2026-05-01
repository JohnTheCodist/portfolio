import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const STATS = [
  { value: "6,670",   label: "Total records",  accent: "cyan" },
  { value: "664", label: "Low Herfindahl-Hirschman Index",  accent: "#F59E0B" },
  { value: "682",  label: "Total Companies",   accent: "cyan" },
  { value: "ACT",   label: "High Saturation Generics",  accent: "#F59E0B" },
];

const PROOF = [
  { label: "Excel", color: "#1D6F42", icon: "/public/icons/ms-excel-icon.svg" },
  { label: "Power BI", color: "#F2C811", icon: "public/icons/power-bi-icon.svg" },
  { label: "SQL", color: "#336791", icon: "public/icons/mysql-icon.svg" },
  { label: "JavaScript", color: "#F7DF1E", icon: "public/icons/javascript-icon.svg" },
  { label: "Python", color: "#3776AB", icon: "public/icons/python-icon.svg" },
];
const TAGS = ["Healthcare Analysis","Drug Supply Chains","Operational Data","Market Intelligence","Data Storytelling"];

const fadeUp  = { hidden:{ opacity:0, y:20  }, show:{ opacity:1, y:0  } };
const fadeR   = { hidden:{ opacity:0, x:30  }, show:{ opacity:1, x:0  } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-screen grid grid-cols-1 lg:grid-cols-2"
      style={{ background:"var(--bg)" }}
    >
      {/* Grid-line texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:`linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),
                           linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)`,
          backgroundSize:"60px 60px",
        }}
      />

      {/* Orbs — hidden on mobile, they cause overflow */}
      <motion.div className="orb-cyan pointer-events-none absolute rounded-full hidden md:block"
        style={{ width:560, height:560, top:"-80px", left:"-160px" }}
        animate={{ y:[0,-25,0], x:[0,20,0] }}
        transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div className="orb-red pointer-events-none absolute rounded-full hidden md:block"
        style={{ width:700, height:700, bottom:"-200px", right:"-200px" }}
        animate={{ y:[0,22,0], x:[0,-18,0] }}
        transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:1.5 }}
      />

      {/* ── LEFT ── */}
      <motion.div
        className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-28 pb-10 lg:pb-16 relative z-10 lg:border-r"
        style={{ borderColor:"var(--border-c)" }}
        variants={stagger} initial="hidden" animate="show"
      >
        {/* Available pill */}
        <motion.div variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 w-fit"
          style={{ background:"rgba(0,255,213,0.06)", border:"1px solid rgba(0,255,213,0.18)", borderRadius:100 }}>
          <span className="pulse-dot" />
          <span className="font-mono text-cyan uppercase tracking-widest" style={{ fontSize:"0.62rem" }}>
            Open to Collaboration
          </span>
        </motion.div>

        {/* ── UPDATED HEADLINE ── */}
        <motion.h1 variants={fadeUp}
          className="font-display font-extrabold text-text mb-5"
          style={{ fontSize:"clamp(2.4rem,3.6vw,3.6rem)", lineHeight:1.05, letterSpacing:"-0.03em" }}>
          I trained as a<br />
          <span className="text-cyan">pharmacist.</span><br />
          The data showed me<br />
          what <span style={{ color:"var(--red)" }}>clinical work</span> couldn't.
        </motion.h1>

        {/* ── UPDATED SUBTEXT ── */}
        <motion.p variants={fadeUp}
          className="text-muted leading-8 mb-8 max-w-md" style={{ fontSize:"1.05rem" }}>
          Health system shortfall, fragmented markets, hospital failures,pharmaceutical sales- these patterns don't surface in wards.
          They surface in{" "}
          <span style={{ color:"#9090b0", fontWeight:500 }}>registration records, procurement logs, and supply chain gaps</span>{" "}
          at national scale. I build the analytical work to see them.
        </motion.p>

        {/* Proof strip */}
        <motion.div variants={fadeUp}
          className="grid grid-cols-3 sm:grid-cols-5 mb-8"
          style={{ border:"1px solid var(--border-c)", background:"var(--card)" }}>
          {PROOF.map(({ label, color, icon }, i) => (
  <div
    key={label}
    className="px-4 py-4 flex flex-col items-center justify-center text-center"
    style={{
      borderLeft: i > 0 ? "1px solid var(--border-c)" : "none",
      position: "relative",
      overflow: "hidden"
    }}
  >
    {/* background logo glow */}
    <img
      src={icon}
      alt={label}
     style={{
  position: "absolute",
  width: 60,
  height: 60,
  opacity: 0.15,
  filter: "grayscale(1)",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none"
}}
    />

    {/* main label */}
    <p
      className="font-display font-extrabold"
      style={{
        fontSize: "0.85rem",
        color: color
      }}
    >
      {label}
    </p>
  </div>
))}
        </motion.div>

        {/* Domain tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
          {TAGS.map(t => (
            <span key={t}
              className="font-mono uppercase tracking-wider px-3 py-1"
              style={{ border:"1px solid var(--border-c)", color:"#5a5a72", fontSize:"0.6rem",
                       transition:"border-color .2s,color .2s", cursor:"default" }}>
              {t}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <Link to="/projects" className="btn-primary">Explore Projects →</Link>
          <Link to="/essays"   className="btn-outline">Read Essays</Link>
        </motion.div>
      </motion.div>

      {/* ── RIGHT ── */}
      <motion.div
        className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 pt-0 lg:pt-20 pb-16 relative z-10 border-t lg:border-t-0 lg:border-l"
        style={{ borderColor:"var(--border-c)" }}
        variants={fadeR} initial="hidden" animate="show"
        transition={{ duration:0.75, delay:0.3 }}
      >
        <div className="relative">
          {/* Main dashboard card */}
          <div style={{ background:"var(--card)", border:"1px solid var(--border-c)" }}>

            {/* ── UPDATED CARD HEADER ── */}
            <div className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom:"1px solid var(--border-c)" }}>
              <div className="flex flex-col gap-1">
                <span className="font-mono uppercase tracking-widest"
                  style={{ fontSize:"0.55rem", color:"#5a5a72" }}>
                  Nigeria Pharma Intelligence · NAFDAC
                </span>
                <span className="font-display font-bold text-text" style={{ fontSize:"0.9rem" }}>
                  Market Intelligence Dashboard for Pharmaceutical Entry & Growth in Nigeria
                </span>
              </div>

              {/* ── MARKET STATUS INDICATOR (replaces "Live Data" badge) ── */}
              <div
                className="flex items-center gap-2 px-3 py-1.5"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border-c)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,255,213,0.35)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-c)"}
              >
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
                <span className="font-mono uppercase tracking-widest"
                  style={{ fontSize:"0.58rem", color:"#5a5a72", whiteSpace:"nowrap" }}>
                  Market: <span style={{ color:"var(--cyan)", fontWeight:500 }}>Fragmented</span>
                </span>
              </div>
            </div>

            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-2"
              style={{ background:"var(--bg)", borderBottom:"1px solid var(--border-c)" }}>
              <div className="flex gap-1.5">
                {["#FF3C38","#FFAA00","#00FFD5"].map(c => (
                  <span key={c} style={{ width:9, height:9, borderRadius:"50%", background:c, display:"inline-block" }} />
                ))}
              </div>
              <div className="flex items-center gap-2 flex-1 px-3 py-1"
                style={{ background:"var(--card)", border:"1px solid var(--border-c)" }}>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <rect x="0.5" y="4.5" width="7" height="5" rx="1" stroke="#5a5a72" strokeWidth="0.8"/>
                  <path d="M2 4.5V3a2 2 0 014 0v1.5" stroke="#5a5a72" strokeWidth="0.8"/>
                </svg>
                <span className="font-mono" style={{ fontSize:"0.52rem", color:"#5a5a72", letterSpacing:"0.04em" }}>
                  app.powerbi.com/view · Nigeria Pharma Intelligence · NAFDAC
                </span>
              </div>
            </div>

            {/* Power BI iframe */}
            <div style={{ position:"relative", width:"100%", paddingTop:"56.25%" }}>
              <iframe
                title="Nigeria Pharma Intelligence-NAFDAC"
src="https://app.powerbi.com/view?r=eyJrIjoiZDUwM2MxYzQtYjZlYi00OTQ0LWI1NWEtYjRmODFkMDdiZTk2IiwidCI6ImI0YmI0Y2JiLWViNDctNDhlYS1hZWVkLTI1YWM2NjE3NDlmYiJ9&pageName=38f8bcf601b20a541036"
                allowFullScreen
                style={{
                  position:"absolute",
                  top:0,
                  left:0,
                  width:"100%",
                  height:"100%",
                  border:"none"
                }}
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderTop:"1px solid var(--border-c)" }}>
              {STATS.map(({ value, label, accent }, i) => (
                <motion.div key={label}
                  className="relative px-4 py-4"
                  style={{ borderLeft: i > 0 ? "1px solid var(--border-c)" : "none" }}
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.6 + i * 0.07 }}>
                  <p className="font-display font-extrabold text-sm sm:text-base" style={{
                    lineHeight:1,
                    color: accent || "var(--cyan)"
                  }}>
                    {value}
                  </p>
                  <p className="font-mono uppercase tracking-widest mt-1"
                    style={{ fontSize:"0.45rem", color:"#5a5a72" }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Context strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-4 pt-4"
            style={{ borderTop:"1px solid var(--border-c)" }}>
            <span className="font-mono uppercase tracking-widest"
              style={{ fontSize:"0.52rem", color:"#383848" }}>Last updated · Apr 2025</span>
            <div className="flex gap-4">
              {[["Source","NAFDAC"],["Scope","National"],["Model","Predictive"]].map(([k,v]) => (
                <span key={k} className="font-mono" style={{ fontSize:"0.52rem", color:"#383848" }}>
                  {k}: <span style={{ color:"#5a5a72" }}>{v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}