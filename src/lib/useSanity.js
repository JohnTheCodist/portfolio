import { useState, useEffect } from "react";

/**
 * Fetches data from Sanity with automatic fallback to static data.
 * - On success: uses Sanity data if non-empty, otherwise falls back
 * - On error: logs a warning and uses fallback silently (no broken UI)
 *
 * @param {() => Promise<any>} fetchFn  async Sanity query function
 * @param {any}                fallback static data to use when Sanity has nothing
 * @param {any[]}              deps     re-run when these change (e.g. [slug])
 */
export function useSanity(fetchFn, fallback, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchFn()
      .then((result) => {
        if (cancelled) return;
        const isEmpty = Array.isArray(result) ? result.length === 0 : !result;
        setData(isEmpty ? fallback : result);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn("[Sanity] fetch failed — using static fallback:", err.message);
        setData(fallback);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data: data ?? fallback, loading, error };
}
