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
  <div class="page">
    <div class="card">

      <!-- Brand -->
      <div class="brand">
        <span class="brand-name">With Her</span>
        <span class="brand-dot"></span>
      </div>

      <!-- Heading -->
      <h1 class="heading">{{ mode === 'login' ? 'Welcome back' : "We're here " }}</h1>
      <p class="subheading">{{ mode === 'login' ? 'Sign in to your account' : 'Join With Her today' }}</p>
      <div class="accent-bar"></div>

      <!-- Tab switcher -->
      <div class="tab-row">
        <button class="tab" :class="{ active: mode === 'login' }" @click="switchMode('login')">Sign in</button>
        <button class="tab" :class="{ active: mode === 'register' }" @click="switchMode('register')">Register</button>
      </div>

      <!-- Alerts -->
      <div v-if="errorMsg" class="alert alert-error">{{ errorMsg }}</div>
      <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

      <!-- Login form -->
      <form v-if="mode === 'login'" @submit.prevent="onLogin" novalidate>
        <div class="field">
          <label for="lemail">Email</label>
          <input id="lemail" type="email" v-model.trim="loginForm.email" autocomplete="email" required />
        </div>
        <div class="field">
          <label for="lpw">Password</label>
          <input id="lpw" type="password" v-model="loginForm.password" autocomplete="current-password" required />
        </div>
        <div class="forgot">
          <button type="button" @click="onForgotPassword">Forgot password?</button>
        </div>
        <button class="btn-main" type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <!-- Register: form -->
      <form v-if="mode === 'register'" @submit.prevent="onRegister" novalidate autocomplete="off">
        <div class="field">
          <label for="rname">What can we call you?</label>
          <input id="rname" type="text" v-model.trim="regForm.name" autocomplete="name" required />
        </div>
        <div class="field">
          <label for="remail">Your email address</label>
          <input id="remail" type="email" v-model.trim="regForm.email" autocomplete="email" required />
        </div>
        <div class="field">
          <label for="rpw">Create a password</label>
          <input id="rpw" type="password" v-model="regForm.password" autocomplete="new-password" required />
          <p class="hint">At least 8 characters, include letters & numbers</p>
        </div>
        <div class="field">
          <label for="rcpw">Confirm password</label>
          <input id="rcpw" type="password" v-model="regForm.confirm" autocomplete="new-password" required />
        </div>
        <button class="btn-main" type="submit" :disabled="loading">
          {{ loading ? "Creating..." : "I'm ready — let's go 🌸"}}
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: calc(100vh - 4.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.card {
  background: #ffffff;
  border-radius: 16px;
  border: 0.5px solid #e8e4e0;
  padding: 2.5rem;
  width: 100%;
  max-width: 460px;
}
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 1.25rem;
}
.brand-name { font-size: 17px; font-weight: 500; color: #1B3A5C; }
.brand-dot { width: 7px; height: 7px; background: #E8B4B8; border-radius: 50%; display: inline-block; }
.heading { font-size: 26px; font-weight: 600; color: #0D1F33; text-align: center; margin: 0 0 0.35rem; }
.subheading { font-size: 16px; color: #888780; text-align: center; margin: 0 0 1.25rem; }
.accent-bar { width: 32px; height: 3px; background: #E8B4B8; border-radius: 2px; margin: 0 auto 1.5rem; }
.tab-row { display: flex; background: #F9F8F7; border-radius: 10px; padding: 4px; gap: 4px; margin-bottom: 1.5rem; }
.tab { flex: 1; padding: 10px; border: none; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer; background: transparent; color: #888780; }
.tab.active { background: #1B3A5C; color: #ffffff; }
.alert { border-radius: 8px; padding: 10px 14px; font-size: 15px; margin-bottom: 1rem; }
.alert-error { background: #FCEBEB; color: #A32D2D; }
.alert-success { background: #E1F5EE; color: #0F6E56; }
.field { margin-bottom: 1.1rem; }
.field label { display: block; font-size: 15px; font-weight: 500; color: #0D1F33; margin-bottom: 6px; }
.field input {
  width: 100%; box-sizing: border-box; padding: 12px 16px;
  border: 0.5px solid #d8d4d0; border-radius: 8px;
  font-size: 16px; color: #0D1F33; background: #fff; outline: none;
}
.field input:focus { border-color: #1B3A5C; box-shadow: 0 0 0 3px rgba(27,58,92,0.08); }
.hint { font-size: 13px; color: #888780; margin-top: 4px; }
.forgot { text-align: right; margin-bottom: 1rem; }
.forgot button { background: none; border: none; font-size: 14px; color: #1B3A5C; cursor: pointer; padding: 0; }
.forgot button:hover { text-decoration: underline; }
.btn-main {
  width: 100%; padding: 13px; background: #1B3A5C;
  color: #fff; border: none; border-radius: 8px;
  font-size: 17px; font-weight: 500; cursor: pointer; margin-top: 0.25rem;
}
.btn-main:hover { background: #0D1F33; }
.btn-main:disabled { opacity: 0.6; cursor: not-allowed; }
</style>