<template>
  <div class="min-h-screen bg-background">

    <!-- Page header -->
    <div class="bg-surface border-b border-gray-100 px-4 py-10 md:py-14">
      <div class="max-w-4xl mx-auto">
        <h1 class="font-lora text-3xl md:text-4xl text-primary mb-3">
          Find care near you
        </h1>
        <p class="font-dm-sans text-text-mid text-base md:text-lg max-w-xl">
          Search by suburb or postcode, then filter by what matters most to you.
        </p>
      </div>
    </div>

    <!-- Sticky filter panel -->
    <div class="sticky top-0 z-20 bg-surface border-b border-gray-100 shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-4">

        <!-- Search row -->
        <div class="flex gap-2">
          <div class="relative flex-1 max-w-sm">
            <span class="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-base"></span>
            <input
              v-model="search"
              type="text"
              placeholder="Suburb or postcode (e.g. Carlton, 3000)"
              class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-background font-dm-sans text-sm text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
            />
          </div>

          <!-- Use my location -->
          <button
            @click="useMyLocation"
            :disabled="locating"
            class="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-background font-dm-sans text-sm text-text-mid hover:border-primary hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <span :class="['ti text-base', locating ? 'ti-loader-2 animate-spin' : 'ti-current-location']"></span>
            <span class="hidden sm:inline">{{ locating ? 'Locating…' : 'Near me' }}</span>
          </button>
        </div>

        <!-- Filter groups -->
        <div class="flex flex-col gap-2.5">

          <!-- Cost -->
          <div class="flex items-center gap-2">
            <span class="font-dm-sans text-xs text-text-light w-20 shrink-0">Cost</span>
            <button
              @click="bulkBillingOnly = !bulkBillingOnly"
              :class="[
                'px-3 py-1.5 rounded-full font-dm-sans text-xs font-medium border transition',
                bulkBillingOnly
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-background text-text-mid border-gray-200 hover:border-green-600 hover:text-green-700'
              ]"
            >
              <span class="ti ti-circle-check mr-1"></span>Bulk billing
            </button>
          </div>

          <!-- Access -->
          <div class="flex items-center gap-2">
            <span class="font-dm-sans text-xs text-text-light w-20 shrink-0">Access</span>
            <button
              @click="telehealthOnly = !telehealthOnly"
              :class="[
                'px-3 py-1.5 rounded-full font-dm-sans text-xs font-medium border transition',
                telehealthOnly
                  ? 'bg-primary text-white border-primary'
                  : 'bg-background text-text-mid border-gray-200 hover:border-primary hover:text-primary'
              ]"
            >
              <span class="ti ti-video mr-1"></span>Telehealth
            </button>
          </div>

          <!-- Type of care — multi-select -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-dm-sans text-xs text-text-light w-20 shrink-0">Type of care</span>
            <button
              v-for="t in typeFilters"
              :key="t.value"
              @click="toggleType(t.value)"
              :class="[
                'px-3 py-1.5 rounded-full font-dm-sans text-xs font-medium border transition',
                activeTypes.includes(t.value)
                  ? 'bg-accent-dark text-white border-accent-dark'
                  : 'bg-background text-text-mid border-gray-200 hover:border-accent-dark hover:text-accent-dark'
              ]"
            >
              <span :class="['ti mr-1', t.icon]"></span>{{ t.label }}
            </button>
          </div>

        </div>

        <!-- Active filter summary + clear -->
        <div v-if="hasActiveFilters" class="flex items-center justify-between pt-1 border-t border-gray-100">
          <p class="font-dm-sans text-xs text-text-light">
            {{ filtered.length }} clinic{{ filtered.length === 1 ? '' : 's' }} match your filters
          </p>
          <button
            @click="resetFilters"
            class="font-dm-sans text-xs text-accent-dark hover:underline"
          >
            Clear all
          </button>
        </div>

      </div>
    </div>

    <!-- Results -->
    <div class="max-w-4xl mx-auto px-4 py-8">

      <!-- Location error -->
      <div
        v-if="locationError"
        class="mb-5 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 font-dm-sans text-sm text-amber-800 flex items-start gap-2"
      >
        <span class="ti ti-alert-triangle mt-0.5 shrink-0"></span>
        {{ locationError }}
      </div>

      <!-- Sorted-by-distance note -->
      <p v-if="userCoords && !locationError" class="font-dm-sans text-xs text-text-light mb-4 flex items-center gap-1">
        <span class="ti ti-current-location"></span>
        Showing clinics closest to your location first
      </p>

      <!-- Result count (no active filters) -->
      <p v-else-if="!hasActiveFilters" class="font-dm-sans text-sm text-text-light mb-5">
        {{ filtered.length }} clinic{{ filtered.length === 1 ? '' : 's' }} found
      </p>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-20">
        <span class="ti ti-loader-2 animate-spin text-3xl text-accent-dark"></span>
        <p class="font-dm-sans text-sm text-text-mid mt-3">Loading clinics…</p>
      </div>

      <!-- Fetch error -->
      <div
        v-else-if="fetchError"
        class="mb-5 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 font-dm-sans text-sm text-amber-800"
      >
        {{ fetchError }}
      </div>

      <!-- Cards -->
      <div v-if="filtered.length > 0" class="flex flex-col gap-4">
        <div
          v-for="provider in filtered"
          :key="provider.id"
          class="bg-surface rounded-2xl border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow"
        >
          <!-- Header -->
          <div class="mb-3">
            <span :class="['inline-block px-2 py-0.5 rounded-full text-xs font-dm-sans font-medium mb-1.5', typeBadgeClass(provider.type)]">
              {{ typeLabel(provider.type) }}
            </span>
            <h2 class="font-lora text-lg text-dark">{{ provider.name }}</h2>
            <p class="font-dm-sans text-sm text-text-mid mt-0.5">
              <span class="ti ti-map-pin text-text-light mr-1"></span>
              {{ provider.address }}
              <span v-if="provider._distanceKm !== undefined" class="ml-2 text-text-light">
                · {{ provider._distanceKm }} km away
              </span>
            </p>
          </div>

          <!-- Info chips -->
          <div class="flex flex-wrap gap-2 mb-3">
            <!-- Bulk billing -->
            <span
              v-if="provider.bulk_billing === true"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-dm-sans font-medium"
            >
              <span class="ti ti-circle-check text-sm"></span>Bulk billing
            </span>
            <span
              v-else-if="provider.bulk_billing === false"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 text-text-mid text-xs font-dm-sans"
            >
              <span class="ti ti-circle-x text-sm"></span>No bulk billing
            </span>
            <span
              v-else
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-dm-sans"
            >
              <span class="ti ti-help-circle text-sm"></span>Call to confirm bulk billing
            </span>

            <!-- Telehealth -->
            <span
              v-if="provider.telehealth"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-dm-sans font-medium"
            >
              <span class="ti ti-video text-sm"></span>Telehealth
            </span>

            <!-- Phone -->
            <a
              :href="`tel:${provider.phone}`"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background text-text-mid text-xs font-dm-sans hover:text-primary transition"
            >
              <span class="ti ti-phone text-sm"></span>{{ provider.phone }}
            </a>
          </div>

          <!-- Languages -->
          <div v-if="provider.languages?.length" class="flex flex-wrap gap-1.5 mb-5">
            <span
              v-for="lang in provider.languages"
              :key="lang"
              class="px-2 py-0.5 rounded bg-accent-light text-accent-dark text-xs font-dm-sans"
            >
              {{ lang }}
            </span>
          </div>

          <!-- Booking CTAs -->
          <div class="flex flex-wrap gap-2">
            <a
              v-if="provider.hotdoc_url"
              :href="provider.hotdoc_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white font-dm-sans text-sm font-medium hover:bg-primary-mid transition"
            >
              Book via HotDoc <span class="ti ti-external-link text-sm"></span>
            </a>
            <a
              v-if="provider.healthengine_url"
              :href="provider.healthengine_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary text-primary font-dm-sans text-sm font-medium hover:bg-primary-light transition"
            >
              Book via HealthEngine <span class="ti ti-external-link text-sm"></span>
            </a>
          </div>

        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20 px-4">
        <div class="w-14 h-14 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-4">
          <span class="ti ti-stethoscope text-2xl text-accent-dark"></span>
        </div>
        <h3 class="font-lora text-xl text-dark mb-2">No clinics found</h3>
        <p class="font-dm-sans text-sm text-text-mid max-w-sm mx-auto mb-5">
          Try a different suburb or postcode, or broaden your filters.
        </p>
        <button
          @click="resetFilters"
          class="px-4 py-2 rounded-lg border border-primary text-primary font-dm-sans text-sm hover:bg-primary-light transition"
        >
          Clear all filters
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Data ---
const providers = ref([])
const loading = ref(true)
const fetchError = ref('')

