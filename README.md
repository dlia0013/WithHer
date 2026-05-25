# WithHer

> *"Making Australian healthcare make sense — for you."*

WithHer is a health navigation platform built for migrant women in Australia. It helps her answer the two questions nobody tells you when you arrive: **where do I go?** and **what will it cost?**

Built by a migrant woman, for migrant women.

---

## The Problem

Australia's healthcare system works completely differently from most countries. The confusion doesn't go away with time — it comes back every time you face a new health situation.

Two fears drive this:
- **Not knowing where to go** — GP, emergency room, or pharmacy?
- **Not knowing what it will cost** — bulk billing, Medicare gaps, out-of-pocket fees

WithHer addresses both.

---

## Features

| Feature | Status |
|---------|--------|
| **Triage tool** — answer a few questions, get told exactly where to go | 🔄 In progress |
| **Find care** — search clinics filtered by bulk billing, language, telehealth | 🔄 In progress |
| **Health guides** — plain language explainers on Medicare, costs, and more | 🔄 In progress |
| **My health hub** — save clinics, track your health checklist | 🔄 In progress |
| **Community** — connect with other migrant women navigating the same system | ⬜ Planned |

Health content sourced from Australian Government health authorities.

---

## Tech Stack

**Frontend**
- Vue 3 + Vite
- Tailwind CSS

**Backend** *(in progress)*
- Node.js + Express
- PostgreSQL (Supabase)

**AI**
- Claude API (Anthropic) — powers the triage personalisation feature

**Auth & Deployment**
- Firebase Authentication
- Cloudflare Pages (frontend)
- Render (backend, coming)

---

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Backend setup instructions will be added as the API is built out.

---

## Project Structure

```
withher/
├── frontend/          # Vue 3 app
│   ├── src/
│   │   ├── views/     # Page components
│   │   ├── components/
│   │   ├── router/
│   │   ├── stores/    # Pinia state
│   │   └── services/  # Firebase, API calls
├── backend/           # Node.js + Express (coming)
└── docs/
    └── PRD.md         # Product requirements document
```

---

## Design Principles

- **Warm, not clinical** — this is a stressful topic; the design should reduce anxiety
- **Plain language always** — if a 16-year-old couldn't understand it, rewrite it
- **Mobile-first** — she's probably on her phone
- **One thing at a time** — never overwhelm with choices
- **Built for her** — not gender-neutral, not trying to serve everyone

---

## Status

This project is under active development. See [`docs/PRD.md`](docs/PRD.md) for the full product roadmap and technical decisions.