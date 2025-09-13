<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { getProviderById } from '../data/providers';
import StarRating from '../components/StarRating.vue';

const route = useRoute();
const provider = getProviderById(route.params.id);
</script>

<template>
  <div class="container mt-4" v-if="provider">
    <RouterLink to="/care" class="text-decoration-none">&larr; Back to providers</RouterLink>
    <h2 class="mt-2">{{ provider.name }}</h2>
    <p class="mb-1">{{ provider.address }}</p>
    <p class="text-muted small">Type: {{ provider.type }} • Postcode: {{ provider.postcode }}</p>

    <hr/>
    <h5 class="mb-2">Rate this provider</h5>
    <StarRating :itemId="provider.id" />

    <hr/>
    <p class="text-muted">* Ratings are stored locally for demo (A1.3). No real data submitted.</p>
  </div>

  <div v-else class="container mt-4">
    <p>Provider not found.</p>
  </div>
</template>