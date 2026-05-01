import { useParams, Link }  from "react-router-dom";
import { PortableText }      from "@portabletext/react";
import { useSanity }         from "../lib/useSanity";
import { getPostBySlug }     from "../lib/queries";
import { urlFor }            from "../lib/imageUrl";


const ptComponents = {
  block: {
    normal:     ({ children }) => <p className="text-muted text-base leading-8 mb-5">{children}</p>,
    h1:         ({ children }) => <h1 className="font-display font-extrabold text-text mb-4 mt-10" style={{ fontSize: "2rem" }}>{children}</h1>,
    h2:         ({ children }) => <h2 className="font-display font-bold text-text mb-3 mt-8" style={{ fontSize: "1.4rem" }}>{children}</h2>,
    h3:         ({ children }) => <h3 className="font-display font-semibold text-text mb-2 mt-6" style={{ fontSize: "1.15rem" }}>{children}</h3>,
    h4:         ({ children }) => <h4 className="font-display font-semibold text-text mb-2 mt-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="p-5 my-6 font-display italic text-text" style={{ borderLeft: "3px solid var(--cyan)", background: "var(--card)" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-text font-bold">{children}</strong>,
    em:     ({ children }) => <em className="italic opacity-90">{children}</em>,
    link:   ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-cyan underline hover:opacity-80 transition-opacity">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="flex flex-col gap-2 mb-5 ml-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-muted text-sm leading-7">
        <span className="text-cyan flex-shrink-0 mt-1.5" style={{ fontSize: "0.5rem" }}>◆</span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <img
          src={urlFor(value).width(800).auto("format").url()}
          alt={value.alt || ""}
          className="w-full rounded-sm my-6"
          style={{ border: "1px solid var(--border-c)" }}
        />
      );
    },
  },
};

export default function EssayDetail() {
  const { slug } = useParams();

const { data: essay, loading } = useSanity(
  () => getPostBySlug(slug),
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



  if (!essay) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-muted text-sm">Essay not found.</p>
      </div>
    );
  }

  const displayDate = essay.date
    ? (essay.date.includes?.("T")
        ? new Date(essay.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : essay.date)
    : "";

  const heroImageUrl = essay.mainImage
   ? urlFor(essay.mainImage).width(1600).auto("format").url()
    : null;

  return (
    <div className="bg-bg min-h-screen pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-2xl mx-auto">

        <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-8">
          <Link to="/essays" className="no-underline hover:text-cyan transition-colors duration-200">
            Essays
          </Link>
          <span>›</span>
          <span className="text-cyan truncate">{essay.title}</span>
        </nav>

        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {displayDate && <span className="font-mono text-muted text-xs">{displayDate}</span>}
          {essay.authorName && (
            <>
              <span className="text-muted">·</span>
              <span className="font-mono text-muted text-xs">by {essay.authorName}</span>
            </>
          )}
          {essay.readTime && (
            <>
              <span className="text-muted">·</span>
              <span className="font-mono text-muted text-xs">{essay.readTime}</span>
            </>
          )}
        </div>

        <h1
          className="font-display font-extrabold text-text leading-tight mb-6"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
        >
          {essay.title}
        </h1>

        {(essay.tags || essay.categories || []).length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            {(essay.tags || essay.categories || []).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}

        {heroImageUrl && (
          <div className="w-full rounded-sm overflow-hidden mb-10" style={{ border: "1px solid var(--border-c)" }}>
            <img
              src={heroImageUrl}
              alt={essay.title}
            className="w-full object-contain"
style={{ maxHeight: 600 }}
            />
          </div>
        )}

        {essay.excerpt && (
          <div className="p-6 mb-10" style={{ background: "var(--card)", borderLeft: "3px solid var(--cyan)" }}>
            <p className="text-text text-base leading-8 italic">{essay.excerpt}</p>
          </div>
        )}

        {essay.body ? (
          <div className="flex flex-col">
            <PortableText value={essay.body} components={ptComponents} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {["Introduction", "The Problem", "A Better Approach", "Key Insights", "Conclusion"].map((s) => (
              <div key={s}>
                <h2 className="font-display font-bold text-text mb-3" style={{ fontSize: "1.2rem" }}>{s}</h2>
                <div className="p-5" style={{ border: "1px dashed rgba(255,255,255,0.07)", background: "var(--card)" }}>
                  <p className="text-muted text-sm italic font-mono">
                    [Add body content in Sanity Studio to see it here.]
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-14 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <Link to="/essays"  className="btn-outline">← All Essays</Link>
          <Link to="/contact" className="btn-primary">Discuss This →</Link>
        </div>

      </div>
    </div>
  );
}