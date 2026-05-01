import { useState }          from "react";
import { Link }              from "react-router-dom";
import { useSanity }         from "../lib/useSanity";
import { getDashboards }     from "../lib/queries";
import { urlFor }            from "../lib/imageUrl";

const FILTERS = ["All", "Dashboard", "Excel", "Data Visual", "Report", "Chart"];

export default function DashboardsPage() {
  const { data: items, loading } = useSanity(getDashboards, []);
  const [active,    setActive]   = useState("All");
  const [lightbox,  setLightbox] = useState(null); // holds the item being previewed

  const filtered = active === "All"
    ? items
    : items.filter((d) => d.category === active);

  return (
    <div className="bg-bg min-h-screen pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-2">Visual Work</p>
          <h1
            className="font-display font-extrabold text-text"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Dashboards &amp; Visuals
          </h1>
          <p className="text-muted mt-3 max-w-xl leading-7 text-base">
            Interactive dashboards, data visualisations, Excel models, and analytical
            reports — click any card to expand.
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

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="font-mono text-muted text-sm animate-pulse">Loading visuals…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ border: "1px dashed rgba(255,255,255,0.08)" }}>
            <p className="font-mono text-muted uppercase tracking-widest text-sm">
              No items in this category yet — add them in Sanity Studio
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <DashboardCard
                key={item.slug}
                item={item}
                onExpand={() => setLightbox(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function DashboardCard({ item, onExpand }) {
  const imageUrl = item.coverImage
    ? urlFor(item.coverImage).width(800).height(500).fit("crop").auto("format").url()
    : null;

  return (
    <div className="project-card gradient-border rounded-sm overflow-hidden flex flex-col">

      {/* Image / preview */}
      <div
        className="relative overflow-hidden cursor-pointer group"
        style={{ height: 220, background: "var(--card)" }}
        onClick={onExpand}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-muted text-xs uppercase tracking-widest">No preview</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.6)" }}>
          <span className="font-mono text-cyan text-xs uppercase tracking-widest border border-cyan px-4 py-2">
            Click to Expand
          </span>
        </div>

        {/* Category badge */}
        {item.category && (
          <span className="absolute top-3 left-3 badge badge-active" style={{ fontSize: "0.55rem" }}>
            {item.category}
          </span>
        )}

        {item.featured && (
          <span className="absolute top-3 right-3 badge" style={{ fontSize: "0.55rem", background: "var(--red)", color: "#fff" }}>
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display font-bold text-text text-base leading-snug">{item.title}</h3>

        {item.description && (
          <p className="text-muted text-sm leading-6 flex-1">{item.description}</p>
        )}

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={onExpand} className="btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.65rem" }}>
            Expand →
          </button>
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary no-underline" style={{ padding: "0.4rem 1rem", fontSize: "0.65rem" }}>
              View Live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  const imageUrl = item.coverImage
    ? urlFor(item.coverImage).width(1600).auto("format").url()
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-screen overflow-y-auto rounded-sm"
        style={{ background: "var(--card)", border: "1px solid var(--border-c)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 font-mono text-muted hover:text-cyan transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
        >
          ✕
        </button>

        {/* Full image */}
        {imageUrl && (
          <img src={imageUrl} alt={item.title} className="w-full object-contain" style={{ maxHeight: "60vh" }} />
        )}

        {/* Embed iframe — for Power BI, Tableau, etc. */}
        {item.embedUrl && (
          <div className="w-full" style={{ height: 500 }}>
            <iframe
              src={item.embedUrl}
              title={item.title}
              className="w-full h-full"
              style={{ border: "none" }}
              allowFullScreen
            />
          </div>
        )}

        {/* Details */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {item.category && <span className="badge badge-active" style={{ fontSize: "0.55rem" }}>{item.category}</span>}
            {item.tags?.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <h2 className="font-display font-extrabold text-text mb-3" style={{ fontSize: "1.5rem" }}>
            {item.title}
          </h2>

          {item.description && (
            <p className="text-muted text-sm leading-7 mb-5">{item.description}</p>
          )}

          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary no-underline">
              Open Live Dashboard ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}