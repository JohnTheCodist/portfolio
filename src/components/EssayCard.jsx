import { Link } from "react-router-dom";

export default function EssayCard({ essay, index }) {
  // Sanity posts use "categories", static data uses "tags" — handle both
  const tags = essay.tags || essay.categories || [];

  return (
    <Link to={`/essays/${essay.slug}`} className="no-underline block">
      <article className="essay-card gradient-border rounded-sm p-6 flex gap-5">

        <span
          className="font-display font-extrabold leading-none flex-shrink-0 select-none"
          style={{ fontSize: "2rem", color: "var(--cyan)", opacity: 0.2 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {essay.date && (
              <span className="font-mono text-muted" style={{ fontSize: "0.65rem" }}>{essay.date}</span>
            )}
            {essay.date && essay.readTime && <span className="text-muted">·</span>}
            {essay.readTime && (
              <span className="font-mono text-muted" style={{ fontSize: "0.65rem" }}>{essay.readTime}</span>
            )}
            {essay.authorName && (
              <>
                <span className="text-muted">·</span>
                <span className="font-mono text-muted" style={{ fontSize: "0.65rem" }}>by {essay.authorName}</span>
              </>
            )}
            {essay.featured && (
              <span className="badge badge-active" style={{ fontSize: "0.55rem" }}>Featured</span>
            )}
          </div>

          <h3 className="font-display font-bold text-lg text-text leading-snug mb-2">
            {essay.title}
          </h3>

          {essay.excerpt && (
            <p className="text-muted text-sm leading-7">{essay.excerpt}</p>
          )}

          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <div className="flex gap-1.5 flex-wrap">
              {tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <span className="font-mono text-cyan" style={{ fontSize: "0.7rem" }}>
              Read Essay →
            </span>
          </div>
        </div>

      </article>
    </Link>
  );
}
