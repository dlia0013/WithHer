<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // rows: [{ id, providerName, date, time, notes, status, email }]
  rows: { type: Array, default: () => [] },
  pageSizeDefault: { type: Number, default: 10 }
})
const emit = defineEmits(['cancel', 'reschedule', 'view'])

const q = ref('')
const providerFilter = ref('')
const statusFilter = ref('')
const sortKey = ref('date')   
const sortAsc = ref(true)
const page = ref(1)
const pageSize = ref(props.pageSizeDefault)

watch([q, providerFilter, statusFilter, pageSize], () => { page.value = 1 })

const providers = computed(() => {
  const set = new Set(props.rows.map(r => r.providerName).filter(Boolean))
  return Array.from(set).sort()
})
const statuses = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled']

function rowText(r) {
  return `${r.providerName} ${r.date} ${r.time} ${r.notes} ${r.status}`.toLowerCase()
}

const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  return props.rows.filter(r => {
    const okQ = k ? rowText(r).includes(k) : true
    const okP = providerFilter.value ? r.providerName === providerFilter.value : true
    const okS = statusFilter.value ? r.status === statusFilter.value : true
    return okQ && okP && okS
  })
})

const sorted = computed(() => {
  const k = sortKey.value
  const asc = sortAsc.value ? 1 : -1
  return [...filtered.value].sort((a, b) => {
    if (k === 'date') {
      const ad = `${a.date} ${a.time}`; const bd = `${b.date} ${b.time}`
      return ad < bd ? -asc : ad > bd ? asc : 0
    }
    const av = (a[k] ?? '').toString().toLowerCase()
    const bv = (b[k] ?? '').toString().toLowerCase()
    return av < bv ? -asc : av > bv ? asc : 0
  })
})

const total = computed(() => sorted.value.length)
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const pageRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sorted.value.slice(start, start + pageSize.value)
})

function setSort(k) {
  if (sortKey.value === k) sortAsc.value = !sortAsc.value
  else { sortKey.value = k; sortAsc.value = true }
}

function go(p) {
  page.value = Math.min(Math.max(1, p), pageCount.value)
}
</script>

<template>
  <div>
    <!-- Filters -->
    <div class="row g-2 mb-3">
      <div class="col-md-4">
        <input class="form-control" v-model.trim="q" placeholder="Search all…" />
      </div>
      <div class="col-md-4">
        <select class="form-select" v-model="providerFilter">
          <option value="">All providers</option>
          <option v-for="p in providers" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="statusFilter">
          <option value="">All status</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="col-md-1">
        <select class="form-select" v-model.number="pageSize">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th @click="setSort('date')" style="cursor:pointer">
              Date / Time <span v-if="sortKey==='date'">{{ sortAsc ? '▲' : '▼' }}</span>
            </th>
            <th @click="setSort('providerName')" style="cursor:pointer">
              Provider <span v-if="sortKey==='providerName'">{{ sortAsc ? '▲' : '▼' }}</span>
            </th>
            <th>Notes</th>
            <th @click="setSort('status')" style="cursor:pointer">
              Status <span v-if="sortKey==='status'">{{ sortAsc ? '▲' : '▼' }}</span>
            </th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in pageRows" :key="r.id">
            <td><div class="fw-semibold">{{ r.date }}</div><div class="text-muted small">{{ r.time }}</div></td>
            <td>{{ r.providerName }}</td>
            <td class="text-truncate" style="max-width: 380px">{{ r.notes || '-' }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'bg-primary': r.status==='Scheduled' || r.status==='Confirmed',
                  'bg-success': r.status==='Completed',
                  'bg-secondary': r.status==='Cancelled'
                }"
              >{{ r.status }}</span>
            </td>
            <td class="text-end">
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" @click="emit('view', r)">View</button>
                <button class="btn btn-sm btn-outline-primary" :disabled="r.status==='Cancelled'"
                        @click="emit('reschedule', r)">Reschedule</button>
                <button class="btn btn-sm btn-outline-danger" :disabled="r.status==='Cancelled'"
                        @click="emit('cancel', r)">Cancel</button>
              </div>
            </td>
          </tr>
          <tr v-if="pageRows.length===0">
            <td colspan="5" class="text-center text-muted py-4">No results</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="text-muted small">Showing {{ pageRows.length }} of {{ total }} result(s).</div>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary" :disabled="page<=1" @click="go(page-1)">Prev</button>
        <span class="btn btn-sm btn-outline-secondary disabled">Page {{ page }} / {{ pageCount }}</span>
        <button class="btn btn-sm btn-outline-secondary" :disabled="page>=pageCount" @click="go(page+1)">Next</button>
      </div>
    </div>
  </div>
</template>