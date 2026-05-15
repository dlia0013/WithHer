<template>
  <div class="home">

    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <div class="hero-tag">For migrant women in Australia</div>
        <h1>Health care that <em>actually</em> makes sense</h1>
        <p class="hero-sub">
          Australia's health system is confusing — especially when you're new.
          WithHer guides you through it, in plain language, one step at a time.
        </p>
        <div class="hero-actions">
          <RouterLink to="/learn" class="btn-hero">Start your guide →</RouterLink>
          <RouterLink to="/care" class="btn-ghost">Find a doctor</RouterLink>
        </div>
      </div>

      <div class="hero-visual">
        <div class="blob-bg" />

        <div class="card-float card1">
          <div class="card-icon"><i class="ti ti-heart-handshake" aria-hidden="true" /></div>
          <div class="card-label">Bulk billing</div>
          <div class="card-value primary">Free appointment</div>
          <div class="checklist-row">
            <div class="check-dot"><i class="ti ti-check" /></div>
            No out-of-pocket cost
          </div>
        </div>

        <div class="card-float card2">
          <div class="card-label">Speaks your language</div>
          <div class="pill-list">
            <span class="pill-item">普通话</span>
            <span class="pill-item">हिन्दी</span>
            <span class="pill-item">Tiếng Việt</span>
          </div>
        </div>

        <div class="card-float card3">
          <div class="card-icon card-icon--accent"><i class="ti ti-calendar-check" aria-hidden="true" /></div>
          <div class="card-label">Next available</div>
          <div class="card-value">Today, 3pm</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="section-eyebrow">Core features</div>
      <div class="section-title">Everything you need to start</div>
      <p class="section-sub">No jargon. No assumptions. Just clear, honest guidance for where you are right now.</p>

      <div class="feature-grid">
        <RouterLink
          v-for="feature in features"
          :key="feature.name"
          :to="feature.route"
          class="feature-card"
          :class="feature.variant"
        >
          <div class="feature-icon" :class="'icon-' + feature.iconColor">
            <i :class="'ti ti-' + feature.icon" aria-hidden="true" />
          </div>
          <div class="feature-name">{{ feature.name }}</div>
          <p class="feature-desc">{{ feature.desc }}</p>
          <span class="feature-tag" :class="feature.tagClass">{{ feature.tag }}</span>
        </RouterLink>
      </div>

      <!-- Languages strip -->
      <div class="languages-strip">
        <div class="lang-left">
          <div class="lang-title">Find care in your language</div>
          <p class="lang-sub">Search for GPs and clinics that speak your language — no awkward translations needed.</p>
        </div>
        <div class="lang-pills">
          <span v-for="lang in languages" :key="lang" class="lang-pill">{{ lang }}</span>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <h2>You don't have to figure this out alone</h2>
        <p>WithHer is here to help you find your feet in Australia's health system — honestly, warmly, and at your own pace.</p>
        <RouterLink to="/learn" class="cta-btn">Start your guide →</RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
const features = [
  {
    name: 'New to Australia?',
    desc: 'Start here. A step-by-step onboarding guide that explains Medicare, GPs, and everything you need to know first.',
    icon: 'map-pin',
    iconColor: 'navy',
    variant: 'highlight',
    tag: 'Start here',
    tagClass: 'tag-white',
    route: '/learn',
  },
  {
    name: 'Find care near you',
    desc: "Filter by bulk billing, your language, telehealth, and more. No surprises, no extra costs you didn't expect.",
    icon: 'stethoscope',
    iconColor: 'blush',
    variant: '',
    tag: 'Search doctors',
    tagClass: '',
    route: '/care',
  },
  {
    name: 'Your health checklist',
    desc: 'Personalised for your age. Know exactly which screenings and check-ups you should be booking — and when.',
    icon: 'checklist',
    iconColor: 'soft',
    variant: 'accent-card',
    tag: 'For you',
    tagClass: 'tag-navy',
    route: '/hub',
  },
  {
    name: 'Health guides',
    desc: 'Plain language explainers on Medicare, mental health, reproductive health, and more. Written like a knowledgeable friend.',
    icon: 'book-2',
    iconColor: 'blush',
    variant: '',
    tag: 'Read guides',
    tagClass: '',
    route: '/learn',
  },
  {
    name: 'Book appointments',
    desc: 'Find and book your GP, specialist, or telehealth appointment in one place. Confirmation sent straight to your email.',
    icon: 'calendar',
    iconColor: 'blush',
    variant: '',
    tag: 'Coming soon',
    tagClass: 'tag-muted',
    route: '/book',
  },
  {
    name: 'My health hub',
    desc: 'Save your favourite clinics, track your checklist progress, and keep notes about your health journey — all in one place.',
    icon: 'user-heart',
    iconColor: 'blush',
    variant: '',
    tag: 'Sign in to access',
    tagClass: 'tag-muted',
    route: '/hub',
  },
]

