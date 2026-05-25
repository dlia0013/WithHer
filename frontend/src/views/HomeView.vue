<template>
  <div class="font-dm-sans text-dark">

    <!-- ① HERO -->
    <section class="grid grid-cols-1 md:grid-cols-2 max-w-[1100px] mx-auto px-5 pt-10 pb-12 md:px-8 md:pt-[72px] md:pb-20 items-center gap-12">
      <div>
        <div class="inline-flex items-center gap-1.5 bg-primary-light text-primary text-[13px] font-medium px-3.5 py-[5px] rounded-full mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true"></span>
          For migrant women in Australia
        </div>

        <h1 class="font-lora text-[44px] md:text-[58px] font-semibold leading-[1.15] text-dark mb-6 tracking-[-1px] md:tracking-[-1.5px]">
          Making Australian<br>
          healthcare<br>
          <em class="italic text-primary">make sense</em><br>
          — for you.
        </h1>

        <p class="text-lg text-text-mid leading-[1.75] mb-9 font-light max-w-[420px]">
          Confused about where to go? Worried about the cost?
          You're not alone — and you don't have to figure it out by yourself.
        </p>

        <div class="flex gap-3 items-center flex-wrap">
          <RouterLink
            to="/guide"
            class="bg-primary text-white px-7 py-[14px] rounded-full text-[15px] font-medium no-underline inline-block transition-all duration-200 hover:bg-primary-mid hover:-translate-y-px"
          >
            Get guidance now →
          </RouterLink>
          <RouterLink
            to="/care"
            class="bg-transparent text-text-mid border border-[#e2e8f0] px-6 py-[14px] rounded-full text-[15px] no-underline inline-block transition-all duration-200 hover:border-primary hover:text-primary"
          >
            Find a doctor
          </RouterLink>
        </div>
      </div>

      <!-- Hero visual -->
      <div class="relative flex justify-center items-center h-[320px] md:h-[420px]">
        <!--
          Blob background shape.
          animate-morph is defined in tailwind.config.js keyframes.
          The inline style sets the INITIAL border-radius to match the 0% keyframe —
          without this, the element starts as a rectangle and jumps on first frame.
          Tailwind can't set arbitrary border-radius via utility classes alone,
          so inline style is the right tool here.
        -->
        <div
          class="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] bg-accent-light animate-morph"
          style="border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;"
          aria-hidden="true"
        />

        <!-- card1: Not sure where to go? -->
        <div class="absolute bg-white rounded-2xl px-[18px] py-[14px] shadow-[0_2px_20px_rgba(13,31,51,0.09)] text-[13px] top-[10px] right-0 w-[170px] md:top-6 md:w-48">
          <div class="text-xl mb-1.5 text-primary">
            <i class="ti ti-map-pin-check" aria-hidden="true" />
          </div>
          <div class="text-[11px] text-text-light uppercase tracking-[0.5px] mb-1">Not sure where to go?</div>
          <div class="font-medium text-sm text-primary">We'll tell you</div>
          <div class="flex items-center gap-1.5 mt-2 text-xs text-text-mid">
            <div class="w-4 h-4 flex-shrink-0 rounded-full bg-primary-light flex items-center justify-center text-[9px] text-primary">
              <i class="ti ti-check" aria-hidden="true" />
            </div>
            GP, pharmacy, or emergency
          </div>
        </div>

        <!-- card2: Worried about cost? -->
        <div class="absolute bg-white rounded-2xl px-[18px] py-[14px] shadow-[0_2px_20px_rgba(13,31,51,0.09)] text-[13px] bottom-5 left-0 w-[176px] md:bottom-12 md:w-[196px]">
          <div class="text-xl mb-1.5 text-accent-dark">
            <i class="ti ti-receipt" aria-hidden="true" />
          </div>
          <div class="text-[11px] text-text-light uppercase tracking-[0.5px] mb-1">Worried about cost?</div>
          <div class="font-medium text-sm text-dark">Know before you go</div>
          <div class="flex items-center gap-1.5 mt-2 text-xs text-text-mid">
            <div class="w-4 h-4 flex-shrink-0 rounded-full bg-primary-light flex items-center justify-center text-[9px] text-primary">
              <i class="ti ti-check" aria-hidden="true" />
            </div>
            Bulk billing explained
          </div>
        </div>

        <!-- card3: Trusted sources -->
        <div class="absolute bg-white rounded-2xl px-[18px] py-[14px] shadow-[0_2px_20px_rgba(13,31,51,0.09)] text-[13px] top-1/2 right-[-8px] -translate-y-1/2 w-[150px] md:right-[-16px] md:w-[164px]">
          <div class="text-[11px] text-text-light uppercase tracking-[0.5px] mb-1">Trusted sources</div>
          <div class="font-medium text-primary text-xs leading-[1.4]">
            Australian Government<br>health authorities
          </div>
        </div>
      </div>
    </section>

    <!-- ② TRUST -->
    <section class="border-y border-[#e2e8f0] bg-white py-8 px-5 md:py-10 md:px-8">
      <div class="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="item in trustItems"
          :key="item.headline"
          class="flex gap-4 items-start"
        >
          <div class="w-10 h-10 flex-shrink-0 rounded-[10px] bg-primary-light text-primary flex items-center justify-center text-lg">
            <i :class="'ti ti-' + item.icon" aria-hidden="true" />
          </div>
          <div>
            <div class="text-sm font-semibold text-dark mb-1">{{ item.headline }}</div>
            <div class="text-[13px] text-text-mid font-light leading-[1.6]">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ FEATURES -->
    <section class="max-w-[1100px] mx-auto px-5 py-12 md:px-8 md:py-20 md:pb-16">
      <div class="text-[13px] uppercase tracking-[1.5px] text-text-light mb-2.5">What WithHer does</div>
      <div class="font-lora text-[30px] md:text-[38px] font-semibold text-dark mb-3">Everything in one place</div>
      <p class="text-text-mid text-[15px] md:text-[17px] font-light leading-[1.7] mb-10 max-w-[520px]">
        From "where do I even go?" to finding a bulk-billing clinic near you —
        we've got it covered.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!--
          RouterLink renders as <a>. We use :class with a ternary to
          switch between the highlight (navy) and default (white) card styles.

          Important Tailwind note: never build class names with string
          concatenation like 'bg-' + color — Tailwind's scanner won't
          find them at build time and they won't be included in the CSS.
          Always use complete class strings, like we do in iconColorClasses below.
        -->
        <RouterLink
          v-for="feature in features"
          :key="feature.name"
          :to="feature.route"
          class="rounded-2xl p-6 no-underline block transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(13,31,51,0.08)]"
          :class="feature.variant === 'highlight'
            ? 'bg-primary border border-primary text-white'
            : 'bg-white border border-[#e2e8f0] text-dark'"
        >
          <div
            class="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 text-lg"
            :class="iconColorClasses[feature.iconColor]"
          >
            <i :class="'ti ti-' + feature.icon" aria-hidden="true" />
          </div>
          <div class="font-semibold text-[15px] mb-2">{{ feature.name }}</div>
          <p
            class="text-sm leading-[1.65] font-light"
            :class="feature.variant === 'highlight' ? 'text-white/75' : 'text-text-mid'"
          >
            {{ feature.desc }}
          </p>
          <span
            class="inline-block mt-4 text-[11px] font-medium px-2.5 py-[3px] rounded-full"
            :class="tagClasses[feature.tagClass]"
          >
            {{ feature.tag }}
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- ④ CTA -->
    <section class="max-w-[1100px] mx-auto px-5 pb-16 md:px-8 md:pb-20">
      <div class="bg-primary rounded-2xl py-10 px-6 md:py-14 md:px-12 text-center relative overflow-hidden">
        <div class="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] bg-white/[0.04] rounded-full pointer-events-none" aria-hidden="true" />
        <div class="absolute bottom-[-60px] left-[-40px] w-[220px] h-[220px] bg-white/[0.04] rounded-full pointer-events-none" aria-hidden="true" />

        <h2 class="font-lora text-[28px] md:text-[38px] font-semibold text-white mb-4 relative z-10">
          Not sure where to start?
        </h2>
        <p class="text-white/[0.72] text-[15px] md:text-[17px] font-light leading-[1.7] mb-8 relative z-10 max-w-[440px] mx-auto">
          Tell us what's going on — we'll walk you through it.
          No jargon, no judgment, just clear next steps.
        </p>
        <RouterLink
          to="/guide"
          class="bg-white text-primary py-[14px] px-9 rounded-full text-[15px] font-medium no-underline inline-block relative z-10 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
        >
          Start here →
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
/*
  Tailwind class lookup objects.

  Why this pattern?
  Tailwind scans your files for complete class strings at build time.
  If you write 'bg-' + someVariable, Tailwind won't find 'bg-primary-light'
  and won't include it in the final CSS bundle.
  Solution: store FULL class strings here, then reference them by key.
*/
const iconColorClasses = {
  navy:  'bg-primary-light text-primary',
  blush: 'bg-accent-light text-accent-dark',
  soft:  'bg-[#eef2f7] text-primary-mid',
}

