<script setup>
import { ref, computed } from 'vue';
import { loginUser } from '../api/request.js';
import { useRouter } from 'vue-router';

const password = ref('');
const email = ref('');

const hasLogin = computed(() => email.value.length > 0 && password.value.length > 0);

const errors = ref({
  email: '',
  password: '',
});

const router = useRouter();

async function login() {
  try {
    await loginUser(email.value, password.value);
    await router.push('/');
  } catch (exception) {
    console.error('login error', exception);
    errors.value = exception.errors;
  }
}
</script>

<template>
  <div class="login-container">
    <RouterLink to="/" class="login-home-button">
      Home
    </RouterLink>

    <h1>Login</h1>

    <div class="login-box">
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" v-model="email" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">Passwort</label>
          <input type="password" v-model="password" class="form-input" />
        </div>
        <button :disabled="!hasLogin" class="login-submit">Login</button>
      </form>
    </div>
  </div>
</template>