const languages = ['普通话', 'हिन्दी', 'Tiếng Việt', '한국어', 'العربية', 'Tagalog', '+ more']
</script>

<style scoped>
.home {
  --primary:       #1B3A5C;
  --primary-light: #e8eef5;
  --primary-mid:   #2d5480;
  --accent:        #E8B4B8;
  --accent-light:  #fdf5f5;
  --accent-dark:   #b8737a;
  --bg:            #F9F8F7;
  --surface:       #FFFFFF;
  --text:          #0D1F33;
  --text-mid:      #4a5a6b;
  --text-light:    #8a9bb0;
  --border:        #e2e8f0;
  --radius:        16px;

  font-family: 'DM Sans', sans-serif;
  color: var(--text);
}

/* ── HERO ─────────────────────────────────────── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 32px;
  align-items: center;
  gap: 48px;
}

.hero-text { padding-right: 16px; }

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 13px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.hero-tag::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

h1 {
  font-family: 'Lora', serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

h1 em { font-style: italic; color: var(--primary); }

.hero-sub {
  font-size: 16px;
  color: var(--text-mid);
  line-height: 1.7;
  margin-bottom: 32px;
  font-weight: 300;
  max-width: 380px;
}

.hero-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }

.btn-hero {
  background: var(--primary);
  color: white;
  padding: 13px 28px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s, transform 0.15s;
}
.btn-hero:hover { background: var(--primary-mid); transform: translateY(-1px); }

.btn-ghost {
  background: transparent;
  color: var(--text-mid);
  border: 0.5px solid var(--border);
  padding: 13px 24px;
  border-radius: 100px;
  font-size: 15px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
}
.btn-ghost:hover { border-color: var(--primary); color: var(--primary); }

/* ── HERO VISUAL ──────────────────────────────── */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.blob-bg {
  position: absolute;
  width: 340px; height: 340px;
  background: var(--accent-light);
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
  50%       { border-radius: 40% 60% 30% 70% / 60% 40% 55% 45%; }
}

.card-float {
  position: absolute;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px 18px;
  box-shadow: 0 2px 16px rgba(13, 31, 51, 0.08);
  font-size: 13px;
}

.card1 { top: 30px; right: 0; width: 168px; }
.card2 { bottom: 50px; left: 0; width: 176px; }
.card3 { top: 50%; right: -20px; transform: translateY(-50%); width: 148px; }

.card-icon         { font-size: 20px; margin-bottom: 6px; color: var(--primary); }
.card-icon--accent { color: var(--accent-dark); }

.card-label  { font-size: 11px; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
.card-value  { font-weight: 500; font-size: 14px; color: var(--text); }
.card-value.primary { color: var(--primary); }

.pill-list  { display: flex; flex-direction: column; gap: 5px; margin-top: 6px; }
.pill-item  { background: var(--primary-light); color: var(--primary); font-size: 12px; padding: 3px 10px; border-radius: 100px; font-weight: 500; }

.checklist-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 13px; color: var(--text-mid); }
.check-dot { width: 16px; height: 16px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--primary); }

