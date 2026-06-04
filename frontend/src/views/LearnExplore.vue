<template>
  <main class="min-h-screen bg-background">
    <div class="max-w-5xl mx-auto px-6 py-12">

      <!-- Header -->
      <div class="mb-10">
        <h1 class="font-lora text-3xl text-dark mb-3">Learn & Explore</h1>
        <p class="text-text-mid text-[15px] max-w-xl">
          Plain-language guides to Australian healthcare — written for women who are new to the system.
        </p>
      </div>

      <!-- Search -->
      <div class="relative mb-6">
        <i class="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-[18px]"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search guides..."
          class="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-[15px] text-dark placeholder:text-text-light focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <!-- Filter bar -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="f in filters"
          :key="f.value"
          @click="activeFilter = f.value"
          :class="[
            'px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 border',
            activeFilter === f.value
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-text-mid border-[#e2e8f0] hover:border-primary hover:text-primary'
          ]"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Article cards -->
      <div v-if="filteredArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          @click="openArticle(article)"
          class="bg-white rounded-2xl p-6 border border-[#e2e8f0] cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 group"
        >
          <!-- Icon + category -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
              <i :class="`ti ${article.icon} text-primary text-[18px]`"></i>
            </div>
            <span class="text-[12px] font-medium text-accent-dark uppercase tracking-wide">
              {{ categoryLabel(article.category) }}
            </span>
          </div>

          <!-- Title + summary -->
          <h2 class="font-lora text-[17px] text-dark mb-2 group-hover:text-primary transition-colors duration-200">
            {{ article.title }}
          </h2>
          <p class="text-text-mid text-[14px] leading-relaxed">{{ article.summary }}</p>

          <!-- Read more -->
          <div class="mt-4 flex items-center gap-1 text-primary text-[13px] font-medium">
            Read guide <i class="ti ti-arrow-right text-[14px]"></i>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20">
        <i class="ti ti-search-off text-text-light text-[40px] mb-4 block"></i>
        <p class="text-text-mid text-[15px]">No guides found for "<span class="text-dark">{{ searchQuery }}</span>"</p>
        <button @click="clearSearch" class="mt-4 text-primary text-[14px] underline">
          Clear search
        </button>
      </div>

    </div>

    <!-- Article drawer -->
    <Transition name="slide">
      <div
        v-if="selectedArticle"
        class="fixed inset-0 z-50 flex justify-end"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-dark/30" @click="selectedArticle = null"></div>

        <!-- Panel -->
        <div class="relative w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl">
          <div class="px-8 py-10">

            <!-- Close -->
            <button
              @click="selectedArticle = null"
              class="mb-8 flex items-center gap-2 text-text-mid text-[14px] hover:text-dark transition-colors"
            >
              <i class="ti ti-arrow-left"></i> Back to guides
            </button>

            <!-- Icon + category -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <i :class="`ti ${selectedArticle.icon} text-primary text-[18px]`"></i>
              </div>
              <span class="text-[12px] font-medium text-accent-dark uppercase tracking-wide">
                {{ categoryLabel(selectedArticle.category) }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="font-lora text-2xl text-dark mb-8">{{ selectedArticle.title }}</h1>

            <!-- Sections -->
            <div class="space-y-6">
              <div v-for="section in selectedArticle.sections" :key="section.heading">
                <h2 class="text-[15px] font-semibold text-primary mb-2">{{ section.heading }}</h2>
                <p class="text-text-mid text-[15px] leading-relaxed">{{ section.detail }}</p>
              </div>
            </div>

            <!-- Source -->
            <div class="mt-10 pt-6 border-t border-[#e2e8f0]">
              <p class="text-[12px] text-text-light mb-1">Source</p>
              <a
                :href="selectedArticle.source.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary text-[13px] underline"
              >{{ selectedArticle.source.label }}</a>
              <p class="text-[12px] text-text-light mt-3">
                This is a plain-language summary. For personal medical advice, always speak to a healthcare professional.
                Last reviewed: {{ selectedArticle.lastReviewed }}.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Transition>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { articles } from '@/data/articles.js'

const searchQuery = ref('')
const activeFilter = ref('all')
const selectedArticle = ref(null)

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Medicare & costs', value: 'medicare' },
  { label: 'Getting care', value: 'getting-care' },
  { label: 'Costs', value: 'costs' },
  { label: "Women's health", value: 'womens' },
  { label: 'Mental health', value: 'mental' },
]

const categoryLabels = {
  'medicare': 'Medicare & costs',
  'getting-care': 'Getting care',
  'costs': 'Costs',
  'womens': "Women's health",
  'mental': 'Mental health',
}

const categoryLabel = (cat) => categoryLabels[cat] || cat

const filteredArticles = computed(() => {
  return articles.filter(a => {
    const matchesFilter = activeFilter.value === 'all' || a.category === activeFilter.value
    const matchesSearch = searchQuery.value === '' ||
      a.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})

const openArticle = (article) => {
  selectedArticle.value = article
}

const clearSearch = () => {
  searchQuery.value = ''
  activeFilter.value = 'all'
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease;
}
.slide-enter-active .relative,
.slide-leave-active .relative {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
}
.slide-enter-from .relative {
  transform: translateX(100%);
}
.slide-leave-to {
  opacity: 0;
}
.slide-leave-to .relative {
  transform: translateX(100%);
}
</style>