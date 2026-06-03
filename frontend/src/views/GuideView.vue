<template>
  <div class="guide-page">

    <!-- Hero -->
    <section class="guide-hero">
      <div class="container">
        <p class="guide-eyebrow">Health guide</p>
        <h1 class="guide-heading">What brings you here today?</h1>
        <p class="guide-sub">
          Pick what feels most like your situation — or let us guide you with a quick question.
        </p>
      </div>
    </section>

    <!-- Main content -->
    <section class="guide-body">
      <div class="container">

        <!-- Disclaimer -->
        <div class="disclaimer">
          <i class="ti ti-alert-circle" aria-hidden="true"></i>
          <p>This information is general only and does not replace professional medical advice. If you are unsure, please speak to a GP or pharmacist.</p>
        </div>

        <!-- Filter bar -->
        <div class="filter-row">
          <button
            v-for="f in filters"
            :key="f.key"
            class="filter-btn"
            :class="{ active: activeFilter === f.key }"
            @click="activeFilter = f.key; selectedId = null"
          >{{ f.label }}</button>
        </div>

        <!-- Situation cards -->
        <p class="section-label">I know what I need</p>
        <div class="cards-grid">
          <button
            v-for="sit in filteredSituations"
            :key="sit.id"
            class="sit-card"
            :class="{ active: selectedId === sit.id }"
            @click="selectSituation(sit.id)"
          >
            <i :class="['ti', sit.icon, 'sit-icon']" aria-hidden="true"></i>
            <div class="sit-text">
              <p class="sit-title">{{ sit.title }}</p>
              <p class="sit-sub">{{ sit.subtitle }}</p>
            </div>
            <i class="ti ti-chevron-right sit-arrow" aria-hidden="true"></i>
          </button>
        </div>

        <!-- Divider -->
        <div class="or-divider">
          <span class="or-line"></span>
          <span class="or-text">or, not sure? let us help</span>
          <span class="or-line"></span>
        </div>

        <!-- Guide me button -->
        <button
          v-if="!guideStarted"
          class="guide-me-btn"
          @click="startGuide"
        >
          <span style="display:flex; align-items:center; gap:1.15rem;">
            <i class="ti ti-messages" style="font-size:1.2rem; color:#1B3A5C;" aria-hidden="true"></i>
            <span style="display:flex; flex-direction:column; gap:2px;">
              <strong style="font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:500; color:#0D1F33; line-height:1.3;">Guide me through it</strong>
              <span style="font-family:'DM Sans',sans-serif; font-size:0.78rem; color:#8a9bb0; line-height:1.3;">A few quick questions — 30 seconds</span>
            </span>
          </span>
          <i class="ti ti-arrow-right" style="color:#8a9bb0; font-size:1rem;" aria-hidden="true"></i>
        </button>

        <!-- Guided question -->
        <transition name="fade-up">
          <div v-if="guideStarted && !selectedId" class="guide-chat">
            <div class="chat-bubble">
              <i class="ti ti-sparkles" aria-hidden="true"></i>
              {{ currentQuestion.text }}
            </div>
            <div class="chat-options">
              <button
                v-for="opt in currentQuestion.options"
                :key="opt.situationId"
                class="chat-opt"
                @click="selectSituation(opt.situationId)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </transition>

        <!-- Result panel -->
        <transition name="fade-up">
          <div v-if="selected" class="result-panel">

            <!-- Steps -->
            <div class="result-header">
              <i :class="['ti', selected.icon, 'result-icon']" aria-hidden="true"></i>
              <h2 class="result-title">{{ selected.resultTitle }}</h2>
            </div>

            <div class="steps-list">
              <div
                v-for="(step, i) in selected.steps"
                :key="i"
                class="step-item"
              >
                <span class="step-num">{{ i + 1 }}</span>
                <div class="step-body">
                  <p class="step-heading">{{ step.heading }}</p>
                  <p class="step-detail">{{ step.detail }}</p>
                </div>
              </div>
            </div>

            <!-- Related tags -->
            <div class="result-tags">
              <a
                v-for="tag in selected.tags"
                :key="tag.label"
                :href="tag.href"
                :target="tag.type === 'external' ? '_blank' : null"
                :rel="tag.type === 'external' ? 'noopener noreferrer' : null"
                class="result-tag"
              >{{ tag.label }}</a>
            </div>

            <!-- AI ask more -->
            <div class="ask-more">
              <p class="ask-more-label">
                <i class="ti ti-sparkles" aria-hidden="true"></i>
                Still have questions? Ask our assistant.
              </p>
              <div class="ask-more-input-row">
                <input
                  v-model="userQuestion"
                  class="ask-more-input"
                  type="text"
                  :placeholder="'e.g. ' + selected.aiPrompt.slice(0, 48) + '...'"
                  @keyup.enter="askClaude"
                />
                <button
                  class="ask-more-send"
                  :disabled="aiLoading || !userQuestion.trim()"
                  @click="askClaude"
                >
                  <i v-if="!aiLoading" class="ti ti-send" aria-hidden="true"></i>
                  <i v-else class="ti ti-loader-2 spin" aria-hidden="true"></i>
                </button>
              </div>

              <!-- AI response -->
              <transition name="fade-up">
                <div v-if="aiResponse" class="ai-response">
                  <p class="ai-response-label">WithHer assistant</p>
                  <p class="ai-response-text">{{ aiResponse }}</p>
                </div>
              </transition>

              <transition name="fade-up">
                <p v-if="aiError" class="ai-error">{{ aiError }}</p>
              </transition>
            </div>

            <!-- Reset -->
            <button class="reset-btn" @click="reset">
              <i class="ti ti-arrow-left" aria-hidden="true"></i>
              Start over
            </button>

          </div>
        </transition>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { situations, guideQuestions } from '@/data/situations.js'

