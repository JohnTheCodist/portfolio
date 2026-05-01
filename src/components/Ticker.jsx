import { motion } from "framer-motion";

const ITEMS = [
  "NAFDAC Datasets",
  "Hospital Operations",
  "Supply Chain Data",
  "Herfindahl-Hirschman Index",
  "Drug Stockout Analysis",
  "Public Health Infrastructure",
  "Data-Driven Policy",
  "Healthcare Analysis",
];

export default function Ticker() {
  const all = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden py-3" style={{ background: "var(--cyan)" }}>
      <motion.div
        className="ticker-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {all.map((item, i) => (
          <motion.span
            key={i}
            className="font-mono font-bold uppercase tracking-widest mr-12 inline-flex items-center"
            style={{ fontSize: "0.7rem", color: "var(--bg)" }}
            whileHover={{
              scale: 1.05,
              color: "rgba(255, 255, 255, 0.9)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              className="inline-block mr-2"
            >
              ◆
            </motion.span>
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
