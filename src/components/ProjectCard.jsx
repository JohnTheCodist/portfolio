import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { urlFor } from "../lib/imageUrl";

export default function ProjectCard({ project, large = false }) {
  return (
    <Link to={`/projects/${project.slug}`} className="no-underline block h-full">
      <motion.article
        className="project-card gradient-border rounded-sm p-6 flex flex-col gap-4 h-full"
        whileHover={{
          y: -4,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >

        {/* HEADER */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <span className="section-label">{project.subtitle}</span>

          <span className={`badge ${project.status === "In Development" ? "badge-active" : "badge-muted"}`}>
            {project.status}
          </span>
        </div>

        {/* TITLE */}
        <div>
          <h3 className={`font-display font-extrabold leading-tight text-text mb-2 ${large ? "text-2xl" : "text-xl"}`}>
            {project.title}
          </h3>
          <p className="text-muted text-sm leading-7">{project.description}</p>
        </div>

        {/* COVER IMAGE */}
        {project.coverImage && (
          <div className="w-full aspect-video rounded-sm overflow-hidden border border-[var(--border)]">
            <img
              src={urlFor(project.coverImage).width(600).height(338).url()}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

 
        

        {/* TAGS */}
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* FOOTER */}
        <div
          className="flex items-center justify-between mt-auto pt-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="font-mono text-muted" style={{ fontSize: "0.7rem" }}>
            ⚡ {project.impact}
          </span>

          <span className="btn-outline text-xs" style={{ padding: "0.45rem 1rem" }}>
            View Project →
          </span>
        </div>

      </motion.article>
    </Link>
  );
}