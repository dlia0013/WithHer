<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCurrentUser } from '@/services/auth'
import { exportCSV, exportPDF } from '@/utils/exporters'

const user = getCurrentUser()

const allAppts = ref([])

function loadAppts() {
  try {
    allAppts.value = JSON.parse(localStorage.getItem('appointments') || '[]')
  } catch {
    allAppts.value = []
  }
}

onMounted(loadAppts)

// Show only appointments for this clinic email (fallback to all for demo)
const myAppts = computed(() => {
  if (!user?.email) return allAppts.value
  const email = String(user.email).toLowerCase()
  const mine = allAppts.value.filter(a => String(a.clinicEmail || '').toLowerCase() === email)
  return mine.length ? mine : allAppts.value
})

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
  exportCSV(
    `clinic_appointments_${new Date().toISOString().slice(0,10)}.csv`,
    rowsForExport.value,
    exportHeaders
  )
}

function onExportPDF() {
  exportPDF(
    `clinic_appointments_${new Date().toISOString().slice(0,10)}.pdf`,
    rowsForExport.value,
    exportHeaders,
    'Clinic Appointments'
  )
}
</script>

<template>
  <div class="container py-4">
    <div class="d-flex align-items-center gap-3 mb-2">
      <h2 class="h4 m-0">Health Professional Dashboard</h2>
      <span class="text-muted" aria-live="polite">
        {{ user?.name }} &middot; role: {{ user?.role || 'pro' }}
      </span>
    </div>

    <p class="text-muted">
      Below are appointments associated with your clinic email (if available). You can export them for records.
    </p>

    <div class="d-flex gap-2 mb-3">
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="onExportCSV"
        aria-label="Export appointments as CSV"
      >
        Export CSV
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="onExportPDF"
        aria-label="Export appointments as PDF"
      >
        Export PDF
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-sm align-middle">
        <caption class="visually-hidden">Appointments table for professionals</caption>
        <thead class="table-light">
          <tr>
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
            <td>{{ a.date }}</td>
            <td>{{ a.time }}</td>
            <td>{{ a.name || a.patientName || '-' }}</td>
            <td>{{ a.providerName }}</td>
            <td>{{ a.status || 'Confirmed' }}</td>
            <td>{{ a.notes || '' }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center text-muted py-4">
              No appointments found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* keep minimal; relies on Bootstrap */
</style>