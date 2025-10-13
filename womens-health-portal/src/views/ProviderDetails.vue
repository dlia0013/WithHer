<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { getProviderById } from '../data/providers'
import StarRating from '../components/StarRating.vue'

const route = useRoute()
const provider = getProviderById(route.params.id)  // { id, name, address, type, postcode, email? }
</script>

<template>
  <div class="container mt-4" v-if="provider">
    <RouterLink to="/care" class="text-decoration-none">&larr; Back to providers</RouterLink>

    <div class="d-flex align-items-start justify-content-between mt-2">
      <div class="me-3">
        <h2 class="mb-1">{{ provider.name }}</h2>
        <p class="mb-1">{{ provider.address }}</p>
        <p class="text-muted small mb-1">
          Type: {{ provider.type }} • Postcode: {{ provider.postcode }}
        </p>
        <p v-if="provider.email" class="small mb-0">
          Email: <a :href="`mailto:${provider.email}`">{{ provider.email }}</a>
        </p>
      </div>

      <RouterLink
        class="btn btn-primary"
        :to="{
          name: 'BookAppt',
          params: { id: provider.id },
          query: { doctor: provider.name, email: provider.email || '' }
        }"
      >
        Book appointment
      </RouterLink>
    </div>

    <hr class="my-4"/>

    <h5 class="mb-2">Rate this provider</h5>
    <StarRating :itemId="provider.id" />

    <hr/>
    <p class="text-muted">
      * Ratings are stored locally for demo (A1.3). No real data submitted.
    </p>
  </div>

  <div v-else class="container mt-4">
    <p>Provider not found.</p>
  </div>
</template>