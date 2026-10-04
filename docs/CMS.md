# Azure Properties: content management (Sanity)

The client edits content at **`https://<your-domain>/studio`**. The site reads it from Sanity; until a Sanity
project is connected it shows the built-in content in `src/lib/projects.ts`, so nothing breaks.

## What the client can edit (Projects page)
| Where in the Studio | What |
| --- | --- |
| Projects → Residential buildings / Villas / Commercial | Add, edit, delete and **drag to reorder** buildings. Each has Title, Tag line, Gallery (many images, drag to reorder), Amenities (tick the ones that apply), Description (blank line = new paragraph). Residential buildings also have an optional badge such as "Under Construction". |
| Projects → Amenities (icons) | The library behind the amenity checkboxes (23 icons today). Add a new amenity by uploading an SVG. |
| Projects → Projects page text | Top heading and image, and the heading and line above the Residential and Villas sections. |

A category with no buildings is hidden (and its "Explore…" link on the Projects page disappears).
Editors work on a **draft** and click **Publish**; the site updates within seconds.

## One-time setup (developer)
1. Create the project (under the **client's** Sanity account so they own the data): https://www.sanity.io/manage → *Create project* → dataset `production`.
2. In the project: **API → CORS origins**, add `http://localhost:3000` and the live domain, both with *Allow credentials*.
3. **API → Tokens**: create a *Viewer* token (draft preview) and an *Editor* token (seeding only; delete it afterwards).
4. Copy `.env.example` to `.env.local` and fill in the project id, tokens and a random `SANITY_REVALIDATE_SECRET`.
5. Copy the current content in: `npm run seed:dry` (preview) then `npm run seed`. It uploads the 23 amenity icons, all building images and creates the 11 buildings and the page text. Safe to re-run.
6. **API → Webhooks → Create**: URL `https://<your-domain>/api/revalidate`, trigger on *Create, Update, Delete*, filter `_type in ["building","amenity","projectsPage"]`, projection `{_type}`, secret = `SANITY_REVALIDATE_SECRET`.
7. **Members**: invite the client team with the *Editor* role.

## Hosting on cPanel (Node.js App)
- cPanel → *Setup Node.js App* → Node 20+, application root = the project folder, startup file = `server.js` (included; serves the production build).
- Set the same environment variables as `.env.local` in the app's settings.
- Deploy: `npm ci && npm run build`, then restart the app in cPanel.
- Publishing content needs **no redeploy**: the webhook refreshes the pages.

## Notes
- Amenities show in the order they were ticked on that building.
- Draft preview: open **Presentation** in the Studio to see unpublished changes on the real page.
