<template>
  <div class="provider-table">
    <!-- 顶部过滤控件 -->
    <div class="row g-2 mb-3">
      <div class="col-md-4">
        <input v-model.trim="searchAll" class="form-control" placeholder="Search all columns..." />
      </div>
      <div class="col-md-3">
        <input v-model.trim="searchName" class="form-control" placeholder="Search name..." />
      </div>
      <div class="col-md-2">
        <input v-model.trim="filterPostcode" class="form-control" placeholder="Postcode..." />
      </div>
      <div class="col-md-2">
        <select v-model="filterType" class="form-select">
          <option value="">Type...</option>
          <option value="gp">General Practitioner</option>
          <option value="obgyn">OB-GYN</option>
          <option value="mental">Mental Health</option>
          <option value="physio">Physiotherapy</option>
        </select>
      </div>
      <div class="col-md-1">
        <select v-model.number="pageSize" class="form-select">
          <option :value="10">10 / page</option>
          <option :value="20">20 / page</option>
          <option :value="50">50 / page</option>
        </select>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th role="button" @click="toggleSort('name')">
              Name <small v-if="sortKey==='name'">{{ sortAsc ? '▲' : '▼' }}</small>
            </th>
            <th>Address</th>
            <th role="button" @click="toggleSort('type')">
              Type <small v-if="sortKey==='type'">{{ sortAsc ? '▲' : '▼' }}</small>
            </th>
            <th role="button" @click="toggleSort('postcode')">
              Postcode <small v-if="sortKey==='postcode'">{{ sortAsc ? '▲' : '▼' }}</small>
            </th>
            <th role="button" @click="toggleSort('avg')">
              Avg rating <small v-if="sortKey==='avg'">{{ sortAsc ? '▲' : '▼' }}</small>
            </th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in paged" :key="row.id">
            <td>{{ row.name }}</td>
            <td class="text-muted">{{ row.address }}</td>
            <td><span class="badge bg-light text-dark">{{ typeLabel(row.type) }}</span></td>
            <td>{{ row.postcode }}</td>
            <td>{{ (row.avg ?? 0).toFixed(2) }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-secondary me-2" @click="viewDetails(row)">View details</button>

              <!-- ✅ 用 RouterLink + 自动探测路由名/路径 -->
              <RouterLink
                class="btn btn-sm btn-primary"
                :to="buildBookingTo(row)"
              >
                Book appointment
              </RouterLink>
            </td>
          </tr>

          <tr v-if="paged.length === 0">
            <td colspan="6" class="text-center text-muted py-4">No results</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">
        Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ total }} result(s). Page {{ page }} / {{ pageCount }}.
      </small>
      <div class="btn-group">
        <button class="btn btn-outline-secondary btn-sm" :disabled="page<=1" @click="goPage(page-1)">Prev</button>
        <button class="btn btn-outline-secondary btn-sm" :disabled="page>=pageCount" @click="goPage(page+1)">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const props = defineProps({
  items: { type: Array, default: () => [] },
  getAvg: { type: Function, default: null },
  initialFilters: { type: Object, default: () => ({ postcodePrefix:'', type:'' }) }
})

const router = useRouter()

// ——— 本地状态 ———
const searchAll = ref('')
const searchName = ref('')
const filterPostcode = ref('')
const filterType = ref('')
const pageSize = ref(10)
const page = ref(1)
const sortKey = ref('name')
const sortAsc = ref(true)

function applyInitialFilters() {
  filterPostcode.value = props.initialFilters.postcodePrefix || ''
  filterType.value = props.initialFilters.type || ''
  page.value = 1
}
onMounted(applyInitialFilters)
watch(() => props.initialFilters, applyInitialFilters, { deep:true })
watch(() => props.items, () => { page.value = 1 })

const normalized = computed(() =>
  (props.items || []).map(r => ({
    ...r,
    avg: props.getAvg ? (props.getAvg(r.id) || 0) : (r.avg ?? 0)
  }))
)

function rowText(r){ return `${r.name} ${r.address} ${r.type} ${r.postcode}`.toLowerCase() }

const filtered = computed(() => {
  const kwAll = searchAll.value.trim().toLowerCase()
  const kwName = searchName.value.trim().toLowerCase()
  const pcPrefix = filterPostcode.value.trim()
  return normalized.value.filter(r => {
    if (kwAll && !rowText(r).includes(kwAll)) return false
    if (kwName && !r.name.toLowerCase().includes(kwName)) return false
    if (pcPrefix && !String(r.postcode).startsWith(pcPrefix)) return false
    if (filterType.value && r.type !== filterType.value) return false
    return true
  })
})

const sorted = computed(() => {
  const list = [...filtered.value]
  const k = sortKey.value
  list.sort((a,b) => {
    const av = a[k] ?? ''
    const bv = b[k] ?? ''
    if (av < bv) return sortAsc.value ? -1 : 1
    if (av > bv) return sortAsc.value ? 1 : -1
    return 0
  })
  return list
})

const total = computed(() => sorted.value.length)
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const startIndex = computed(() => (page.value - 1) * pageSize.value)
const endIndex = computed(() => Math.min(total.value, startIndex.value + pageSize.value))
const paged = computed(() => sorted.value.slice(startIndex.value, endIndex.value))

function toggleSort(k){ sortKey.value===k ? (sortAsc.value=!sortAsc.value) : (sortKey.value=k, sortAsc.value=true) }
function goPage(p){ page.value = Math.min(Math.max(1,p), pageCount.value) }

function typeLabel(v){
  return { gp:'General Practitioner', obgyn:'OB-GYN', mental:'Mental Health', physio:'Physiotherapy' }[v] || v
}

function viewDetails(row){
  router.push({ name:'provider-details', params:{ id: row.id } })
}

function buildBookingTo(row) {
  // 优先跳 /providers/:id/book
  if (router.hasRoute('BookAppt')) {
    return {
      name: 'BookAppt',
      params: { id: row.id }, // 必须带上 :id
      query: {
        doctor: row.name,
        // 你的路由读取的是 route.query.email
        email: row.email || 'clinic@example.com'
      }
    }
  }

  // 其次跳 /book
  if (router.hasRoute('BookAppointment')) {
    return {
      name: 'BookAppointment',
      query: {
        providerId: row.id,
        doctor: row.name,
        email: row.email || 'clinic@example.com'
      }
    }
  }

  // 兜底：直接用 /book 路径
  return {
    path: '/book',
    query: {
      providerId: row.id,
      doctor: row.name,
      email: row.email || 'clinic@example.com'
    }
  }
}
</script>

<style scoped>
.provider-table table th[role="button"]{ cursor:pointer; user-select:none; }
</style>