<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login, register } from '@/services/auth'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

onMounted(() => { document.body.style.backgroundColor = '#F9F8F7' })
onUnmounted(() => { document.body.style.backgroundColor = '' })

const route = useRoute()
const router = useRouter()

const mode = ref('login')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const loginForm = ref({ email: '', password: '' })
const regForm = ref({ name: '', email: '', password: '', confirm: '' })

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const strongPwRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

function validateLogin() {
  errorMsg.value = ''
  if (!emailRe.test(loginForm.value.email)) { errorMsg.value = 'Invalid email format'; return false }
  if (!strongPwRe.test(loginForm.value.password)) { errorMsg.value = 'Password must be ≥8 chars and include letters & numbers'; return false }
  return true
}

function validateRegister() {
  errorMsg.value = ''
  const pw = regForm.value.password
  if (!regForm.value.name.trim()) { errorMsg.value = 'Name is required'; return false }
  if (!emailRe.test(regForm.value.email)) { errorMsg.value = 'Invalid email format'; return false }
  if (!strongPwRe.test(pw)) { errorMsg.value = 'Password must be ≥8 chars, include letters & numbers'; return false }
  if (pw !== regForm.value.confirm) { errorMsg.value = 'Passwords do not match'; return false }
  return true
}

function goAfterAuth() {
  const target = (typeof route.query.redirect === 'string' && route.query.redirect) ? route.query.redirect : '/hub'
  router.replace(target)
}

function switchMode(m) {
  mode.value = m
  errorMsg.value = ''
  successMsg.value = ''
}

async function onForgotPassword() {
  if (!emailRe.test(loginForm.value.email)) {
    errorMsg.value = 'Enter your email above first'
    return
  }
  try {
    await sendPasswordResetEmail(auth, loginForm.value.email)
    successMsg.value = 'Password reset email sent! Check your inbox.'
  } catch (e) {
    errorMsg.value = e.message || 'Failed to send reset email'
  }
}

async function onLogin() {
  if (!validateLogin()) return
  loading.value = true; errorMsg.value = ''; successMsg.value = ''
  try {
    await login(loginForm.value)
    successMsg.value = "You're in! Taking you there now.."
    setTimeout(goAfterAuth, 500)
  } catch (e) {
    errorMsg.value = (e && e.message) ? e.message : "Hmm, something's not right — check your email or password"
  } finally {
    loading.value = false
  }
}

