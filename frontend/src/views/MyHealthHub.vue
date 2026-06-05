<template>
  <div class="min-h-screen bg-background">

    <!-- Page header -->
    <div class="bg-surface border-b border-gray-100 px-4 py-10 md:py-14">
      <div class="max-w-4xl mx-auto">
        <p class="font-dm-sans text-sm text-text-light mb-1">Welcome back</p>
        <h1 class="font-lora text-3xl md:text-4xl text-primary">
          {{ firstName }} 👋
        </h1>
        <p class="font-dm-sans text-text-mid text-base mt-2">
          This is your private space — ask questions, save what matters, and take care of yourself.
        </p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">

      <!-- ── Ask a question (center hero) ── -->
      <div class="bg-surface rounded-2xl border border-gray-100 p-6 md:p-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center shrink-0">
            <span class="ti ti-sparkles text-accent-dark text-lg"></span>
          </div>
          <h2 class="font-lora text-xl text-dark">Ask a health question</h2>
        </div>
        <p class="font-dm-sans text-sm text-text-mid mb-5 ml-12">
          No judgment, no jargon. Ask anything about Australian healthcare — privately, in plain English.
        </p>

        <!-- Question input -->
        <div class="relative">
          <textarea
            v-model="question"
            :disabled="asking"
            rows="3"
            placeholder="e.g. What is a Mental Health Treatment Plan and how do I get one?"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-background font-dm-sans text-sm text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition resize-none disabled:opacity-60"
          ></textarea>
        </div>

        <div class="flex items-center justify-between mt-3">
          <p class="font-dm-sans text-xs text-text-light">
            <span class="ti ti-lock mr-1"></span>Your questions are private and not shared.
          </p>
          <button
            @click="askQuestion"
            :disabled="asking || !question.trim()"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-dm-sans text-sm font-medium hover:bg-primary-mid transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span :class="['ti text-sm', asking ? 'ti-loader-2 animate-spin' : 'ti-send']"></span>
            {{ asking ? 'Thinking…' : 'Ask' }}
          </button>
        </div>

        <!-- Answer area -->
        <transition name="fade">
          <div
            v-if="answer"
            class="mt-5 p-4 rounded-xl bg-accent-light border border-accent/30"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="ti ti-sparkles text-accent-dark text-sm"></span>
              <span class="font-dm-sans text-xs font-medium text-accent-dark">WithHer Assistant</span>
            </div>
            <p class="font-dm-sans text-sm text-dark leading-relaxed whitespace-pre-wrap">{{ answer }}</p>
            <p class="font-dm-sans text-xs text-text-light mt-3">
              This is general health information only — not medical advice. Always speak with a qualified health professional for personal guidance.
            </p>
          </div>
        </transition>

        <!-- Coming soon badge -->
        <div class="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans">
          <span class="ti ti-clock text-sm"></span>
          Full AI responses coming soon — backend in progress
        </div>
      </div>

      <!-- ── Bottom three cards ── -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- Profile / Language preference -->
        <div class="bg-surface rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
              <span class="ti ti-user text-primary text-base"></span>
            </div>
            <h2 class="font-lora text-base text-dark">My profile</h2>
          </div>

          <!-- Name + email (read-only) -->
          <div class="flex flex-col gap-2">
            <div>
              <p class="font-dm-sans text-xs text-text-light mb-0.5">Name</p>
              <p class="font-dm-sans text-sm text-dark">{{ user?.displayName || '—' }}</p>
            </div>
            <div>
              <p class="font-dm-sans text-xs text-text-light mb-0.5">Email</p>
              <p class="font-dm-sans text-sm text-dark truncate">{{ user?.email || '—' }}</p>
            </div>
          </div>

          <!-- Language preference -->
          <div>
            <p class="font-dm-sans text-xs text-text-light mb-1.5">Preferred language</p>
            <select
              v-model="selectedLanguage"
              @change="saveLanguage"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-background font-dm-sans text-sm text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
            >
              <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.label }}
              </option>
            </select>
            <p v-if="langSaved" class="font-dm-sans text-xs text-green-600 mt-1.5 flex items-center gap-1">
              <span class="ti ti-circle-check"></span> Saved
            </p>
          </div>
        </div>

        <!-- Saved clinics -->
        <div class="bg-surface rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center shrink-0">
              <span class="ti ti-building-hospital text-accent-dark text-base"></span>
            </div>
            <h2 class="font-lora text-base text-dark">Saved clinics</h2>
          </div>

          <!-- Placeholder empty state -->
          <div class="flex-1 flex flex-col items-center justify-center text-center py-6 gap-3">
            <div class="w-10 h-10 rounded-full bg-background flex items-center justify-center">
              <span class="ti ti-building-hospital text-xl text-text-light"></span>
            </div>
            <p class="font-dm-sans text-sm text-text-mid">
              Save clinics you like from the Find Care page.
            </p>
            <router-link
              to="/care"
              class="inline-flex items-center gap-1 font-dm-sans text-xs text-primary hover:underline"
            >
              Find care <span class="ti ti-arrow-right text-sm"></span>
            </router-link>
          </div>

          <div class="mt-auto pt-2 border-t border-gray-100">
            <p class="font-dm-sans text-xs text-text-light flex items-center gap-1">
              <span class="ti ti-clock"></span> Coming soon
            </p>
          </div>
        </div>

        <!-- Saved articles -->
        <div class="bg-surface rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
              <span class="ti ti-bookmark text-primary text-base"></span>
            </div>
            <h2 class="font-lora text-base text-dark">Saved articles</h2>
          </div>

          <!-- Placeholder empty state -->
          <div class="flex-1 flex flex-col items-center justify-center text-center py-6 gap-3">
            <div class="w-10 h-10 rounded-full bg-background flex items-center justify-center">
              <span class="ti ti-book text-xl text-text-light"></span>
            </div>
            <p class="font-dm-sans text-sm text-text-mid">
              Bookmark articles from the Learn page to read later.
            </p>
            <router-link
              to="/learn"
              class="inline-flex items-center gap-1 font-dm-sans text-xs text-primary hover:underline"
            >
              Browse articles <span class="ti ti-arrow-right text-sm"></span>
            </router-link>
          </div>

          <div class="mt-auto pt-2 border-t border-gray-100">
            <p class="font-dm-sans text-xs text-text-light flex items-center gap-1">
              <span class="ti ti-clock"></span> Coming soon
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'

