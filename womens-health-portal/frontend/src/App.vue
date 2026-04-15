<script setup>
import { onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { current } from '@/stores/user'
import { logout } from '@/services/auth'

const router = useRouter()
const route = useRoute()

async function handleLogout () {
  try {
    await logout()
    router.replace('/')
  } catch (e) { console.error(e) }
}

/* ---- A11y helpers: title, focus, live region announce ---- */
function pageTitleFromRoute(r) {
  return ((r.meta?.title || r.name || 'Women’s Health') + ' – Women’s Health')
}
function focusMain() {
  const main = document.getElementById('main')
  if (main) {
    main.setAttribute('tabindex', '-1')
    main.focus()
  }
}
function announce(text) {
  const box = document.getElementById('a11y-announcer')
  if (box) box.textContent = text
}

onMounted(() => {
  const t = pageTitleFromRoute(route)
  document.title = t
  // initial focus for keyboard users if needed:
  // focusMain()
  announce(t)
})

watch(() => route.fullPath, () => {
  const t = pageTitleFromRoute(route)
  document.title = t
  focusMain()
  announce(t)
})
</script>

<template>
  <!-- Skip link visible on keyboard focus -->
  <a class="skip-link" href="#main">Skip to main content</a>

  <header role="banner">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm" role="navigation" aria-label="Primary">
      <div class="container">
        <RouterLink class="navbar-brand fw-bold" to="/">Women's Health</RouterLink>

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
            <li class="nav-item"><RouterLink class="nav-link" to="/learn">Learn &amp; Explore</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/care">Find Care</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/community">Community &amp; Support</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/hub">My Health Hub</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/about">About Us</RouterLink></li>

            <li class="nav-item" v-if="current.role === 'pro'">
              <RouterLink class="nav-link" to="/pro">Pro Panel</RouterLink>
            </li>

            <li class="nav-item" v-if="!current.user">
              <RouterLink class="nav-link" to="/firebase-login">Login</RouterLink>
            </li>

            <li class="nav-item dropdown" v-else>
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
  </header>

  <!-- Live region for screen readers to announce route changes -->
  <div id="a11y-announcer" class="sr-only" aria-live="polite"></div>

  <main id="main" class="main-wrapper" role="main">
    <div class="page">
      <RouterView />
    </div>
  </main>
</template>

<style>
/* Visually hidden but available to screen readers */
.sr-only {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}

/* Skip link shows on focus */
.skip-link {
  position: absolute;
  left: 8px; top: -40px;
  z-index: 1000;
  background: #111; color: #fff;
  padding: .5rem .75rem;
  border-radius: .5rem;
  text-decoration: none;
}
.skip-link:focus { top: 8px; }

/* Clear visible focus ring for keyboard users */
:focus-visible {
  outline: 3px solid #0d6efd;
  outline-offset: 2px;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

/* Space under the fixed nav */
.main-wrapper {
  padding-top: 4.5rem; /* adjust if your navbar height differs */
}
</style>