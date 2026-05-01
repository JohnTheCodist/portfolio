import { useState }    from "react";
import { useSanity }   from "../lib/useSanity";
import { getProjects } from "../lib/queries";

import ProjectCard     from "../components/ProjectCard";

const FILTERS = ["All", "In Development", "Prototype", "Research", "Concept"];

// Normalise Sanity project → shape ProjectCard expects
function normaliseProject(p) {
  return {
    ...p,
    description: p.description || p.shortDescription || "",
    tags:        Array.isArray(p.tags) ? p.tags : [],
  };
}

export default function ProjectsPage() {
  const { data: raw, loading } = useSanity(getProjects);
  const [active, setActive]    = useState("All");

  const projects = (raw || []).map(normaliseProject);
  const filtered  = active === "All"
    ? projects
    : projects.filter((p) => p.status === active);

  return (
    <div className="bg-bg min-h-screen pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <p className="section-label mb-2">All Work</p>
          <h1
            className="font-display font-extrabold text-text"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Projects
          </h1>
          <p className="text-muted mt-3 max-w-xl leading-7 text-base">
            Strategic case studies, data tools, and product explorations aimed at
            reforming healthcare access infrastructure in Nigeria and across Africa.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={active === f ? "btn-primary" : "btn-outline"}
              style={{ padding: "0.45rem 1.1rem", fontSize: "0.68rem" }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="font-mono text-muted text-sm animate-pulse">Loading projects…</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (
          <div className="text-center py-20" style={{ border: "1px dashed rgba(255,255,255,0.08)" }}>
            <p className="font-mono text-muted uppercase tracking-widest text-sm">
              No projects match this filter yet
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