/* ── FEATURES ─────────────────────────────────── */
.features {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 32px 64px;
}

.section-eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-light); margin-bottom: 8px; }
.section-title   { font-family: 'Lora', serif; font-size: 28px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.section-sub     { color: var(--text-mid); font-size: 15px; font-weight: 300; margin-bottom: 32px; max-width: 480px; }

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.feature-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 24px;
  border: 0.5px solid var(--border);
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s, box-shadow 0.2s;
}
.feature-card:hover      { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(13,31,51,0.08); }
.feature-card.highlight  { background: var(--primary); border-color: var(--primary); color: white; }
.feature-card.accent-card { background: var(--accent-light); border-color: #f0d0d2; }

.feature-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
  font-size: 18px;
}
.icon-navy  { background: var(--primary-light); color: var(--primary); }
.icon-blush { background: var(--accent-light); color: var(--accent-dark); }
.icon-soft  { background: #eef2f7; color: var(--primary-mid); }

.feature-name { font-weight: 500; font-size: 15px; margin-bottom: 6px; }
.feature-desc { font-size: 13px; color: var(--text-mid); line-height: 1.6; font-weight: 300; }
.highlight .feature-desc { color: rgba(255,255,255,0.72); }

.feature-tag { display: inline-block; margin-top: 12px; font-size: 11px; font-weight: 500; color: var(--primary); background: var(--primary-light); padding: 3px 10px; border-radius: 100px; }
.tag-white { background: rgba(255,255,255,0.18); color: white; }
.tag-navy  { background: var(--primary-light); color: var(--primary); }
.tag-muted { background: #eef0f3; color: var(--text-light); }

/* ── LANGUAGES ────────────────────────────────── */
.languages-strip {
  background: var(--accent-light);
  border-radius: var(--radius);
  padding: 28px 32px;
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.lang-left { flex: 1; min-width: 200px; }
.lang-title { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; margin-bottom: 6px; color: var(--text); }
.lang-sub   { font-size: 13px; color: var(--text-mid); font-weight: 300; }

.lang-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
.lang-pill  { background: var(--surface); border: 0.5px solid #f0d0d2; border-radius: 100px; padding: 6px 14px; font-size: 13px; color: var(--text); }

/* ── CTA ──────────────────────────────────────── */
.cta-section {
  background: var(--primary);
  border-radius: var(--radius);
  padding: 48px 40px;
  text-align: center;
  margin: 16px 0 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: ''; position: absolute;
  top: -80px; right: -80px;
  width: 280px; height: 280px;
  background: rgba(255,255,255,0.04); border-radius: 50%;
}
.cta-section::after {
  content: ''; position: absolute;
  bottom: -60px; left: -40px;
  width: 200px; height: 200px;
  background: rgba(255,255,255,0.04); border-radius: 50%;
}

.cta-section h2 { font-family: 'Lora', serif; font-size: 30px; color: white; font-weight: 600; margin-bottom: 12px; position: relative; z-index: 1; }
.cta-section p  { color: rgba(255,255,255,0.7); font-size: 15px; margin-bottom: 28px; position: relative; z-index: 1; font-weight: 300; }

.cta-btn {
  background: var(--surface);
  color: var(--primary);
  padding: 13px 32px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  position: relative; z-index: 1;
  transition: all 0.2s;
}
.cta-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }

/* ── RESPONSIVE ───────────────────────────────── */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr; 
    padding: 32px 20px;
    gap: 40px;
  }
  h1 { font-size: 32px; }
  .hero-visual { height: 300px; }
  .blob-bg { width: 260px; height: 260px; }
  .card1 { top: 10px; right: 0; }
  .card3 { right: -10px; }

  .features { padding: 48px 20px; }
  .feature-grid { grid-template-columns: 1fr; }

  .languages-strip { flex-direction: column; align-items: flex-start; }
  .lang-pills { justify-content: flex-start; }
}
</style>