async function onRegister() {
  if (!validateRegister()) return
  loading.value = true; errorMsg.value = ''; successMsg.value = ''
  try {
    await register({ name: regForm.value.name, email: regForm.value.email, password: regForm.value.password })
    successMsg.value = "You're in! Taking you there now.."
    setTimeout(goAfterAuth, 500)
  } catch (e) {
    errorMsg.value = (e && e.message) ? e.message : "Hmm, something's not right — check your email or password"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4.5rem)] flex justify-center p-8">
    <div class="my-auto bg-white rounded-2xl border border-[#e8e4e0] py-10 px-10 w-full max-w-[460px]">

      <!-- Brand -->
      <div class="flex items-center justify-center gap-1.5 mb-5">
        <span class="text-[17px] font-medium text-primary">With Her</span>
        <span class="w-[7px] h-[7px] bg-accent rounded-full inline-block"></span>
      </div>

      <!-- Heading -->
      <h1 class="text-[26px] font-semibold text-dark text-center mb-[0.35rem]">{{ mode === 'login' ? 'Welcome back' : "We're here " }}</h1>
      <p class="text-base text-[#888780] text-center mb-5">{{ mode === 'login' ? 'Sign in to your account' : 'Join With Her today' }}</p>
      <div class="w-8 h-[3px] bg-accent rounded-sm mx-auto mb-6"></div>

      <!-- Tab switcher -->
      <div class="flex bg-background rounded-[10px] p-1 gap-1 mb-6">
        <button
          class="flex-1 py-2.5 border-0 rounded-lg text-base font-medium cursor-pointer transition-colors duration-150"
          :class="mode === 'login' ? 'bg-primary text-white' : 'bg-transparent text-[#888780]'"
          @click="switchMode('login')"
        >Sign in</button>
        <button
          class="flex-1 py-2.5 border-0 rounded-lg text-base font-medium cursor-pointer transition-colors duration-150"
          :class="mode === 'register' ? 'bg-primary text-white' : 'bg-transparent text-[#888780]'"
          @click="switchMode('register')"
        >Register</button>
      </div>

      <!-- Alerts -->
      <div v-if="errorMsg" class="rounded-lg py-2.5 px-3.5 text-[15px] mb-4 bg-[#FCEBEB] text-[#A32D2D]">{{ errorMsg }}</div>
      <div v-if="successMsg" class="rounded-lg py-2.5 px-3.5 text-[15px] mb-4 bg-[#E1F5EE] text-[#0F6E56]">{{ successMsg }}</div>

      <!-- Login form -->
      <form v-if="mode === 'login'" @submit.prevent="onLogin" novalidate>
        <div class="mb-[1.1rem]">
          <label for="lemail" class="block text-[15px] font-medium text-dark mb-[6px]">Email</label>
          <input id="lemail" type="email" v-model.trim="loginForm.email" autocomplete="email" required
            class="w-full box-border px-4 py-3 border border-[#d8d4d0] rounded-lg text-base text-dark bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
        </div>
        <div class="mb-[1.1rem]">
          <label for="lpw" class="block text-[15px] font-medium text-dark mb-[6px]">Password</label>
          <input id="lpw" type="password" v-model="loginForm.password" autocomplete="current-password" required
            class="w-full box-border px-4 py-3 border border-[#d8d4d0] rounded-lg text-base text-dark bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
        </div>
        <div class="text-right mb-4">
          <button type="button" @click="onForgotPassword"
            class="bg-transparent border-0 text-sm text-primary cursor-pointer p-0 hover:underline">Forgot password?</button>
        </div>
        <button
          class="w-full py-[13px] bg-primary text-white border-0 rounded-lg text-[17px] font-medium cursor-pointer mt-1 transition-colors duration-150 hover:bg-dark disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <!-- Register form -->
      <form v-if="mode === 'register'" @submit.prevent="onRegister" novalidate autocomplete="off">
        <div class="mb-[1.1rem]">
          <label for="rname" class="block text-[15px] font-medium text-dark mb-[6px]">What can we call you?</label>
          <input id="rname" type="text" v-model.trim="regForm.name" autocomplete="name" required
            class="w-full box-border px-4 py-3 border border-[#d8d4d0] rounded-lg text-base text-dark bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
        </div>
        <div class="mb-[1.1rem]">
          <label for="remail" class="block text-[15px] font-medium text-dark mb-[6px]">Your email address</label>
          <input id="remail" type="email" v-model.trim="regForm.email" autocomplete="email" required
            class="w-full box-border px-4 py-3 border border-[#d8d4d0] rounded-lg text-base text-dark bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
        </div>
        <div class="mb-[1.1rem]">
          <label for="rpw" class="block text-[15px] font-medium text-dark mb-[6px]">Create a password</label>
          <input id="rpw" type="password" v-model="regForm.password" autocomplete="new-password" required
            class="w-full box-border px-4 py-3 border border-[#d8d4d0] rounded-lg text-base text-dark bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
          <p class="text-[13px] text-[#888780] mt-1">At least 8 characters, include letters & numbers</p>
        </div>
        <div class="mb-[1.1rem]">
          <label for="rcpw" class="block text-[15px] font-medium text-dark mb-[6px]">Type it once more</label>
          <input id="rcpw" type="password" v-model="regForm.confirm" autocomplete="new-password" required
            class="w-full box-border px-4 py-3 border border-[#d8d4d0] rounded-lg text-base text-dark bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
        </div>
        <button
          class="w-full py-[13px] bg-primary text-white border-0 rounded-lg text-[17px] font-medium cursor-pointer mt-1 transition-colors duration-150 hover:bg-dark disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit" :disabled="loading">
          {{ loading ? "Creating..." : "I'm ready — let's go 🌸"}}
        </button>
        <p class="text-center text-sm text-[#888780] mt-4">
          Already have an account?
          <button type="button" @click="switchMode('login')"
            class="bg-transparent border-0 p-0 text-sm text-primary cursor-pointer font-medium hover:underline">Sign in</button>
        </p>
      </form>

    </div>
  </div>
</template>
