<template>
  <section>
    <h1 class="h3 mb-4">Learn & Explore</h1>
    <p class="text-muted mb-4">
      Evidence-based resources for different life stages (adolescence, reproductive years, menopause).
    </p>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center">
      <div class="col" v-for="item in tips" :key="item.id">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="h6 card-title mb-2">{{ item.title }}</h3>
            <p class="card-text mb-3">{{ item.desc }}</p>
            <span class="badge bg-secondary">{{ item.tag }}</span>
          </div>
          <div class="card-footer bg-transparent">
            <button class="btn btn-sm btn-outline-primary" type="button">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const tips = ref([
  { id: 1, title: 'Menstrual health basics',
    desc: 'Understand cycles, common symptoms, and when to see a GP.',
    tag: 'Adolescence' },
  { id: 2, title: 'Pap smear & screening',
    desc: 'Recommended intervals and how to prepare for the appointment.',
    tag: 'Reproductive' },
  { id: 3, title: 'Contraception options',
    desc: 'Pill, IUD, implant—evidence-based pros and cons.',
    tag: 'Reproductive' },
  { id: 4, title: 'Pelvic floor care',
    desc: 'Daily exercises that support long-term wellbeing.',
    tag: 'All stages' },
  { id: 5, title: 'Perimenopause 101',
    desc: 'Hot flashes, sleep, mood changes—what’s normal?',
    tag: 'Menopause' },
  { id: 6, title: 'Mental health support',
    desc: 'How to spot signs and find culturally safe care.',
    tag: 'Wellbeing' }
])
</script>