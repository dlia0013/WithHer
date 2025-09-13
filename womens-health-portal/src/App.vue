<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { computed } from 'vue';
import { getCurrentUser, logout } from '@/services/auth'; 

const current = computed(() => getCurrentUser());

function handleLogout() {
  logout();
  window.location.href = '/auth'; 
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/learn">Women's Health</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/learn">Learn & Explore</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/care">Find Care</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/community">Community & Support</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/hub">My Health Hub</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/about">About Us</RouterLink></li>
          <li class="nav-item" v-if="!current"><a class="nav-link" href="/auth">Login</a></li>
          <li class="nav-item" v-else>
            <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="main-wrapper">
    <div class="page">
      <RouterView />
    </div>
  </main>
</template>

<!-- App.vue -->
<style>
:root { --page-max: 1040px; }

.main-wrapper{
  margin-top:80px;
  min-height:calc(100vh - 80px);
  display:flex; justify-content:center; align-items:flex-start;
}

.page{
  width:100%;
  max-width:var(--page-max);
  margin-inline:auto;
  padding-inline:16px;
  box-sizing:border-box;
}

@media (max-width:575.98px){ .page{ max-width:100%; padding-inline:12px; } }
@media (min-width:576px) and (max-width:767.98px){ .page{ max-width:540px; } }
@media (min-width:768px) and (max-width:991.98px){ .page{ max-width:720px; } }
@media (min-width:992px) and (max-width:1199.98px){ .page{ max-width:960px; } }
@media (min-width:1200px){ .page{ max-width:1040px; } }
</style>