<template>
  <div class="min-h-screen bg-background">

    <!-- Page header -->
    <div class="bg-surface border-b border-gray-100 px-4 py-10 md:py-14">
      <div class="max-w-4xl mx-auto">
        <h1 class="font-lora text-3xl md:text-4xl text-primary mb-3">
          Community & support
        </h1>
        <p class="font-dm-sans text-text-mid text-base md:text-lg max-w-xl">
          Trusted Australian organisations that support migrant and multicultural women.
          You don't have to navigate this alone.
        </p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">

      <!-- Category sections -->
      <div v-for="category in categories" :key="category.label">
        <!-- Category heading -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" :class="category.iconBg">
            <span :class="['ti text-base', category.icon, category.iconColor]"></span>
          </div>
          <h2 class="font-lora text-xl text-dark">{{ category.label }}</h2>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="org in category.orgs"
            :key="org.name"
            class="bg-surface rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div>
              <h3 class="font-dm-sans text-base font-semibold text-dark mb-1">{{ org.name }}</h3>
              <p class="font-dm-sans text-sm text-text-mid leading-relaxed">{{ org.desc }}</p>
            </div>
            <div class="mt-auto">
              <a
                :href="org.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 font-dm-sans text-sm text-primary font-medium hover:underline"
              >
                Visit website <span class="ti ti-external-link text-sm"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom note -->
      <div class="rounded-2xl bg-accent-light border border-accent/20 px-6 py-5">
        <p class="font-dm-sans text-sm text-dark leading-relaxed">
          <span class="ti ti-info-circle text-accent-dark mr-2"></span>
          These organisations are independent of WithHer. We link to them because we believe they genuinely help — but always check that any service is right for your situation before reaching out.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    label: 'Mental health & wellbeing',
    icon: 'ti-heart',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    orgs: [
      {
        name: 'Beyond Blue',
        desc: 'Free mental health support, resources, and community forums available 24/7. Particularly helpful if you\'re feeling anxious, isolated, or overwhelmed after moving to a new country.',
        link: 'https://www.beyondblue.org.au/',
      },
      {
        name: 'Lifeline Australia',
        desc: 'Crisis support and suicide prevention. Call 13 11 14 any time, day or night. Available to everyone in Australia regardless of visa status.',
        link: 'https://www.lifeline.org.au/',
      },
      {
        name: 'Head to Health',
        desc: 'Australian Government\'s mental health gateway — find free and low-cost mental health services near you, including services in other languages.',
        link: 'https://www.headtohealth.gov.au/',
      },
    ],
  },
  {
    label: 'Women\'s health',
    icon: 'ti-gender-female',
    iconBg: 'bg-accent-light',
    iconColor: 'text-accent-dark',
    orgs: [
      {
        name: 'Jean Hailes for Women\'s Health',
        desc: 'Evidence-based, plain-language health information written specifically for women — covering everything from periods and menopause to mental health and nutrition.',
        link: 'https://www.jeanhailes.org.au/',
      },
      {
        name: 'Women\'s Health Victoria',
        desc: 'Advocates for women\'s health across Victoria, with resources on reproductive health, family violence, and cultural safety for migrant women.',
        link: 'https://whv.org.au/',
      },
      {
        name: 'Endometriosis Australia',
        desc: 'Support, education, and awareness for women living with endometriosis — a condition that often goes undiagnosed for years, especially in migrant communities.',
        link: 'https://www.endometriosisaustralia.org/',
      },
    ],
  },
  {
    label: 'Multicultural & migrant support',
    icon: 'ti-world',
    iconBg: 'bg-primary-light',
    iconColor: 'text-primary',
    orgs: [
      {
        name: 'MOSAIC — Multicultural Centre for Women\'s Health',
        desc: 'Specifically supports migrant and refugee women in Australia. Offers health information in multiple languages and advocates for culturally safe healthcare.',
        link: 'https://www.mcwh.com.au/',
      },
      {
        name: 'Settlement Services International (SSI)',
        desc: 'Helps migrants and refugees settle into life in Australia — including health, housing, employment, and community connection.',
        link: 'https://www.ssi.org.au/',
      },
    ],
  },
  {
    label: 'Cancer support',
    icon: 'ti-ribbon',
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    orgs: [
      {
        name: 'Pink Hope',
        desc: 'Empowers women to understand and manage their risk of breast and ovarian cancer. Especially useful if you have a family history and aren\'t sure what screening to do in Australia.',
        link: 'https://pinkhope.org.au/',
      },
      {
        name: 'Cancer Council Australia',
        desc: 'Information, support, and advocacy for all Australians affected by cancer. Free call 13 11 20 for support in your language.',
        link: 'https://www.cancer.org.au/',
      },
    ],
  },
]
</script>