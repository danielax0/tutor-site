# Top Grades Tutoring — Website

Single-page marketing site for **Daniel Axentii**'s tutoring practice (Mathematics, French, English).

Hosted on: https://topgradestutoring.ca/

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS 3** + **shadcn/ui** (Radix primitives)
- **React Router v6**
- **Formspree** (contact form) · **Calendly** (booking) · **Decap CMS** (content editing at `/admin/`)

## Local development

```bash
bun install        # or: npm install
bun run dev        # serves on http://localhost:8080
```

## Available scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server with HMR |
| `bun run build` | Production build → `dist/` |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | Run ESLint over the source tree |

## Editing site content

All page copy (nav, video embed, about cards, CTA, footer, contact info) lives in **[`src/content/home.json`](src/content/home.json)**. Editing this file is the supported way to update text — no JSX changes required.

Alternatively, visit `/admin/` for a form-based editor powered by Decap CMS. Production writes require an authenticated git-gateway provider (e.g. Netlify Identity). For local editing, run `npx decap-server` against the repo.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which sets up **Bun** (`oven-sh/setup-bun`), runs `bun install --frozen-lockfile && bun run build`, and publishes the `dist/` artifact to **GitHub Pages**. A custom domain is served via DNS pointing at the Pages site.

## Project structure

```
src/
├── pages/Index.tsx          # the entire home page
├── components/
│   ├── ContactForm.tsx      # Formspree-backed contact form
│   └── ui/                  # shadcn/ui primitives
├── content/home.json        # all page copy (single source of truth)
└── index.css                # Tailwind layers + design tokens
public/
├── admin/                   # Decap CMS entry + config
└── favicon.png
```

## Contact form

`src/components/ContactForm.tsx` POSTs JSON to a Formspree endpoint. The destination email is configured on Formspree's dashboard, not in this repository.

## Graphify Knowledge graph (local and optional)

This repo supports a [graphify](https://github.com/safishamsi/graphify) knowledge graph for navigating the codebase. The output lives in `graphify-out/` and is **gitignored** — it's regenerable and machine-specific, so it does not travel with a clone.

To build it locally, run `/graphify` in Claude Code. Re-run after significant changes, or `/graphify --update` to refresh only what changed.

## License

Private. All rights reserved.
