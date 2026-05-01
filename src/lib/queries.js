import { sanity } from "./sanity";

// ─────────────────────────────────────────────────────────────────────────────
// SANITY SCHEMA FACTS (project: xx7bq8nu / dataset: production)
//
//  TYPE: "post"  ← this is what your Sanity studio actually uses for essays
//    - title        string
//    - slug         slug   → slug.current
//    - publishedAt  datetime
//    - body         blockContent (array of blocks + images)
//    - author       reference → author.name
//    - categories   array of references → category.title
//    - mainImage    image
//
//  TYPE: "project"  ← custom schema in /sanity/schemas/project.js
//    - title            string
//    - slug             slug
//    - subtitle         string
//    - description      text
//    - longDescription  text
//    - coverImage       image
//    - embedUrl         url
//    - fullReport       file
//    - year             string
//    - tags             array<string>
//    - status           string
//    - impact           string
//    - featured         boolean
//    - showChart        boolean
//    - problemStatement text
//    - methodology      text
//    - dataSources      text
//    - keyFindings      text
//    - nextSteps        text
// ─────────────────────────────────────────────────────────────────────────────

// ── Posts (used as "Essays") ──────────────────────────────────────────────────

export async function getPosts() {
  return sanity.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      "slug":        slug.current,
      title,
      "date":        publishedAt,
      "excerpt":     array::join(string::split((pt::text(body)), "")[0..200], "") + "...",
      "authorName":  author->name,
      "categories":  categories[]->title,
      mainImage
    }
  `);
}

export async function getPostBySlug(slug) {
  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      "slug":        slug.current,
      title,
      "date":        publishedAt,
      "authorName":  author->name,
      "categories":  categories[]->title,
      mainImage,
      body
    }`,
    { slug }
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects() {
  return sanity.fetch(`
    *[_type == "project"] | order(year desc) {
      "slug":        slug.current,
      title,
      subtitle,
      description,
      coverImage,
      tags,
      status,
      impact,
      year,
      featured,
      showChart
    }
  `);
}

export async function getProjectBySlug(slug) {
  return sanity.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      "slug":             slug.current,
      title,
      subtitle,
      description,
      longDescription,
      coverImage,
      tags,
      status,
      impact,
      year,
      featured,
      showChart,
      problemStatement,
      methodology,
      dataSources,
      keyFindings,
      nextSteps,
      embedUrl,
      "fullReport": coalesce(fullReport.asset->url, "")
    }`,
    { slug }
  );
}


// ── Dashboards ────────────────────────────────────────────────────────────────

export async function getDashboards() {
  return sanity.fetch(`
    *[_type == "dashboard"] | order(order asc, _createdAt desc) {
      "slug":        slug.current,
      title,
      category,
      description,
      coverImage,
      images,
      liveUrl,
      embedUrl,
      tags,
      featured,
      order
    }
  `);
}

export async function getDashboardBySlug(slug) {
  return sanity.fetch(
    `*[_type == "dashboard" && slug.current == $slug][0] {
      "slug":      slug.current,
      title,
      category,
      description,
      coverImage,
      images,
      liveUrl,
      embedUrl,
      tags,
      featured
    }`,
    { slug }
  );
}