const selectedId    = ref(null)
const guideStarted  = ref(false)
const activeFilter  = ref('all')
const userQuestion  = ref('')
const aiResponse    = ref('')
const aiError       = ref('')
const aiLoading     = ref(false)

const filters = [
  { key: 'all',       label: 'All' },
  { key: 'care',      label: 'Getting care' },
  { key: 'cost',      label: 'Costs' },
  { key: 'womens',    label: "Women's health" },
  { key: 'wellbeing', label: 'Wellbeing' },
  { key: 'rights',    label: 'Rights & info' },
]

const filteredSituations = computed(() =>
  activeFilter.value === 'all'
    ? situations
    : situations.filter(s => s.category === activeFilter.value)
)

const selected        = computed(() => situations.find(s => s.id === selectedId.value) || null)
const currentQuestion = computed(() => guideQuestions[0])

function selectSituation(id) {
  selectedId.value   = id
  guideStarted.value = false
  aiResponse.value   = ''
  aiError.value      = ''
  userQuestion.value = ''
  // Smooth scroll to result
  setTimeout(() => {
    document.querySelector('.result-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

function startGuide() {
  guideStarted.value = true
  selectedId.value   = null
}

function reset() {
  selectedId.value   = null
  guideStarted.value = false
  aiResponse.value   = ''
  aiError.value      = ''
  userQuestion.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function askClaude() {
  if (!userQuestion.value.trim() || aiLoading.value) return

  aiLoading.value  = true
  aiResponse.value = ''
  aiError.value    = ''

  const systemPrompt = `You are WithHer, a warm and knowledgeable health navigation assistant for migrant women in Australia.
Your tone is friendly, clear, and never clinical or condescending — like a knowledgeable friend.
Keep responses concise (3-5 sentences max). Focus only on the Australian health system.
Never give a medical diagnosis. Always suggest they see a GP for anything clinical.
Context: the user is asking about "${selected.value?.title}".`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userQuestion.value.trim() }]
      })
    })

    const data = await res.json()

    if (data?.content?.[0]?.text) {
      aiResponse.value = data.content[0].text
    } else {
      aiError.value = 'Something went wrong. Please try again in a moment.'
    }
  } catch {
    aiError.value = 'Could not connect. Please check your internet and try again.'
  } finally {
    aiLoading.value = false
  }
}
</script>

<style scoped>
/* ─── Page layout ─── */
.guide-page {
  min-height: 100vh;
  background-color: #F9F8F7;
}

.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* ─── Hero ─── */
.guide-hero {
  background-color: #F9F8F7;
  padding: 3rem 0 1.5rem;
}

.guide-eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #b8737a;
  margin: 0 0 0.75rem;
}

.guide-heading {
  font-family: 'Lora', serif;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 600;
  color: #0D1F33;
  margin: 0 0 0.75rem;
  line-height: 1.25;
}

.guide-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #4a5a6b;
  margin: 0;
  line-height: 1.6;
  max-width: 480px;
}

/* ─── Body ─── */
.guide-body {
  padding: 2rem 0 4rem;
}

.section-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8a9bb0;
  margin: 0 0 0.75rem;
}

/* ─── Situation cards ─── */
.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
}

.sit-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
  width: 100%;
}

.sit-card:hover {
  border-color: #2d5480;
  background: #f5f8fc;
  transform: translateY(-1px);
}

.sit-card.active {
  border-color: #1B3A5C;
  background: #e8eef5;
}

.sit-icon {
  font-size: 1.25rem;
  color: #1B3A5C;
  min-width: 1.5rem;
}

.sit-text {
  flex: 1;
}

