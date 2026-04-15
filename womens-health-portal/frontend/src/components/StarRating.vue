<script setup>
import { ref, watchEffect } from 'vue';
import { addRating, getAverage } from '../services/ratings';

const props = defineProps({
  itemId: { type: String, required: true },
  readonly: { type: Boolean, default: false }
});
const avg = ref(0);
const myScore = ref(0);

watchEffect(() => { avg.value = getAverage(props.itemId); });

function rate(v) {
  if (!props.itemId || props.readonly) return;
  myScore.value = v;
  avg.value = addRating(props.itemId, v);
}
</script>

<template>
  <div class="d-flex align-items-center gap-2">
    <div class="btn-group" role="group">
      <button v-for="n in 5" :key="n" type="button"
              class="btn btn-sm"
              :class="(myScore>=n)?'btn-warning':'btn-outline-secondary'"
              @click="rate(n)">★</button>
    </div>
    <small class="text-muted">Avg: {{ avg || 0 }}</small>
  </div>
</template>