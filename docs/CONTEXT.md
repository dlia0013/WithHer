# WithHer — AI Context File

> Paste this file at the start of a new conversation to get the AI up to speed instantly.
> Keep this file updated as the project evolves.

---

## What this project is

WithHer is a health navigation platform built for migrant women in Australia.
It helps her answer two questions nobody tells you when you arrive:
**where do I go?** and **what will it cost?**

Target user: migrant women in Australia, aged 18–35 (international students, recent migrants).
Built by a migrant woman, for migrant women.

Full spec: `docs/PRD.md`

---

## Product voice

Professional but warm — like a knowledgeable friend explaining the Australian healthcare system.
Never clinical, never condescending, never overwhelming.

---

## Tech stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Frontend | Vue 3 + Vite + Tailwind CSS | ✅ Active |
| Backend | Node.js + Express | ⬜ Not built yet |
| Database | PostgreSQL via Supabase | ⬜ Not built yet |
| Auth | Firebase Auth | ✅ Already integrated |
| AI | Claude API (Anthropic), proxied via backend | ⬜ Not built yet |
| Deploy (FE) | Cloudflare Pages | ✅ Live |
| Deploy (BE) | Render (free tier) | ⬜ Planned |

---

## Brand

**Palette** (defined in `tailwind.config.js`):
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#1B3A5C` | Warm navy — buttons, headings, links |
| `primary-light` | `#e8eef5` | Navy tint — tag backgrounds, icon backgrounds |
| `primary-mid` | `#2d5480` | Hover state for navy |
| `accent` | `#E8B4B8` | Blush — decorative dots, blob shape |
| `accent-light` | `#fdf5f5` | Blush tint — card backgrounds |
| `accent-dark` | `#b8737a` | Blush dark — "Her" in logo, icon colours |
| `background` | `#F9F8F7` | Soft white — page background (set on body) |
| `dark` | `#0D1F33` | Deep navy — primary text |
| `text-mid` | `#4a5a6b` | Secondary text |
| `text-light` | `#8a9bb0` | Tertiary text, labels |
| `surface` | `#FFFFFF` | Cards, navbar |

**Fonts** (loaded in `index.html`):
- `font-lora` — Lora serif, used for headings (H1, H2, section titles)
- `font-dm-sans` — DM Sans, used for all body text and UI

**Icons:** Tabler Icons webfont (`ti ti-*`), loaded via CDN in `index.html`

---

## Key decisions made

- **No in-app booking** — clinic listings link out to HotDoc / HealthEngine
- **No multi-role system** — ProDashboard abandoned
- **Providers data** — start with NHSD API (Australian Government) for base data; bulk billing field starts as `null` (display "call to confirm"); Cleanbill as future data source
- **Triage tool** — static content loads instantly, Claude API called only if user adds extra detail
- **Raw SQL** — not using Prisma or ORM
- **Bootstrap removed** — entire app is now pure Tailwind CSS
- **Homepage CTA** — primary action goes to `/guide` (triage tool), not `/learn`

---

## Database schema (planned, not built yet)

```sql
users               -- Firebase handles auth; this stores profile info
  id, firebase_uid, email, preferred_lang, created_at

providers           -- Clinic listings
  id, name, address, suburb, state, languages (TEXT[]),
  bulk_billing, telehealth, hotdoc_url, healthengine_url,
  source ('manual' | 'self_registered'), created_at

guides              -- Health guide articles
  id, title, content, category, language,
  author_id, status ('draft' | 'published'), created_at, updated_at

triage_situations   -- Triage tool content
  id, situation_key, title, static_content, ai_prompt, created_at
```

---

## Planned API routes (not built yet)

```
GET  /api/providers          list clinics (filterable)
GET  /api/providers/:id      single clinic
GET  /api/guides             list published guides
GET  /api/guides/:id         single guide
GET  /api/triage             list triage situations
GET  /api/triage/:key        single situation
POST /api/triage/ask         send to Claude API, return AI response
GET  /api/users/me           current user profile (auth required)
PUT  /api/users/me           update profile (auth required)
```

---

## Router (`src/router/index.js`)

```
/          HomeView.vue
/guide     Triage tool (to build)
/learn     LearnExplore.vue
/care      FindCare.vue
/community CommunitySupport.vue
/about     AboutUs.vue
/hub       MyHealthHub.vue        (requiresAuth)
/auth      LoginRegister.vue
/map       NearbyCareMap.vue
/providers/:id        ProviderDetails.vue
/providers/:id/book   AppointmentBooking.vue
```

---

## What's done

- `src/views/HomeView.vue` — fully reworked in Tailwind
  - New slogan: "Making Australian healthcare make sense — for you."
  - Hero speaks to two core fears (where to go, what it costs)
  - Trust section (government sources, languages, cost transparency)
  - Feature cards rewritten with problem-first copy
  - Primary CTA → `/guide`
- `src/App.vue` — Bootstrap removed, pure Tailwind navbar
  - Mobile menu with Vue `ref` toggle + `<Transition>` animation
  - Logged in/out states handled
- `tailwind.config.js` — brand colours, fonts, morph keyframes
- `postcss.config.js` — required for Tailwind v3 to compile
- `src/assets/main.css` — Tailwind directives, removed Vue scaffold defaults
- `index.html` — correct Google Fonts (Lora italic included), Tabler Icons CDN
- `docs/PRD.md` — full product requirements document
- `README.md` — updated, no Bootstrap, no fake stats

---

## What's next (in order)

1. **`/guide` — Triage tool** ← current priority
   - 4 situation cards (unwell / cost concern / bill confusion / checkup)
   - Static content panel loads on selection
   - Optional: text input → Claude API for personalised advice
   - Related guides shown at bottom

2. **`/learn` — Health guides**
   - Article list with category filter
   - Single article view (`/learn/:id`)
   - Static content for now, backend later

3. **`/care` — Find care**
   - Clinic search with filters (bulk billing, language, telehealth)
   - Links out to HotDoc / HealthEngine
   - NHSD API integration

4. **Backend** — Node.js + Express + Supabase
   - Set up after frontend content is solid

5. **Claude API integration**
   - Triage `/ask` endpoint
   - Backend proxy (API key never in frontend)

---

## Files that still need work

- `src/views/LearnExplore.vue` — needs content rework
- `src/views/FindCare.vue` — needs filter UI + NHSD API
- `src/views/CommunitySupport.vue` — needs content
- `src/views/MyHealthHub.vue` — needs design rework
- `src/views/AboutUs.vue` — needs content
- `src/components/LoginRegister.vue` — may need style update

---

## How to start a new AI conversation

Paste this file, then say what you want to work on. Example:

> "I'm continuing the WithHer project. Here's the context file.
> Today I want to build the `/guide` triage page."

---

*Last updated: May 2026*