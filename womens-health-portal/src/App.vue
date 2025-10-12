<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { current } from '@/stores/user'
import { logout } from '@/services/auth'

const router = useRouter()
async function handleLogout () {
  try {
    await logout()
    router.replace('/')  
  } catch (e) { console.error(e) }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">Women's Health</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#mainNav" aria-controls="mainNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/learn">Learn & Explore</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/care">Find Care</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/community">Community & Support</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/hub">My Health Hub</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/about">About Us</RouterLink></li>

          <li class="nav-item" v-if="current.role === 'pro'">
            <RouterLink class="nav-link" to="/pro">Pro Panel</RouterLink>
          </li>

          <li class="nav-item" v-if="!current.user">
            <RouterLink class="nav-link" to="/firebase-login">Login</RouterLink>
          </li>

          <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              {{ current.user.email || 'Account' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
            </ul>
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