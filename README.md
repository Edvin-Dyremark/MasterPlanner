# MasterPlanner

A course planner for LiU (Linköping University) master's students. Plan your semesters by searching and placing courses into a grid organized by period and block.

## Tech Stack

- **Vue 3** — frontend framework
- **Vue Router 4** — hash-based routing for GitHub Pages compatibility
- **Supabase Auth** — user authentication (email/password login & signup)
- **Supabase (PostgreSQL)** — user profiles and plan storage
- **Local JSON** — course catalog (`src/data/courses.json`)
- **GitHub Pages** — hosting

## Getting Started

```bash
npm install
npm run serve
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run serve` | Start dev server with hot-reload |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Lint and auto-fix |

## Adding Courses

Edit `src/data/courses.json`. Each course object has:

```json
{
  "id": "tddd27",
  "name": "advanced web programming",
  "code": "TDDD27",
  "period": "VT2",
  "level": "A1X",
  "credits": "6",
  "block": "1"
}
```

- `name` — lowercase (used for search matching)
- `code` — uppercase course code
- `period` — `HT1`, `HT2`, `VT1`, `VT2`, or ranges like `HT1-HT2`
- `level` — `G1X`, `G2X`, or `A1X`
- `block` — schedule block (`1`–`4`)

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
