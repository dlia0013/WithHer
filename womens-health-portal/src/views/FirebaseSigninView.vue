<script setup>
import { ref } from 'vue'
import { login } from '@/services/auth'

const email = ref('')
const password = ref('')
const msg = ref('')

async function handleLogin() {
  try {
    await login(email.value, password.value)
    msg.value = '✅ Login success'
  } catch (e) {
    msg.value = '❌ ' + (e?.message || e)
  }
}
</script>

<template>
  <div class="container py-4" style="max-width:480px">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" />
      </div>
      <button class="btn btn-primary w-100">Sign in</button>
    </form>
    <p class="mt-3">{{ msg }}</p>
  </div>
</template>