const tagClasses = {
  '':          'text-primary bg-primary-light',
  'tag-white': 'bg-white/20 text-white',
  'tag-muted': 'bg-[#eef0f3] text-text-light',
}

const trustItems = [
  {
    icon: 'shield-check',
    headline: 'Government-backed information',
    label: 'Health content sourced from Australian Government health authorities, including healthdirect.gov.au',
  },
  {
    icon: 'language',
    headline: 'Available in 6+ languages',
    label: 'Find a GP or clinic that speaks your language — no awkward translations needed',
  },
  {
    icon: 'coin',
    headline: "Understand what you'll pay",
    label: 'We explain bulk billing, Medicare, and out-of-pocket costs in plain language — before you book',
  },
]

const features = [
  {
    name: 'Not sure where to go?',
    desc: "GP, emergency room, or pharmacy? Answer a few questions and we'll tell you exactly where to go and what to expect.",
    icon: 'map-pin',
    iconColor: 'navy',
    variant: 'highlight',
    tag: 'Start here',
    tagClass: 'tag-white',
    route: '/guide',
  },
  {
    name: 'Find a bulk-billing clinic',
    desc: 'Search clinics near you filtered by bulk billing, language spoken, and telehealth. Know the costs before you book.',
    icon: 'stethoscope',
    iconColor: 'blush',
    variant: '',
    tag: 'Find care',
    tagClass: '',
    route: '/care',
  },
  {
    name: 'Understand the system',
    desc: "What does Medicare actually cover? Do I need private insurance? Get clear answers — written like a knowledgeable friend, not a government website.",
    icon: 'book-2',
    iconColor: 'soft',
    variant: '',
    tag: 'Read guides',
    tagClass: '',
    route: '/learn',
  },
  {
    name: 'Your health checklist',
    desc: "Which screenings should you be booking at your age? We'll tell you what to prioritise and how to get them covered.",
    icon: 'checklist',
    iconColor: 'blush',
    variant: '',
    tag: 'For you',
    tagClass: '',
    route: '/hub',
  },
  {
    name: 'My health hub',
    desc: 'Save clinics you trust, track your checklist, and keep notes about your health — all in one private place.',
    icon: 'user-heart',
    iconColor: 'blush',
    variant: '',
    tag: 'Sign in to access',
    tagClass: 'tag-muted',
    route: '/hub',
  },
  {
    name: 'Community & support',
    desc: "You're not the only one navigating this. Connect with other migrant women, ask questions, and share what you know.",
    icon: 'users',
    iconColor: 'soft',
    variant: '',
    tag: 'Join the community',
    tagClass: '',
    route: '/community',
  },
]
</script>