// --- Firebase ---
const auth = getAuth()
const db = getFirestore()
const user = ref(null)

// First name only for the greeting
const firstName = computed(() => {
  const name = user.value?.displayName?.trim()
  if (!name) return 'there'
  return name.split(' ')[0]
})

// --- Language preference ---
const selectedLanguage = ref('en')
const langSaved = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文 (Mandarin)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { code: 'ko', label: '한국어 (Korean)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'es', label: 'Español (Spanish)' },
]

async function saveLanguage() {
  if (!user.value) return
  try {
    const userRef = doc(db, 'users', user.value.uid)
    await updateDoc(userRef, { preferredLanguage: selectedLanguage.value })
    // Show a brief "Saved" confirmation then hide it
    langSaved.value = true
    setTimeout(() => { langSaved.value = false }, 2000)
  } catch (err) {
    console.error('Failed to save language preference:', err)
  }
}

// --- Ask a question (UI only — backend not built yet) ---
const question = ref('')
const answer = ref('')
const asking = ref(false)

async function askQuestion() {
  if (!question.value.trim()) return
  asking.value = true
  answer.value = ''
  // Simulate a short delay so the UI feels responsive
  // Replace this with a real POST /api/triage/ask call once backend is ready
  await new Promise((r) => setTimeout(r, 1200))
  answer.value = 'Full AI responses are coming soon. Once the backend is ready, your question will be answered here privately and in plain language.'
  asking.value = false
}

// --- Load user + Firestore profile on mount ---
onMounted(async () => {
  // Wait for auth to resolve
  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      user.value = u
      unsubscribe()
      resolve()
    })
  })

  if (!user.value) return

  // Load Firestore user doc to get saved language preference
  try {
    const userRef = doc(db, 'users', user.value.uid)
    const snap = await getDoc(userRef)
    if (snap.exists()) {
      const data = snap.data()
      if (data.preferredLanguage) {
        selectedLanguage.value = data.preferredLanguage
      }
    }
  } catch (err) {
    console.error('Failed to load user profile:', err)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>