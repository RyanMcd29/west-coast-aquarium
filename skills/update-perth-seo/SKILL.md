---
name: update-perth-seo
description: Update and improve SEO metadata (meta title/description, Open Graph/Twitter) for Perth small-business websites, especially Next.js app router pages. Use when asked to identify site pages, extract current SEO metadata, research Perth competitors/keywords, and update or propose improved titles/descriptions.
---

# Update Perth SEO

## Workflow

1. Confirm scope: list of pages to update. If not provided, enumerate `app/**/page.tsx` and `app/**/layout.tsx` and identify public marketing pages vs internal routes.
2. Find SEO entry points: search for `metadata` exports, `generateMetadata`, `lib/seo.ts`, and shared constants. Note whether defaults come from `app/layout.tsx` and whether per-page overrides exist.
3. Extract current metadata: capture current `title`, `description`, and any Open Graph/Twitter fields for each target page. Record file paths and code locations.
4. Understand page intent: read page content to identify primary service, audience, location terms (Perth/WA/suburbs), and unique selling points.
5. Gather keywords:
   - Ask user for new keywords if not supplied.
   - If missing, research Perth competitors and local search patterns with `web.run` and compile 5–10 candidate keywords.
   - Keep one primary keyword plus 2–4 secondary terms per page.
6. Draft improved metadata: follow `references/seo-guidelines.md` for length and phrasing. Ensure each page has unique titles/descriptions and includes location + service. Avoid keyword stuffing and misleading claims.
7. Update code:
   - Prefer existing helper functions in `lib/seo.ts` or shared config.
   - Add page-level `export const metadata` or `generateMetadata` if needed to avoid duplicates.
   - Update Open Graph/Twitter fields when they are present to match the new description.
8. Report changes: provide a table with page, old title/description, new title/description, and keywords used. List files changed.

## Output format

Provide:
- A concise summary of pages updated.
- A table: `Page | Old Title | New Title | Old Description | New Description | Keywords`.
- A list of files modified.

## Notes

- If the user explicitly asks to update without confirmation, proceed to edit files.
- If metadata appears in both layout and page files, prefer page-level uniqueness and keep layout defaults generic.
- For small businesses, prioritize clarity and local intent (e.g., "Perth", "WA", suburb if relevant).
- Use plain sentence case; avoid all-caps or excessive punctuation.
