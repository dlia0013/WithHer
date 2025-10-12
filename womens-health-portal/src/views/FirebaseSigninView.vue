<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const msg = ref('')

async function handleLogin() {
  msg.value = ''
  loading.value = true
  try {
    await login({ email: email.value, password: password.value })
    msg.value = '✅ Login success! Redirecting...'
    await router.replace('/hub')
  } catch (e) {
    console.error(e)
    msg.value = '❌ ' + (e?.message || e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width:480px">
    <h2 class="mb-3 text-center">Sign in / Create account</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <p class="mt-3 text-center" :class="msg.startsWith('✅') ? 'text-success' : 'text-danger'">
      {{ msg }}
    </p>
  </div>
</template>