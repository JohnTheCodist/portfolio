import { useSanity } from "../lib/useSanity";
import { getPosts }  from "../lib/queries";

import EssayCard     from "../components/EssayCard";

function normalisePost(post, index) {
  return {
    slug:       post.slug,
    title:      post.title,
    date:       post.date
      ? new Date(post.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "",
    readTime:   post.readTime    || "",
    excerpt:    post.excerpt     || "",
    tags:       post.categories  || [],
    featured:   index === 0,
    mainImage:  post.mainImage   || null,
    authorName: post.authorName  || "",
  };
}

export default function EssaysPage() {
  const { data: raw, loading } = useSanity(getPosts, null);

  const essays  = raw ? raw.map(normalisePost): [];
  
  const featured = essays.find((e) => e.featured);
  const rest     = essays.filter((e) => !e.featured);

  return (
    <div className="bg-bg min-h-screen pt-28 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <p className="section-label mb-2">Writing</p>
          <h1
            className="font-display font-extrabold text-text"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Essays &amp; Analysis
          </h1>
          <p className="text-muted mt-3 leading-7 text-base">
            Long-form thinking on healthcare systems, data infrastructure, and the
            product challenges of fixing broken access.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="font-mono text-muted text-sm animate-pulse">Loading essays…</p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-6">
                <p className="section-label mb-4">Featured</p>
                <EssayCard essay={featured} index={0} />
              </div>
            )}

            <div className="my-8" style={{ borderTop: "1px solid var(--border)" }} />

            <div className="flex flex-col gap-4">
              {rest.map((essay, i) => (
                <EssayCard key={essay.slug} essay={essay} index={i + 1} />
              ))}
            </div>

            {essays.length === 0 && (
              <div className="py-10 text-center" style={{ border: "1px dashed rgba(255,255,255,0.06)" }}>
                <p className="font-mono text-muted uppercase tracking-widest text-xs">
                  No posts found in Sanity yet
                </p>
              </div>
            )}

            <div className="mt-6 py-10 text-center" style={{ border: "1px dashed rgba(255,255,255,0.06)" }}>
              <p className="font-mono text-muted uppercase tracking-widest text-xs">
                More essays coming soon
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}