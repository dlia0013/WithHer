<template>
  <div class="min-h-screen bg-background">

    <!-- Hero -->
    <div class="bg-surface border-b border-gray-100 px-4 py-14 md:py-20">
      <div class="max-w-2xl mx-auto text-center">
        <p class="font-dm-sans text-sm text-accent-dark font-medium tracking-wide uppercase mb-4">
          About WithHer
        </p>
        <h1 class="font-lora text-3xl md:text-5xl text-primary leading-tight mb-6">
          Built by a migrant woman.<br />For migrant women.
        </h1>
        <p class="font-dm-sans text-text-mid text-base md:text-lg leading-relaxed">
          When I moved to Australia, I didn't know how the health system worked.
          I didn't know what Medicare was, what bulk billing meant, or where to even start.
          I built WithHer because nobody should have to figure this out alone.
        </p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-14 flex flex-col gap-14">

      <!-- The problem -->
      <div class="flex flex-col gap-4">
        <h2 class="font-lora text-2xl text-dark">The problem WithHer solves</h2>
        <p class="font-dm-sans text-text-mid text-base leading-relaxed">
          Australia has excellent healthcare — but it's designed for people who already understand it.
          Most health platforms assume you know what a GP is, that you have a Medicare card, that you
          speak fluent English. For young migrant women, none of that is guaranteed.
        </p>
        <p class="font-dm-sans text-text-mid text-base leading-relaxed">
          WithHer answers the two questions nobody tells you when you arrive:
          <span class="text-dark font-medium"> where do I go</span>, and
          <span class="text-dark font-medium"> what will it cost</span>?
        </p>
      </div>

      <!-- What WithHer does -->
      <div class="flex flex-col gap-5">
        <h2 class="font-lora text-2xl text-dark">What WithHer does</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-surface rounded-2xl border border-gray-100 p-5 flex gap-4"
          >
            <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0" :class="feature.iconBg">
              <span :class="['ti text-base', feature.icon, feature.iconColor]"></span>
            </div>
            <div>
              <h3 class="font-dm-sans text-sm font-semibold text-dark mb-1">{{ feature.title }}</h3>
              <p class="font-dm-sans text-sm text-text-mid leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Who built it -->
      <div class="flex flex-col gap-4">
        <h2 class="font-lora text-2xl text-dark">Who built it</h2>
        <div class="bg-surface rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-14 h-14 rounded-full bg-accent-light flex items-center justify-center shrink-0">
            <span class="ti ti-user text-2xl text-accent-dark"></span>
          </div>
          <div>
            <p class="font-dm-sans text-base font-semibold text-dark mb-1">Leticia Liao</p>
            <p class="font-dm-sans text-sm text-accent-dark font-medium mb-3">
              Founder, designer & developer — all of it
            </p>
            <p class="font-dm-sans text-sm text-text-mid leading-relaxed">
              I'm a migrant woman living in Australia, and I'm part of the exact community WithHer is built for.
              Every product decision — what to build, what to cut, what language to use — is informed by
              that lived experience. WithHer is a solo project: one person, one product, built from scratch.
            </p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">Vue 3 + Vite</span>
              <span class="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">Tailwind CSS</span>
              <span class="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">Firebase Auth</span>
              <span class="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">Firestore</span>
              <span class="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">Node.js + Express</span>
              <span class="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">Cloudflare Pages</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="rounded-2xl bg-accent-light border border-accent/20 px-6 py-5">
        <p class="font-dm-sans text-xs font-semibold text-dark mb-1 uppercase tracking-wide">Disclaimer</p>
        <p class="font-dm-sans text-sm text-text-mid leading-relaxed">
          WithHer provides general health information to help you navigate the Australian healthcare system.
          It is not a substitute for professional medical advice, diagnosis, or treatment.
          Always consult a qualified health professional for personal medical guidance.
        </p>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <p class="font-dm-sans text-text-mid text-base mb-5">
          Ready to find the care you need?
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <router-link
            to="/guide"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-dm-sans text-sm font-medium hover:bg-primary-mid transition"
          >
            Get guidance <span class="ti ti-arrow-right"></span>
          </router-link>
          <router-link
            to="/care"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-dm-sans text-sm font-medium hover:bg-primary-light transition"
          >
            Find care near you
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Get guidance',
    desc: 'Not sure where to start? Answer a few questions and get clear, plain-language next steps.',
    icon: 'ti-map',
    iconBg: 'bg-primary-light',
    iconColor: 'text-primary',
  },
  {
    title: 'Find care',
    desc: 'Search for clinics by suburb, filter by bulk billing, telehealth, and language spoken.',
    icon: 'ti-building-hospital',
    iconBg: 'bg-accent-light',
    iconColor: 'text-accent-dark',
  },
  {
    title: 'Learn',
    desc: 'Plain-language explainers on Medicare, prescriptions, mental health, and more — no jargon.',
    icon: 'ti-book',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Ask a question',
    desc: 'A private, judgment-free space to ask anything about Australian healthcare.',
    icon: 'ti-sparkles',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
]
</script>