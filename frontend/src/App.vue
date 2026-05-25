<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { current } from '@/stores/user'
import { logout } from '@/services/auth'

const router = useRouter()
const route = useRoute()

/*
  Mobile menu state.
  ref() creates a reactive variable — when it changes, Vue re-renders.
  We use this instead of Bootstrap's data-bs-toggle, so no Bootstrap JS needed.
*/
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
function toggleDropdown() { isDropdownOpen.value = !isDropdownOpen.value }

// Close menus when user navigates (tapped a link on mobile)
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
})

async function handleLogout() {
  try {
    await logout()
    router.replace('/')
  } catch (e) { console.error(e) }
}

// A11y helpers — update page title and announce route changes to screen readers
function pageTitleFromRoute(r) {
  return (r.meta?.title || r.name || "Women's Health") + ' — WithHer'
}
function focusMain() {
  const main = document.getElementById('main')
  if (main) { main.setAttribute('tabindex', '-1'); main.focus() }
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

/*
  Nav links as data — v-for in the template loops over this.
  Adding a new nav item = just add one line here, no template edits.
*/
const navLinks = [
  { to: '/learn',     label: 'Learn & Explore' },
  { to: '/care',      label: 'Find Care' },
  { to: '/community', label: 'Community & Support' },
  { to: '/about',     label: 'About Us' },
]
</script>

<template>
  <!-- Skip link: only visible on keyboard focus -->
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[9999] focus:bg-dark focus:text-white focus:px-3 focus:py-2 focus:rounded-lg focus:no-underline"
  >
    Skip to main content
  </a>

  <!-- NAVBAR -->
  <header role="banner">
    <nav
      class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e8f0]"
      role="navigation"
      aria-label="Primary"
    >
      <div class="w-full px-6 md:px-10 h-16 flex items-center justify-between">

        <!-- Logo -->
        <RouterLink
          to="/"
          class="font-lora text-[20px] font-semibold text-primary no-underline tracking-[-0.3px]"
        >
          With<span class="text-accent-dark">Her</span>
        </RouterLink>

        <!-- Desktop links — hidden on mobile -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-[14px] text-text-mid px-3 py-2 rounded-lg no-underline transition-colors duration-200 hover:text-dark"
            active-class="text-primary font-medium"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Logged out -->
          <template v-if="!current.user">
            <RouterLink
              to="/auth"
              class="ml-1 text-[14px] text-text-mid px-3 py-2 no-underline transition-colors duration-200 hover:text-dark"
            >
              Login
            </RouterLink>
          </template>

          <!-- Logged in -->
          <template v-else>
            <RouterLink
              to="/hub"
              class="ml-2 bg-primary text-white text-[14px] font-medium px-[18px] py-2 rounded-full no-underline transition-all duration-200 hover:bg-primary-mid hover:-translate-y-px"
            >
              My Health Hub
            </RouterLink>

            <!-- Account dropdown -->
            <div class="relative ml-2">
              <button
                @click="toggleDropdown"
                :aria-expanded="isDropdownOpen"
                class="flex items-center gap-1 text-[13px] text-text-light px-3 py-2 rounded-lg transition-colors duration-200 hover:text-text-mid"
              >
                {{ current.user.email || 'Account' }}
                <i
                  class="ti ti-chevron-down text-xs transition-transform duration-200"
                  :class="isDropdownOpen ? 'rotate-180' : ''"
                />
              </button>

              <div
                v-if="isDropdownOpen"
                class="absolute right-0 top-full mt-1 bg-white border border-[#e2e8f0] rounded-xl shadow-[0_4px_16px_rgba(13,31,51,0.08)] py-1 min-w-[140px]"
              >
                <button
                  @click="handleLogout"
                  class="w-full text-left text-[14px] text-text-mid px-4 py-2 transition-colors duration-200 hover:text-primary hover:bg-primary-light"
                >
                  Logout
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile: hamburger -->
        <button
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation"
          class="md:hidden p-2 rounded-lg text-text-mid transition-colors duration-200 hover:text-dark hover:bg-[#f0f4f8]"
        >
          <!--
            Switch between menu and X icon based on state.
            Tabler Icons: ti-menu-2 = hamburger, ti-x = close
          -->
          <i :class="isMenuOpen ? 'ti ti-x' : 'ti ti-menu-2'" class="text-xl" />
        </button>
      </div>

      <!-- Mobile menu — animated with Vue <Transition> -->
      <!--
        <Transition> is a Vue built-in component that applies CSS classes
        at the right moments during enter/leave.
        enter-from = initial state (hidden), enter-to = final state (visible)
        leave is the reverse. Tailwind transition classes do the actual animation.
      -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden bg-white border-t border-[#e2e8f0] px-5 py-3 flex flex-col gap-0.5"
        >
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-[15px] text-text-mid py-2.5 px-3 rounded-lg no-underline transition-colors duration-200 hover:text-dark hover:bg-[#f8f9fa]"
            active-class="text-primary font-medium bg-primary-light"
          >
            {{ link.label }}
          </RouterLink>

          <template v-if="!current.user">
            <RouterLink
              to="/auth"
              class="text-[15px] text-text-mid py-2.5 px-3 rounded-lg no-underline hover:text-dark hover:bg-[#f8f9fa]"
            >
              Login
            </RouterLink>
          </template>

          <template v-else>
            <RouterLink
              to="/hub"
              class="mt-2 bg-primary text-white text-[15px] font-medium px-4 py-3 rounded-full no-underline text-center transition-colors duration-200 hover:bg-primary-mid"
            >
              My Health Hub
            </RouterLink>
            <button
              @click="handleLogout"
              class="mt-1 text-left text-[14px] text-text-light py-2.5 px-3 rounded-lg hover:text-dark"
            >
              Logout
            </button>
          </template>
        </div>
      </Transition>
    </nav>
  </header>

  <!-- A11y: screen readers announce route changes via this live region -->
  <div id="a11y-announcer" class="sr-only" aria-live="polite" />

  <!--
    pt-16 = 64px = navbar height.
    Without this, content hides under the fixed navbar.
    min-h-screen ensures the background covers the full viewport.
  -->
  <main id="main" class="pt-16 min-h-screen" role="main">
    <RouterView />
  </main>
</template>

<style>
/* Global styles — no scoped, these apply app-wide */

/* Respect user's reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

/* Keyboard focus ring — never remove this, it's essential for accessibility */
:focus-visible {
  outline: 3px solid #1B3A5C;
  outline-offset: 2px;
}
</style>