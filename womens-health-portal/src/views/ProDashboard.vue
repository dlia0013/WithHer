<script setup>
import { getCurrentUser } from '../services/auth';
const user = getCurrentUser();
</script>

<template>
  <div class="container mt-4">
    <h2>Health Professional Dashboard</h2>
    <p class="text-muted">Welcome, {{ user?.name }} (role: {{ user?.role }})</p>
    <ul>
      <li>Publish health tips (coming soon)</li>
      <li>Manage appointments (coming soon)</li>
    </ul>
  </div>
</template>