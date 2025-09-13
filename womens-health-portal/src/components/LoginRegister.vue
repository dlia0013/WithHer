<script setup>
import { ref } from 'vue';
import { login, register } from '@/services/auth';

const mode = ref('login'); // 'login' | 'register'
const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const loginForm = ref({ email: '', password: '' });
const regForm = ref({ name: '', email: '', password: '', confirm: '', role: 'user' });

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPwRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

function validateLogin() {
  errorMsg.value = '';
  if (!emailRe.test(loginForm.value.email)) {
    errorMsg.value = 'Invalid email format'; return false;
  }
  if (!strongPwRe.test(loginForm.value.password)) {
    errorMsg.value = 'Password must be ≥8 chars and include letters & numbers'; return false;
  }
  return true;
}

function validateRegister() {
  errorMsg.value = '';
  const pw = regForm.value.password;

  if (!regForm.value.name.trim()) { errorMsg.value = 'Name is required'; return false; }
  if (!emailRe.test(regForm.value.email)) { errorMsg.value = 'Invalid email format'; return false; }
  if (!strongPwRe.test(pw)) {
    errorMsg.value = 'Password must be ≥8 chars, include letters & numbers'; return false;
  }
  if (pw !== regForm.value.confirm) { errorMsg.value = 'Passwords do not match'; return false; }
  return true;
}

async function onLogin() {
  if (!validateLogin()) return;
  loading.value = true; errorMsg.value = ''; successMsg.value = '';
  try {
    await login(loginForm.value);
    successMsg.value = 'Login successful. Redirecting...';
    setTimeout(() => { window.location.href = '/hub'; }, 600);
  } catch (e) {
    errorMsg.value = e.message || 'Login failed';
  } finally {
    loading.value = false;
  }
}

async function onRegister() {
  if (!validateRegister()) return;
  loading.value = true; errorMsg.value = ''; successMsg.value = '';
  try {
    await register({
      name: regForm.value.name,
      email: regForm.value.email,
      password: regForm.value.password,
      role: regForm.value.role // 'user' or 'pro'
    });
    successMsg.value = 'Registered and signed in. Redirecting...';
    setTimeout(() => { window.location.href = '/hub'; }, 600);
  } catch (e) {
    errorMsg.value = e.message || 'Register failed';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container mt-5" style="max-width: 540px;">
    <h2 class="mb-3 text-center">Sign in / Create account</h2>

    <div class="btn-group w-100 mb-4" role="group">
      <button class="btn" :class="mode==='login' ? 'btn-primary' : 'btn-outline-primary'" @click="mode='login'">Login</button>
      <button class="btn" :class="mode==='register' ? 'btn-primary' : 'btn-outline-primary'" @click="mode='register'">Register</button>
    </div>

    <div v-if="errorMsg" class="alert alert-danger py-2">{{ errorMsg }}</div>
    <div v-if="successMsg" class="alert alert-success py-2">{{ successMsg }}</div>

    <!-- Login -->
    <form v-if="mode==='login'" @submit.prevent="onLogin" novalidate>
      <div class="mb-3">
        <label class="form-label" for="lemail">Email</label>
        <input id="lemail" class="form-control" type="email" v-model.trim="loginForm.email" autocomplete="email" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="lpw">Password</label>
        <input id="lpw" class="form-control" type="password" v-model="loginForm.password"
               autocomplete="current-password" minlength="8" required />
      </div>
      <button class="btn btn-primary w-100" :disabled="loading">{{ loading ? 'Signing in...' : 'Login' }}</button>
    </form>

    <!-- Register -->
    <form v-else @submit.prevent="onRegister" novalidate autocomplete="off">
      <div class="mb-3">
        <label class="form-label" for="rname">Name</label>
        <input id="rname" class="form-control" v-model.trim="regForm.name" autocomplete="name" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="remail">Email</label>
        <input id="remail" class="form-control" type="email" v-model.trim="regForm.email" autocomplete="email" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="rpw">Password</label>
        <input id="rpw" class="form-control" type="password" v-model="regForm.password"
               autocomplete="new-password" minlength="8" required />
        <div class="form-text">At least 8 characters, include letters & numbers.</div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="rcpw">Confirm Password</label>
        <input id="rcpw" class="form-control" type="password" v-model="regForm.confirm" autocomplete="new-password" required />
      </div>
      <div class="mb-4">
        <label class="form-label" for="rrole">Role</label>
        <select id="rrole" class="form-select" v-model="regForm.role" required>
          <option value="user">User (Patient)</option>
          <option value="pro">Health Professional</option>
        </select>
      </div>
      <button class="btn btn-primary w-100" :disabled="loading">{{ loading ? 'Creating...' : 'Create account' }}</button>
    </form>
  </div>
</template>

<style scoped>
.container { min-height: 60vh; }
</style>