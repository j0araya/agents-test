# Atlas de Chile — SCRUM-1 SCRUM-3

Interactive landing page for Chile's 16 regions.

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 — `front/`
- **Backend**: Node.js + TypeScript + Express v5 — `backend/`

## Running locally

```bash
# Backend (port 3001)
cd backend && npm run dev

# Frontend (port 5173)
cd front && npm run dev
```

## Jira

Project: [qwerteam (SCRUM)](https://pojectqwerty.atlassian.net/jira/software/projects/SCRUM/boards/1)

## Features

- SVG map of Chile — all 16 regions, clickable, hover highlights
- Dark cartographic aesthetic (navy + earth tones)
- Region detail pages: description, attractions, facts, activities
- REST API: `GET /api/regions`, `GET /api/regions/:slug`
- Mock data for all 16 Chilean regions
