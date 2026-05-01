import { useParams, Link }    from "react-router-dom";
import { PortableText }        from "@portabletext/react";
import { useSanity }           from "../lib/useSanity";
import { getProjectBySlug }    from "../lib/queries";
import { urlFor }              from "../lib/imageUrl";
import StockoutChart           from "../components/StockoutChart";

// PortableText renderer for project fullDescription
const ptComponents = {
  block: {
    normal:     ({ children }) => <p className="text-muted text-base leading-8 mb-4">{children}</p>,
    h2:         ({ children }) => <h2 className="font-display font-bold text-text mb-3 mt-8" style={{ fontSize: "1.3rem" }}>{children}</h2>,
    h3:         ({ children }) => <h3 className="font-display font-semibold text-text mb-2 mt-6" style={{ fontSize: "1.1rem" }}>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="p-5 my-4 font-display italic text-text" style={{ borderLeft: "3px solid var(--cyan)", background: "var(--card)" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-text font-bold">{children}</strong>,
    em:     ({ children }) => <em className="italic opacity-90">{children}</em>,
  },
};

// Plain-text field section — Sanity stores these as strings, static data as arrays
function Section({ title, content }) {
  if (!content) return null;

  // Static fallback data sends arrays; Sanity sends plain text strings
  const items = Array.isArray(content)
    ? content
    : content.split("\n").map((l) => l.trim()).filter(Boolean);

  if (!items.length) return null;

  return (
    <div className="mb-10">
      <h2 className="font-display font-bold text-text mb-4" style={{ fontSize: "1.3rem" }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-muted text-sm leading-7">
            <span className="text-cyan flex-shrink-0 font-mono mt-0.5" style={{ fontSize: "0.65rem" }}>◆</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();

  
  const { data: project, loading } = useSanity(
    () => getProjectBySlug(slug),
    null,
    [slug]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-muted text-sm animate-pulse">Loading…</p>
      </div>
    );
  }

  const p = project || null; // Ensure we have a null value instead of undefined if not found

  if (!p) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-muted text-sm">Project not found.</p>
      </div>
    );
  }

  const description = p.description || "";
  const tags = Array.isArray(p.tags) ? p.tags : [];

  return (
    <div className="bg-bg min-h-screen pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-8">
          <Link to="/projects" className="no-underline hover:text-cyan transition-colors duration-200">
            Projects
          </Link>
          <span>›</span>
          <span className="text-cyan">{p.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <p className="section-label mb-2">
            {p.subtitle && `${p.subtitle} · `}{p.year}
          </p>
          <h1
            className="font-display font-extrabold text-text leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {p.title}
          </h1>
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </header>

{/* Summary callout */}
<div className="mb-10 p-6" style={{ background: "var(--card)", borderLeft: "3px solid var(--cyan)" }}>
  <p className="text-text text-base leading-8">{description}</p>
  <div className="flex gap-8 mt-5 flex-wrap items-end">
    {[
      { label: "Status", value: p.status, cls: "text-cyan" },
      { label: "Impact", value: p.impact, cls: "text-text" },
      { label: "Year",   value: p.year,   cls: "text-text" },
    ].filter((x) => x.value).map(({ label, value, cls }) => (
      <div key={label}>
        <p className="font-mono text-muted uppercase tracking-widest mb-1" style={{ fontSize: "0.6rem" }}>{label}</p>
        <p className={`font-display font-bold ${cls}`}>{value}</p>
      </div>
    ))}

    {p.fullReport && (
      
        <a href={p.fullReport}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline inline-flex items-center gap-2 ml-auto"
        style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}
      >
        Download Full Report →
      </a>
    )}
  </div>
</div>

        {/* Cover Image */}
        {p.coverImage && (
          <div className="mb-10 rounded-sm overflow-hidden border border-[var(--border)]">
            <img
              src={urlFor(p.coverImage).width(800).url()}
              alt={p.title}
              className="w-full object-cover"
            />
          </div>
        )}


        {/* Chart — show if showChart flag set in Sanity, or for the flagship static project */}
        {(p.showChart || p.slug === "drug-stockout-simulator") && (
          <div className="mb-10 p-6 rounded-sm" style={{ background: "var(--card)", border: "1px solid var(--border-c)" }}>
            <p className="section-label mb-4">Data Visualization</p>
            <StockoutChart />
            <p className="font-mono text-muted mt-3" style={{ fontSize: "0.65rem" }}>
              ▲ Placeholder chart — live data integration coming in v2
            </p>
          </div>
        )}

        {/* Full description — PortableText array from Sanity, or plain text from static fallback */}
        {Array.isArray(p.longDescription) && p.longDescription.length > 0 ? (
          <div className="mb-10">
            <PortableText value={p.longDescription} components={ptComponents} />
          </div>
        ) : typeof p.longDescription === "string" && p.longDescription.trim() ? (
          <div className="mb-10">
            <p className="text-muted text-base leading-8">{p.longDescription}</p>
          </div>
        ) : null}

        {/* Detail sections — strings from Sanity or arrays from static data */}
        <Section title="Problem Statement" content={p.problemStatement} />
        <Section title="Methodology"       content={p.methodology} />
        <Section title="Data Sources"      content={p.dataSources} />
        <Section title="Key Findings"      content={p.keyFindings} />
        <Section title="Next Steps"        content={p.nextSteps} />
        {/* Embed URL — iframe embed */}
        {p.embedUrl && (
          <div className="mb-10 aspect-video rounded-sm overflow-hidden border border-[var(--border)]">
            <iframe
              title={`${p.title} embed`}
              className="w-full h-full"
              src={p.embedUrl}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}



        {/* Footer nav */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <Link to="/projects" className="btn-outline">← Back to Projects</Link>
          <Link to="/contact"  className="btn-primary">Collaborate on This →</Link>
        </div>

      </div>
    </div>
  );
}
