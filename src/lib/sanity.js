import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId:  import.meta.env.VITE_SANITY_PROJECT_ID  || "xx7bq8nu",
  dataset:    import.meta.env.VITE_SANITY_DATASET      || "production",
  apiVersion: "2024-01-01",
  useCdn:     true,
  token:      import.meta.env.VITE_SANITY_API_TOKEN    || undefined,
});
