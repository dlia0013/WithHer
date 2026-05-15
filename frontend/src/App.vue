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

function pageTitleFromRoute(r) {
  return ((r.meta?.title || r.name || 'Women\'s Health') + ' - WithHer')
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
  <a class="skip-link" href="#main">Skip to main content</a>

  <header role="banner">
    <nav class="navbar navbar-expand-lg fixed-top wh-nav" role="navigation" aria-label="Primary">
      <div class="container">
        <RouterLink class="navbar-brand wh-brand" to="/">
          With<span class="brand-accent">Her</span>
        </RouterLink>

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
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item"><RouterLink class="nav-link" to="/learn">Learn &amp; Explore</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/care">Find Care</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/community">Community &amp; Support</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/about">About Us</RouterLink></li>
            <li class="nav-item ms-lg-2" v-if="!current.user">
              <RouterLink class="nav-link" to="/auth">Login</RouterLink>
            </li>

            <template v-else>
              <li class="nav-item ms-lg-2">
                <RouterLink class="nav-cta" to="/hub">My Health Hub</RouterLink>
              </li>
              <li class="nav-item dropdown ms-lg-2">
                <a
                  class="nav-link nav-user dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ current.user.email || 'Account' }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
                </ul>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div id="a11y-announcer" class="sr-only" aria-live="polite"></div>

  <main id="main" class="main-wrapper" role="main">
    <RouterView />
  </main>
</template>

<style>
.sr-only {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}

.skip-link {
  position: absolute;
  left: 8px; top: -40px;
  z-index: 9999;
  background: #111; color: #fff;
  padding: .5rem .75rem;
  border-radius: .5rem;
  text-decoration: none;
}
.skip-link:focus { top: 8px; }

:focus-visible {
  outline: 3px solid #1B3A5C;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}


body {
  background-color: #F9F8F7 !important;
  color: #0D1F33;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.main-wrapper {
  padding-top: 4.5rem;
  min-height: 100vh; /* 确保内容不足一屏时背景也铺满 */
}

.wh-nav {
  background: #FFFFFF;
  border-bottom: 0.5px solid #e2e8f0;
}

/* Logo */
.wh-brand {
  font-family: 'Lora', Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  color: #1B3A5C !important; /* !important 覆盖 Bootstrap 的默认颜色 */
  text-decoration: none;
  letter-spacing: -0.3px;
}
.brand-accent { color: #b8737a; } /* blush accent on "Her" */

/* Nav links */
.wh-nav .nav-link {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  color: #4a5a6b !important;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
}
.wh-nav .nav-link:hover,
.wh-nav .nav-link.router-link-active {
  color: #1B3A5C !important;
}

/* "My Health Hub" 实心按钮样式 */
.nav-cta {
  display: inline-block;
  background: #1B3A5C;
  color: white !important;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 100px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.nav-cta:hover { background: #2d5480; transform: translateY(-1px); }

.nav-user {
  font-size: 13px !important;
  color: #8a9bb0 !important;
}

.wh-nav .navbar-toggler { border-color: #e2e8f0; }
.wh-nav .dropdown-menu  { border-color: #e2e8f0; border-radius: 12px; }
.wh-nav .dropdown-item  {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  color: #4a5a6b;
}
.wh-nav .dropdown-item:hover { color: #1B3A5C; background: #e8eef5; }
</style>