<template>
  <div class="page">
    <section>
      <h1 class="h3 mb-4">Find Care</h1>

      <form novalidate @submit.prevent="onSubmit" class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="name">Full name</label>
          <input
            id="name"
            v-model.trim="form.name"
            :class="['form-control', invalid.name && 'is-invalid']"
            type="text"
            placeholder="e.g., Jane Doe"
            @blur="touch('name')"
            required
          />
          <div class="invalid-feedback">Name is required.</div>
        </div>

        <div class="col-md-6">
          <label class="form-label" for="email">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            :class="['form-control', invalid.email && 'is-invalid']"
            type="email"
            placeholder="e.g., jane@example.com"
            @blur="touch('email')"
            required
            autocomplete="email"
          />
          <div class="invalid-feedback">Please enter a valid email.</div>
        </div>

        <div class="col-md-4">
          <label class="form-label" for="postcode">Postcode (AU)</label>
          <input
            id="postcode"
            v-model.trim="form.postcode"
            :class="['form-control', invalid.postcode && 'is-invalid']"
            type="text"
            inputmode="numeric"
            maxlength="4"
            placeholder="e.g., 3000"
            @input="digitsOnly('postcode')"
            @blur="touch('postcode')"
            required
          />
          <div class="invalid-feedback">Postcode must be 4 digits.</div>
        </div>

        <div class="col-md-4">
          <label class="form-label" for="type">Appointment type</label>
          <select
            id="type"
            v-model="form.type"
            :class="['form-select', invalid.type && 'is-invalid']"
            @blur="touch('type')"
            required
          >
            <option value="">Select…</option>
            <option value="gp">General Practitioner</option>
            <option value="obgyn">OB-GYN</option>
            <option value="mental">Mental Health</option>
            <option value="physio">Physiotherapy</option>
          </select>
          <div class="invalid-feedback">Please choose a type.</div>
        </div>

        <div class="col-12 d-flex gap-2">
          <button class="btn btn-primary" type="submit">Save preferences</button>
          <button class="btn btn-outline-secondary" type="button" @click="resetForm">Reset</button>
        </div>
      </form>

      <div v-if="saved" class="alert alert-success mt-4" role="status">
        Preferences saved. Showing providers near <strong>{{ form.postcode }}</strong> for
        <strong>{{ typeLabel(form.type) }}</strong>.
      </div>

      <hr class="my-4" />
      <h2 class="h5 mb-3">Providers</h2>
      <p class="text-muted mb-3">
        {{ filteredProviders.length }} result(s)
        <span v-if="form.postcode"> • Postcode starts with {{ form.postcode.slice(0, 2) }}</span>
        <span v-if="form.type"> • Type: {{ typeLabel(form.type) }}</span>
      </p>

      <!-- Map + Table -->
      <div class="row g-4 align-items-start">
        <div class="col-lg-6">
          <ProviderMap :rows="rowsForMap" @select="onMapSelect" />
        </div>
        <div class="col-lg-6">
          <ProviderTable
            :items="filteredProviders"
            :get-avg="avgFor"
            :initial-filters="{ postcodePrefix: form.postcode.slice(0,2), type: form.type }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { providers } from '@/data/providers'
import { getAverage } from '@/services/ratings'
import ProviderTable from '@/components/ProviderTable.vue'
import ProviderMap from '@/components/ProviderMap.vue'

const router = useRouter()

const form = reactive({ name: '', email: '', postcode: '', type: '' })
const touched = reactive({})
const invalid = reactive({})
const saved = ref(false)

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isAUPostcode = (v) => /^\d{4}$/.test(v)
const required = (v) => !!v

function validateField(key) {
  const v = form[key]
  if (key === 'name') invalid.name = !required(v)
  if (key === 'email') invalid.email = !(required(v) && isEmail(v))
  if (key === 'postcode') invalid.postcode = !(required(v) && isAUPostcode(v))
  if (key === 'type') invalid.type = !required(v)
}
function touch(key) { touched[key] = true; validateField(key) }
function digitsOnly(key) {
  form[key] = form[key].replace(/\D+/g, '').slice(0, 4)
  if (touched[key]) validateField(key)
}
function validateAll() {
  ;['name','email','postcode','type'].forEach(k => { touched[k]=true; validateField(k) })
  return !Object.values(invalid).some(Boolean)
}

function onSubmit() {
  saved.value = false
  if (!validateAll()) return
  localStorage.setItem('carePrefs', JSON.stringify(form))
  saved.value = true
}
function resetForm() {
  Object.assign(form, { name:'', email:'', postcode:'', type:'' })
  Object.keys(touched).forEach(k=>delete touched[k])
  Object.keys(invalid).forEach(k=>delete invalid[k])
  saved.value=false
}

onMounted(() => {
  const raw = localStorage.getItem('carePrefs')
  if (raw) {
    try { Object.assign(form, JSON.parse(raw)) } catch {}
  }
})

const filteredProviders = computed(() => {
  const pcPrefix = form.postcode?.slice(0, 2)
  return providers.filter(p => {
    const byType = form.type ? p.type === form.type : true
    const byPC = pcPrefix ? p.postcode.startsWith(pcPrefix) : true
    return byType && byPC
  })
})

/** --- Map rows: normalize coords and fallback to postcode centers --- */
const POSTCODE_CENTER = {
  '3000': [144.9631, -37.8136], // Melbourne CBD
  '3002': [144.9842, -37.8125], // East Melbourne
  '3020': [144.8320, -37.7830], // Sunshine
  '3024': [144.7008, -37.8098], // Truganina
  '3053': [144.9660, -37.7980], // Carlton
  '3072': [145.0160, -37.7390], // Preston
  '3121': [145.0050, -37.8280], // Richmond
  '3145': [145.0520, -37.8770], // Malvern East
  '3150': [145.1650, -37.8780], // Glen Waverley
  '3186': [144.9930, -37.9030], // Brighton
}

function ensureCoords(p) {
  // prefer p.coords: [lng, lat]
  if (Array.isArray(p.coords) && p.coords.length === 2) {
    const lng = Number(p.coords[0]); const lat = Number(p.coords[1])
    if (Number.isFinite(lng) && Number.isFinite(lat)) return [lng, lat]
  }
  // support p.lng / p.lat
  if (Number.isFinite(Number(p.lng)) && Number.isFinite(Number(p.lat))) {
    return [Number(p.lng), Number(p.lat)]
  }
  // fallback to postcode center
  if (p.postcode && POSTCODE_CENTER[p.postcode]) return POSTCODE_CENTER[p.postcode]
  return null
}

const rowsForMap = computed(() =>
  filteredProviders.value
    .map(p => {
      const coords = ensureCoords(p)
      return coords ? { ...p, coords } : null
    })
    .filter(Boolean)
)
/** ------------------------------------------------------------------- */

function typeLabel(v) {
  return { gp:'General Practitioner', obgyn:'OB-GYN', mental:'Mental Health', physio:'Physiotherapy' }[v] || 'Unknown'
}
function avgFor(id) { return getAverage(id) || 0 }

function onMapSelect(id) {
  router.push({ name: 'provider-details', params: { id } })
}

function goBook(p) {
  router.push({
    name: 'appointment',
    query: {
      providerId: p.id,
      doctor: p.name,
      clinicEmail: p.email || ''
    }
  })
}
</script>