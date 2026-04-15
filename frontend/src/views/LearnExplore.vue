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

<style>
.lx-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 16px;
}

.lx-card {
  border: 1px solid rgba(0,0,0,.06);
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
}
.lx-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
  border-color: rgba(0,0,0,.12);
}

.lx-badge {
  background: #f1f3f5;
  color: #495057;
  font-weight: 600;
}

.lx-line-2 {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.lx-line-3 {
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}

@media (max-width: 576px) {
  .lx-container { padding: 12px; }
}
</style>