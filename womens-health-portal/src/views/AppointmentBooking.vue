<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

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

const errors = computed(() => {
  const e = {}
  if (!form.value.name.trim()) e.name = 'Name is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) e.email = 'Invalid email'
  if (!form.value.doctor) e.doctor = 'Please select a provider'
  if (!form.value.date) e.date = 'Please select a date'
  if (!form.value.time) e.time = 'Please select a time'
  return e
})

async function submitBooking () {
  if (Object.keys(errors.value).length) {
    msg.value = '❌ Please fix form errors'
    return
  }
  loading.value = true
  msg.value = ''
  try {
    
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
      <p>— Women’s Health</p>
    `
    await axios.post(`${FN_BASE}/sendEmail`, {
      to: form.value.email,
      subject: subjectUser,
      html: htmlUser
    })

    const clinicTo = props.clinicEmail ? [props.clinicEmail] : ['clinic@example.com']
    const subjectClinic = `New booking: ${form.value.name} → ${form.value.doctor} (${form.value.date} ${form.value.time})`
    const textClinic =
`New appointment:
- Name:   ${form.value.name}
- Email:  ${form.value.email}
- Doctor: ${form.value.doctor}
- When:   ${form.value.date} ${form.value.time}
- Notes:  ${form.value.notes || '-'}`

    await axios.post(`${FN_BASE}/sendEmail`, {
      to: clinicTo,
      subject: subjectClinic,
      text: textClinic
    })

    msg.value = '✅ Appointment submitted and emails sent!'

    setTimeout(() => {
      router.replace({ name: 'ProviderDetails', params: { id: props.providerId } })
    }, 1200)
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
          <!-- 如果你不希望用户改动医生名就 readonly -->
        </div>

        <div class="col-md-3">
          <label class="form-label">Date</label>
          <input v-model="form.date" type="date" class="form-control" :class="{'is-invalid': errors.date}">
          <div class="invalid-feedback">{{ errors.date }}</div>
        </div>

        <div class="col-md-3">
          <label class="form-label">Time</label>
          <input v-model="form.time" type="time" class="form-control" :class="{'is-invalid': errors.time}">
          <div class="invalid-feedback">{{ errors.time }}</div>
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