.sit-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0D1F33;
  margin: 0 0 2px;
}

.sit-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  color: #8a9bb0;
  margin: 0;
}

.sit-arrow {
  font-size: 0.9rem;
  color: #8a9bb0;
  transition: transform 0.15s;
}

.sit-card.active .sit-arrow {
  transform: translateX(3px);
  color: #1B3A5C;
}

/* ─── Or divider ─── */
.or-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.or-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.or-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  color: #8a9bb0;
  white-space: nowrap;
}

/* ─── Guide me button ─── */
.guide-me-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  margin-bottom: 2rem;
  text-align: left;
}

.guide-me-btn:hover {
  border-color: #1B3A5C;
  background: #f5f8fc;
}

.guide-me-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.guide-me-inner .ti-messages {
  font-size: 1.2rem;
  color: #1B3A5C;
}

.guide-me-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.guide-me-text strong {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0D1F33;
  line-height: 1.3;
}

.guide-me-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  color: #8a9bb0;
  line-height: 1.3;
}

.guide-me-btn .ti-arrow-right {
  color: #8a9bb0;
  font-size: 1rem;
}

/* ─── Chat guide ─── */
.guide-chat {
  margin-bottom: 1.5rem;
}

.chat-bubble {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e8eef5;
  border-radius: 12px 12px 12px 4px;
  padding: 0.85rem 1rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #1B3A5C;
  margin-bottom: 0.75rem;
}

.chat-bubble .ti-sparkles {
  font-size: 1rem;
  color: #b8737a;
  flex-shrink: 0;
}

.chat-options {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.chat-opt {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  color: #0D1F33;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.chat-opt:hover {
  border-color: #1B3A5C;
  background: #e8eef5;
  color: #1B3A5C;
}

/* ─── Result panel ─── */
.result-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 0.5rem;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f4f8;
}

.result-icon {
  font-size: 1.4rem;
  color: #b8737a;
}

.result-title {
  font-family: 'Lora', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #0D1F33;
  margin: 0;
}

/* ─── Steps ─── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 1.25rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid #f0f4f8;
}

.step-item:last-child {
  border-bottom: none;
}

.step-num {
  min-width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #1B3A5C;
  color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.step-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0D1F33;
  margin: 0 0 4px;
}

.step-detail {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.84rem;
  color: #4a5a6b;
  line-height: 1.6;
  margin: 0;
}

/* ─── Tags ─── */
.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  padding-top: 0.25rem;
}

.result-tag {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  background: #e8eef5;
  color: #1B3A5C;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s;
}

.result-tag:hover {
  background: #ccdaec;
}

/* ─── Ask more ─── */
.ask-more {
  background: #fdf5f5;
  border: 1px solid #f2d9db;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  margin-bottom: 1rem;
}

.ask-more-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #b8737a;
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.ask-more-input-row {
  display: flex;
  gap: 0.5rem;
}

.ask-more-input {
  flex: 1;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: #0D1F33;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
  outline: none;
  transition: border-color 0.15s;
}

.ask-more-input:focus {
  border-color: #1B3A5C;
}

.ask-more-input::placeholder {
  color: #8a9bb0;
}

.ask-more-send {
  background: #1B3A5C;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0 0.9rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
}

.ask-more-send:hover:not(:disabled) {
  background: #2d5480;
}

.ask-more-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ai-response {
  margin-top: 0.9rem;
  padding-top: 0.9rem;
  border-top: 1px solid #f2d9db;
}

.ai-response-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #b8737a;
  margin: 0 0 0.5rem;
}

.ai-response-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: #0D1F33;
  line-height: 1.7;
  margin: 0;
}

.ai-error {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  color: #b8737a;
  margin: 0.75rem 0 0;
}

/* ─── Reset ─── */
.reset-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  color: #8a9bb0;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.reset-btn:hover {
  color: #1B3A5C;
}

/* ─── Transitions ─── */
.fade-up-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* ─── Spinner ─── */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spin {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

/* ─── Mobile ─── */
@media (max-width: 480px) {
  .guide-hero {
    padding: 2rem 0 1rem;
  }
  .result-panel {
    padding: 1.1rem;
  }
}

/* ─── Disclaimer ─── */
.disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: #fdf5f5;
  border: 1px solid #f2d9db;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
}

.disclaimer .ti-alert-circle {
  color: #b8737a;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer p {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  color: #b8737a;
  margin: 0;
  line-height: 1.55;
  font-style: italic;
}

/* ─── Filter bar ─── */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.filter-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #4a5a6b;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: #1B3A5C;
  color: #1B3A5C;
}

.filter-btn.active {
  background: #1B3A5C;
  border-color: #1B3A5C;
  color: #ffffff;
}

</style>