onMounted(async () => {
  try {
    const res = await fetch('https://withher.onrender.com/api/providers')
    if (!res.ok) throw new Error('Failed to fetch')
    providers.value = await res.json()
  } catch (err) {
    fetchError.value = 'Couldn\'t load clinics right now. Please try again later.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

// --- Filter state ---
const search = ref('')
const activeTypes = ref([])
const bulkBillingOnly = ref(false)
const telehealthOnly = ref(false)
const userCoords = ref(null)
const locating = ref(false)
const locationError = ref('')

// --- Type filter options ---
const typeFilters = [
  { value: 'gp',     label: 'GP',             icon: 'ti-stethoscope' },
  { value: 'obgyn',  label: "Women's health", icon: 'ti-heart' },
  { value: 'mental', label: 'Mental health',  icon: 'ti-brain' },
  { value: 'physio', label: 'Physio',         icon: 'ti-activity' },
]

function toggleType(value) {
  const idx = activeTypes.value.indexOf(value)
  if (idx === -1) {
    activeTypes.value.push(value)
  } else {
    activeTypes.value.splice(idx, 1)
  }
}

const hasActiveFilters = computed(() =>
  search.value.length > 0 ||
  activeTypes.value.length > 0 ||
  bulkBillingOnly.value ||
  telehealthOnly.value ||
  userCoords.value !== null
)

function resetFilters() {
  search.value = ''
  activeTypes.value = []
  bulkBillingOnly.value = false
  telehealthOnly.value = false
  userCoords.value = null
  locationError.value = ''
}

// --- Geolocation ---
function useMyLocation() {
  if (!navigator.geolocation) {
    locationError.value = 'Your browser doesn\'t support location access.'
    return
  }
  locating.value = true
  locationError.value = ''
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords.value = [pos.coords.longitude, pos.coords.latitude]
      locating.value = false
      search.value = ''
    },
    (err) => {
      locating.value = false
      locationError.value =
        err.code === 1
          ? 'Location access was denied. You can still search by suburb or postcode.'
          : 'Couldn\'t get your location. Please search manually.'
    },
    { timeout: 8000 }
  )
}

// --- Haversine distance ---
function distanceKm([lng1, lat1], [lng2, lat2]) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// --- Filtered + sorted list ---
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()

  let results = providers.value.filter((p) => {
    if (q.length > 0) {
      const matchesSuburb = p.suburb?.toLowerCase().includes(q)
      const matchesPostcode = p.postcode?.startsWith(q)
      if (!matchesSuburb && !matchesPostcode) return false
    }
    if (activeTypes.value.length > 0 && !activeTypes.value.includes(p.type)) return false
    if (bulkBillingOnly.value && p.bulk_billing !== true) return false
    if (telehealthOnly.value && !p.telehealth) return false
    return true
  })

  if (userCoords.value) {
    results = results
      .map((p) => ({
        ...p,
        _distanceKm: p.coords
          ? parseFloat(distanceKm(userCoords.value, p.coords).toFixed(1))
          : null,
      }))
      .sort((a, b) => {
        if (a._distanceKm === null) return 1
        if (b._distanceKm === null) return -1
        return a._distanceKm - b._distanceKm
      })
  }

  return results
})

// --- Display helpers ---
function typeLabel(type) {
  return {
    gp:     'General Practitioner',
    obgyn:  "Women's Health",
    mental: 'Mental Health',
    physio: 'Physiotherapy',
  }[type] || type
}

function typeBadgeClass(type) {
  return {
    gp:     'bg-primary-light text-primary',
    obgyn:  'bg-accent-light text-accent-dark',
    mental: 'bg-purple-50 text-purple-700',
    physio: 'bg-green-50 text-green-700',
  }[type] || 'bg-gray-100 text-text-mid'
}
</script>