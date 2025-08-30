<template>
  <section>
    <h1 class="h3 mb-3">My Health Hub</h1>

    <div v-if="!prefs" class="alert alert-info" role="status">
      No preferences found yet. Set your care preferences to personalise this page.
      <router-link class="btn btn-sm btn-primary ms-2" to="/care">Set now</router-link>
    </div>

    <div v-else>
      <div class="mb-4">
        <p class="lead mb-1">Welcome back, <strong>{{ displayName }}</strong> 👋</p>
        <small class="text-muted">This dashboard summarises your saved care preferences.</small>
      </div>

      <div class="row g-3">
        <div class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="text-uppercase small text-muted mb-1">Postcode</div>
              <div class="fs-5 fw-semibold">{{ prefs.postcode }}</div>
              <div class="small text-muted">We’ll prioritise providers near you.</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="text-uppercase small text-muted mb-1">Appointment type</div>
              <div class="fs-5 fw-semibold">{{ typeLabel(prefs.type) }}</div>
              <div class="small text-muted">Used to filter provider specialties.</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="text-uppercase small text-muted mb-1">Contact email</div>
              <div class="fs-5 fw-semibold">{{ prefs.email }}</div>
              <div class="small text-muted">We’ll use this for reminders (future feature).</div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-2 mt-3">
        <router-link class="btn btn-primary" to="/care">Edit in Find Care</router-link>
        <button class="btn btn-outline-danger" @click="clearPrefs">Clear preferences</button>
      </div>

      <hr class="my-4" />
      <h2 class="h5 mb-3">Suggestions for you</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="s in suggestions" :key="s.id">
          {{ s.text }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const prefs = ref(null)

onMounted(() => {
  try {
    const raw = localStorage.getItem('carePrefs')
    if (raw) prefs.value = JSON.parse(raw)
  } catch {
    prefs.value = null
  }
})

const displayName = computed(() => {
  const name = prefs.value?.name?.trim()
  if (!name) return 'there'
  return name.split(' ')[0]
})

function typeLabel(v) {
  return ({ gp: 'General Practitioner', obgyn: 'OB-GYN', mental: 'Mental Health', physio: 'Physiotherapy' }[v] || 'Unknown')
}

function clearPrefs() {
  localStorage.removeItem('carePrefs')
  prefs.value = null
}

const suggestions = computed(() => {
  if (!prefs.value) return []
  const t = prefs.value.type
  const pc = prefs.value.postcode?.slice(0, 2) || 'your area'
  const map = {
    gp: [
      `New patients near ${pc}—check GP clinics’ after-hours availability.`,
      `Prepare a brief health history to speed up your first GP visit.`,
      `Add a reminder to book annual check-ups.`
    ],
    obgyn: [
      `OB-GYN options near ${pc}—confirm referral requirements.`,
      `Bring screening records (Pap/HPV) to your appointment.`,
      `Review contraception options before your visit.`
    ],
    mental: [
      `Mental health services near ${pc}—ask about telehealth.`,
      `Consider a GP Mental Health Treatment Plan for rebates.`,
      `Save emergency contacts in your phone.`
    ],
    physio: [
      `Physio near ${pc}—check women’s health specialisation.`,
      `Wear comfy clothes for your first physio assessment.`,
      `Ask about at-home exercises to support recovery.`
    ]
  }
  return (map[t] || [
    `Explore providers near ${pc}.`,
    `Update your appointment type for better matches.`,
    `Keep your email current for future reminders.`
  ]).map((text, i) => ({ id: i + 1, text }))
})
</script>