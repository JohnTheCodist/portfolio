# John Adetiloye — Portfolio

Built with **Vite + React + Tailwind + Sanity**.

## Sanity Project Details

| Key | Value |
|-----|-------|
| Project ID | `xx7bq8nu` |
| Dataset | `production` |
| Studio folder | `sanity/portfolio-essays/` |
| Active schema | `post`, `author`, `category`, `blockContent` |

> **Note:** The active Sanity studio uses the standard blog schema — your essays  
> are stored as `post` documents (not `essay`). The frontend fetches `*[_type == "post"]`.

## Sanity Post Fields

When creating posts in your Sanity Studio they map to the essays page:

| Sanity Field | Used as |
|---|---|
| `title` | Essay title |
| `slug` | URL `/essays/your-slug` |
| `publishedAt` | Date shown on card |
| `body` (blockContent) | Full essay body |
| `categories[]` | Tags shown on card |
| `author` | Byline |
| `mainImage` | Optional hero image |

## Running Locally

```bash
npm install
npm run dev
```

## Running Sanity Studio

```bash
cd sanity/portfolio-essays
npx sanity dev
```

## Environment Variables

The `.env` file is pre-configured with your credentials:

```
VITE_SANITY_PROJECT_ID=xx7bq8nu
VITE_SANITY_DATASET=production
VITE_SANITY_API_TOKEN=        ← optional, only needed for private datasets
```

The project ID and dataset are also hardcoded as fallbacks in `src/lib/sanity.js`
so the app works even without the `.env` file.

## How Sanity Fallback Works

Every page tries to fetch from Sanity first. If Sanity returns no data or the
fetch fails, it silently falls back to the static data in `src/data/index.js`.
This means the site always renders — even with an empty Sanity dataset.
