<template>
  <div class="page">
    <section>
      <h1 class="h3 mb-4">Find Care</h1>

      <form novalidate @submit.prevent="onSubmit" class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="name">Full name</label>
          <input id="name" v-model.trim="form.name"
                 :class="['form-control', invalid.name && 'is-invalid']"
                 type="text" placeholder="e.g., Jane Doe"
                 @blur="touch('name')" required />
          <div class="invalid-feedback">Name is required.</div>
        </div>

        <div class="col-md-6">
          <label class="form-label" for="email">Email</label>
          <input id="email" v-model.trim="form.email"
                 :class="['form-control', invalid.email && 'is-invalid']"
                 type="email" placeholder="e.g., jane@example.com"
                 @blur="touch('email')" required autocomplete="email" />
          <div class="invalid-feedback">Please enter a valid email.</div>
        </div>

        <!-- Postcode -->
        <div class="col-md-4">
          <label class="form-label" for="postcode">Postcode (AU)</label>
          <input id="postcode" v-model.trim="form.postcode"
                 :class="['form-control', invalid.postcode && 'is-invalid']"
                 type="text" inputmode="numeric" maxlength="4"
                 placeholder="e.g., 3000"
                 @input="digitsOnly('postcode')" @blur="touch('postcode')" required />
          <div class="invalid-feedback">Postcode must be 4 digits.</div>
        </div>

        <div class="col-md-4">
          <label class="form-label" for="type">Appointment type</label>
          <select id="type" v-model="form.type"
                  :class="['form-select', invalid.type && 'is-invalid']"
                  @blur="touch('type')" required>
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

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        <div class="col" v-for="p in filteredProviders" :key="p.id">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title h6 mb-1">{{ p.name }}</h3>
              <p class="card-text mb-2">{{ p.address }}</p>
              <span class="badge bg-secondary me-2">{{ typeLabel(p.type) }}</span>
              <span class="badge bg-light text-dark me-2">Postcode: {{ p.postcode }}</span>
              <span class="small text-muted">Avg rating: {{ avgFor(p.id) }}</span>
            </div>

            <div class="card-footer bg-transparent d-flex gap-2">
              <RouterLink
                class="btn btn-sm btn-outline-primary"
                :to="{ name: 'provider-details', params: { id: p.id } }">
                View details
              </RouterLink>

              <RouterLink
                class="btn btn-sm btn-primary"
                :to="{
                  path: `/providers/${p.id}/book`,
                  query: { doctor: p.name, email: p.email || '' }
                }">
                Book appointment
              </RouterLink>
            </div>
          </div>
        </div>

        <div v-if="filteredProviders.length === 0" class="col">
          <div class="alert alert-warning">No providers match your filters yet.</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { providers } from '../data/providers'
import { getAverage } from '../services/ratings'

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
function digitsOnly(key) { form[key] = form[key].replace(/\D+/g, '').slice(0, 4); if (touched[key]) validateField(key) }
function validateAll() { ['name','email','postcode','type'].forEach(k => { touched[k]=true; validateField(k) }); return !Object.values(invalid).some(Boolean) }

function onSubmit() {
  saved.value = false
  if (!validateAll()) return
  localStorage.setItem('carePrefs', JSON.stringify(form))
  saved.value = true
}
function resetForm() { Object.assign(form, { name:'', email:'', postcode:'', type:'' }); Object.keys(touched).forEach(k=>delete touched[k]); Object.keys(invalid).forEach(k=>delete invalid[k]); saved.value=false }

onMounted(() => { const raw = localStorage.getItem('carePrefs'); if (raw) { try { Object.assign(form, JSON.parse(raw)) } catch {} } })

const filteredProviders = computed(() => {
  const pcPrefix = form.postcode?.slice(0, 2)
  return providers.filter(p => {
    const byType = form.type ? p.type === form.type : true
    const byPC = pcPrefix ? p.postcode.startsWith(pcPrefix) : true
    return byType && byPC
  })
})

function typeLabel(v) {
  return { gp:'General Practitioner', obgyn:'OB-GYN', mental:'Mental Health', physio:'Physiotherapy' }[v] || 'Unknown'
}
function avgFor(id) { return getAverage(id) || 0 }
</script>