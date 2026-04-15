<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { availability, weekdayKey } from '@/data/availability'

const FN_BASE = 'https://australia-southeast1-women-s-health-7bf69.cloudfunctions.net/api'

const props = defineProps({
  providerId: { type: String, default: '' },
  doctor: { type: String, default: '' },
  clinicEmail: { type: String, default: '' }
})
const route = useRoute()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  doctor: props.doctor || '',
  date: '',
  time: '',
  notes: ''
})

watch(() => route.query, q => {
  if (!form.value.doctor && q?.doctor) form.value.doctor = String(q.doctor)
}, { immediate: true })

const loading = ref(false)
const msg = ref('')

/* ----------------- availability helpers ----------------- */
const pid = computed(() => props.providerId || String(route.params.id || ''))
const cfg = computed(() => (pid.value && availability[pid.value]) || null)

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
function pad(n) { return String(n).padStart(2, '0') }
function fromMinutes(min) { return `${pad(Math.floor(min/60))}:${pad(min%60)}` }

function genSlots(ranges = [], step = 30) {
  const out = []
  for (const r of ranges) {
    const [s, e] = r.split('-')
    let cur = toMinutes(s), end = toMinutes(e)
    while (cur + step <= end) {
      out.push(fromMinutes(cur))
      cur += step
    }
  }
  return out
}
function getTakenTimes(providerId, dateStr) {
  try {
    const list = JSON.parse(localStorage.getItem('appointments') || '[]')
    return new Set(
      list
        .filter(a => a.providerId === providerId && a.date === dateStr && a.status !== 'Cancelled')
        .map(a => a.time)
    )
  } catch { return new Set() }
}

const availableTimes = computed(() => {
  const id = pid.value
  const dateStr = form.value.date
  if (!id || !dateStr || !cfg.value) return []
  if (cfg.value.closed?.includes(dateStr)) return []
  const wk = weekdayKey(dateStr)
  const ranges = cfg.value.weekly?.[wk] || []
  if (!ranges.length) return []
  const raw = genSlots(ranges, cfg.value.durationMins || 30)
  const taken = getTakenTimes(id, dateStr)
  return raw.filter(t => !taken.has(t))
})

/* ----------------- validation ----------------- */
const errors = computed(() => {
  const e = {}
  if (!form.value.name.trim()) e.name = 'Name is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) e.email = 'Invalid email'
  if (!form.value.doctor) e.doctor = 'Please select a provider'
  if (!form.value.date) e.date = 'Please select a date'
  if (!form.value.time) e.time = 'Please select a time'
  // date has no slots
  if (form.value.date && !availableTimes.value.length) e.date = 'No available slots on this date'
  // chosen time must still be available
  if (form.value.time && !availableTimes.value.includes(form.value.time)) e.time = 'Time no longer available'
  return e
})

/* ----------------- submit ----------------- */
async function submitBooking () {
  if (Object.keys(errors.value).length) {
    msg.value = '❌ Please fix form errors'
    return
  }
  loading.value = true
  msg.value = ''
  try {
    // email to patient
    const subjectUser = `Your appointment with ${form.value.doctor} on ${form.value.date} at ${form.value.time}`
    const htmlUser = `
      <p>Hi ${form.value.name},</p>
      <p>Your appointment request has been received:</p>
      <ul>
        <li><b>Provider:</b> ${form.value.doctor}</li>
        <li><b>Date:</b> ${form.value.date}</li>
        <li><b>Time:</b> ${form.value.time}</li>
      </ul>
      <p>Notes: ${form.value.notes || '-'}</p>
      <p>— Women’s Health</p>`
    await axios.post(`${FN_BASE}/sendEmail`, { to: form.value.email, subject: subjectUser, html: htmlUser })

    // email to clinic
    const clinicTo = props.clinicEmail ? [props.clinicEmail] : ['clinic@example.com']
    const subjectClinic = `New booking: ${form.value.name} → ${form.value.doctor} (${form.value.date} ${form.value.time})`
    const textClinic = `New appointment:
- Name:   ${form.value.name}
- Email:  ${form.value.email}
- Doctor: ${form.value.doctor}
- When:   ${form.value.date} ${form.value.time}
- Notes:  ${form.value.notes || '-'}`

    await axios.post(`${FN_BASE}/sendEmail`, { to: clinicTo, subject: subjectClinic, text: textClinic })

    // save to local
    const appt = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      providerId: pid.value || '',
      providerName: form.value.doctor,
      clinicEmail: props.clinicEmail || '',
      name: form.value.name,
      email: form.value.email,
      date: form.value.date,
      time: form.value.time,
      notes: (form.value.notes || '').trim(),
      status: 'Confirmed',
      createdAt: Date.now()
    }
    const list = JSON.parse(localStorage.getItem('appointments') || '[]')
    list.push(appt)
    localStorage.setItem('appointments', JSON.stringify(list))

    msg.value = '✅ Appointment submitted and emails sent!'
    setTimeout(() => {
      router.replace({ name: 'provider-details', params: { id: pid.value } })
    }, 1000)
  } catch (e) {
    console.error(e)
    msg.value = '❌ Failed: ' + (e.response?.data?.message || e.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width:720px">
    <h3 class="mb-3">Book an appointment with {{ form.doctor || 'Provider' }}</h3>

    <form @submit.prevent="submitBooking" novalidate>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Your name</label>
          <input v-model.trim="form.name" type="text" class="form-control" :class="{'is-invalid': errors.name}">
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Your email</label>
          <input v-model.trim="form.email" type="email" class="form-control" :class="{'is-invalid': errors.email}">
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <div class="col-md-6">
          <label class="form-label">Provider</label>
          <input v-model="form.doctor" type="text" class="form-control" :readonly="!!props.doctor" />
        </div>

        <div class="col-md-3">
          <label class="form-label">Date</label>
          <input v-model="form.date" type="date" class="form-control" :class="{'is-invalid': errors.date}">
          <div class="invalid-feedback">{{ errors.date }}</div>
        </div>

        <div class="col-md-3">
          <label class="form-label">Time</label>
          <select v-model="form.time" class="form-select" :disabled="!availableTimes.length" :class="{'is-invalid': errors.time}">
            <option value="" disabled>Select time</option>
            <option v-for="t in availableTimes" :key="t" :value="t">{{ t }}</option>
          </select>
          <div class="invalid-feedback">{{ errors.time }}</div>
          <small v-if="form.date && !availableTimes.length" class="text-muted">No slots for this date.</small>
        </div>

        <div class="col-12">
          <label class="form-label">Notes (optional)</label>
          <textarea v-model="form.notes" rows="3" class="form-control"></textarea>
        </div>
      </div>

      <button class="btn btn-primary w-100 mt-3" :disabled="loading">
        {{ loading ? 'Submitting & sending…' : 'Confirm booking' }}
      </button>
    </form>

    <p class="mt-3 text-center" :class="msg.startsWith('✅') ? 'text-success' : 'text-danger'">{{ msg }}</p>
  </div>
</template>