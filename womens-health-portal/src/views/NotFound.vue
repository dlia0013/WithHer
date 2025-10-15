<template>
  <section class="nf-wrap">
    <div class="nf-card">
      <h1 class="code">404</h1>
      <h2 class="title">Page not found</h2>
      <p class="desc">
        Oops—looks like this page doesn’t exist or has moved.
      </p>

      <div class="actions">
        <button class="btn btn-outline-secondary" @click="goBack">Go back</button>
        <router-link class="btn btn-primary" :to="{ name: 'home' }">Go to Home</router-link>
      </div>

      <div class="links">
        <router-link to="/care">Find Care</router-link>
        <span>•</span>
        <router-link to="/learn">Learn &amp; Explore</router-link>
        <span>•</span>
        <router-link to="/community">Community &amp; Support</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push({ name: 'home' })
}
</script>

<style scoped>
.nf-wrap {
  min-height: calc(100vh - 120px);
  display: grid;
  place-items: center;
  padding: 2rem;
}
.nf-card {
  max-width: 560px;
  width: 100%;
  text-align: center;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}
.code {
  font-size: 4rem;
  margin: 0;
  letter-spacing: 2px;
  color: #0d6efd;
}
.title {
  margin: .25rem 0 0.5rem;
  font-weight: 600;
}
.desc {
  color: #6c757d;
  margin-bottom: 1.25rem;
}
.actions {
  display: flex;
  justify-content: center;
  gap: .75rem;
  margin-bottom: 1rem;
}
.links {
  display: flex;
  gap: .5rem;
  justify-content: center;
  color: #6c757d;
}
.links a {
  text-decoration: none;
}
</style>