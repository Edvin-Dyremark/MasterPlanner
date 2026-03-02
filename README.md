# MasterPlanner

A course planner for LiU (Linköping University) master's students. Plan your semesters by searching and placing courses into a grid organized by period and block.

## Tech Stack

- **Vue 3** — frontend framework
- **Vue Router 4** — hash-based routing for GitHub Pages compatibility
- **Supabase Auth** — user authentication (email/password login & signup)
- **Supabase (PostgreSQL)** — course catalog, user profiles, and plan storage
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

## Features

- **Search & filter** — live text search by course name or code, plus dropdown filters for period, level, and block
- **Add courses** — logged-in users can add new courses to the shared database with code, name, period, block, level, credits, and optional subject
- **Planner grid** — drag courses into a grid organized by year, period, and block
- **Credit tracking** — displays total credits and advanced (A1X) credits

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
