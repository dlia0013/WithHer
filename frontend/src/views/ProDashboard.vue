<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { getCurrentUser } from '@/services/auth'
import { exportCSV, exportPDF } from '@/utils/exporters'
import axios from 'axios'

// ---- Chart.js (light register) ----
import {
  Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js'
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const FN_BASE = 'https://australia-southeast1-women-s-health-7bf69.cloudfunctions.net/api'
const user = getCurrentUser()

const allAppts = ref([])
const selected = ref(new Set()) // selected ids for bulk email

function loadAppts() {
  try { allAppts.value = JSON.parse(localStorage.getItem('appointments') || '[]') }
  catch { allAppts.value = [] }
}
onMounted(() => {
  loadAppts()
  window.addEventListener('storage', onStorage)
})
onBeforeUnmount(() => window.removeEventListener('storage', onStorage))
function onStorage(e){ if (e.key === 'appointments') loadAppts() }

// filter by clinic email if possible
const myAppts = computed(() => {
  if (!user?.email) return allAppts.value
  const email = String(user.email).toLowerCase()
  const mine = allAppts.value.filter(a => String(a.clinicEmail || '').toLowerCase() === email)
  return mine.length ? mine : allAppts.value
})

// rows for export
const exportHeaders = [
  { key: 'date',     label: 'Date' },
  { key: 'time',     label: 'Time' },
  { key: 'patient',  label: 'Patient' },
  { key: 'provider', label: 'Provider' },
  { key: 'status',   label: 'Status' },
  { key: 'notes',    label: 'Notes' },
]
const rowsForExport = computed(() =>
  myAppts.value.map(a => ({
    date: a.date || '',
    time: a.time || '',
    patient: a.name || a.patientName || '',
    provider: a.providerName || '',
    status: a.status || 'Confirmed',
    notes: a.notes || ''
  }))
)
function onExportCSV() {
  exportCSV(`clinic_appointments_${new Date().toISOString().slice(0,10)}.csv`, rowsForExport.value, exportHeaders)
}
function onExportPDF() {
  exportPDF(`clinic_appointments_${new Date().toISOString().slice(0,10)}.pdf`, rowsForExport.value, exportHeaders, 'Clinic Appointments')
}

// ---- bulk email ----
const composing = ref(false)
const bulkSubject = ref('Appointment notice')
const bulkBody = ref('Hello, this is a reminder from our clinic.')
const selectedAppts = computed(() => myAppts.value.filter(a => selected.value.has(a.id)))
const selectedEmails = computed(() => {
  const s = new Set()
  selectedAppts.value.forEach(a => { if (a.email) s.add(String(a.email).trim()) })
  return [...s]
})
async function sendBulkEmail() {
  if (!selectedEmails.value.length) return
  await axios.post(`${FN_BASE}/sendEmail`, {
    to: selectedEmails.value,
    subject: bulkSubject.value,
    text: bulkBody.value
  })
  composing.value = false
}

// ---- chart (status counts) ----
const chartEl = ref(null)
let chart
function buildChart() {
  const counts = myAppts.value.reduce((acc, a) => {
    const k = a.status || 'Confirmed'
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})
  const labels = Object.keys(counts)
  const data = labels.map(l => counts[l])

  if (!chart) {
    chart = new Chart(chartEl.value, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Appointments by status', data }] },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    })
  } else {
    chart.data.labels = labels
    chart.data.datasets[0].data = data
    chart.update()
  }
}
onMounted(buildChart)
watch(myAppts, buildChart, { deep: true })
</script>

<template>
  <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div>
        <h2 class="h4 m-0">Health Professional Dashboard</h2>
        <small class="text-muted" aria-live="polite">{{ user?.name }} · role: {{ user?.role || 'pro' }}</small>
      </div>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="onExportCSV" aria-label="Export as CSV">Export CSV</button>
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="onExportPDF" aria-label="Export as PDF">Export PDF</button>
      </div>
    </div>

    <!-- chart -->
    <div class="card mb-3" role="region" aria-label="Appointments chart">
      <div class="card-body">
        <canvas ref="chartEl" aria-label="Bar chart of appointments by status"></canvas>
      </div>
    </div>

    <!-- bulk email actions -->
    <div class="d-flex align-items-center gap-2 mb-2">
      <button
        type="button"
        class="btn btn-primary btn-sm"
        :disabled="!selectedEmails.length"
        @click="composing = true"
        aria-controls="bulkComposer"
        aria-expanded="composing"
      >
        Email selected ({{ selectedEmails.length }})
      </button>
      <span class="text-muted small">Select rows to email patients in bulk.</span>
    </div>

    <!-- table -->
    <div class="table-responsive">
      <table class="table table-sm align-middle">
        <caption class="visually-hidden">Appointments table for professionals</caption>
        <thead class="table-light">
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                :checked="selected.size === myAppts.length && myAppts.length > 0"
                @change="e => { selected = new Set(e.target.checked ? myAppts.map(a=>a.id) : []) }"
                aria-label="Select all"
              >
            </th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Patient</th>
            <th scope="col">Provider</th>
            <th scope="col">Status</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody v-if="myAppts.length">
          <tr v-for="a in myAppts" :key="a.id">
            <td>
              <input
                type="checkbox"
                :checked="selected.has(a.id)"
                @change="e => { e.target.checked ? selected.add(a.id) : selected.delete(a.id) }"
                :aria-label="`Select appointment of ${a.name || 'patient'} on ${a.date} ${a.time}`"
              >
            </td>
            <td>{{ a.date }}</td>
            <td>{{ a.time }}</td>
            <td>{{ a.name || a.patientName || '-' }}</td>
            <td>{{ a.providerName }}</td>
            <td>{{ a.status || 'Confirmed' }}</td>
            <td>{{ a.notes || '' }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td colspan="7" class="text-center text-muted py-4">No appointments found.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- bulk composer -->
    <div v-if="composing" id="bulkComposer" class="card mt-3" role="dialog" aria-modal="true" aria-labelledby="bulkTitle">
      <div class="card-body">
        <h3 id="bulkTitle" class="h6">Email selected patients</h3>
        <p class="text-muted small mb-2">Recipients ({{ selectedEmails.length }}): {{ selectedEmails.join(', ') }}</p>
        <div class="mb-2">
          <label class="form-label">Subject</label>
          <input class="form-control" v-model="bulkSubject">
        </div>
        <div class="mb-3">
          <label class="form-label">Body</label>
          <textarea class="form-control" rows="4" v-model="bulkBody"></textarea>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" @click="sendBulkEmail" :disabled="!selectedEmails.length">Send</button>
          <button class="btn btn-outline-secondary btn-sm" @click="composing=false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* minimal – Bootstrap styles used */
</style>