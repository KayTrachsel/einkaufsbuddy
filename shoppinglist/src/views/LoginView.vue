<script setup>
import { ref, computed } from 'vue' 
import { loginUser } from '../api/request.js'
import { useRouter } from 'vue-router'

const password = ref('')
const email = ref('')

const hasLogin = computed(() => { return (email.value.length > 0) && (password.value.length > 0) })

const errors = ref({
    email: '',
    password: '',
})

const router = useRouter()

async function login () {
  try {
    // Versuche, den Benutzer einzuloggen.
    await loginUser(email.value, password.value)
    // Alles okay! Umleiten zur HomeView
    await router.push('/')                            // Ergänzen
  } catch (exception) {
    // Die Zugangsdaten waren falsch, logge die Exception.
    console.error('login error', exception)

    // Übernehme die Fehlermeldungen aus der Exception.
    errors.value = exception.errors
  }
}
</script>
<template>
  <div class="login">
    <section class="login-wrapper">
      <form action="#" class="login-form" autocomplete="off" novalidate @submit.prevent="login">
        <div class="form-group">
          <label class="form-label" for="email">E-Mail</label>
          <input class="form-input" type="email" id="email" v-model="email"/>
          <div class="form-error" v-if="errors.email.length > 0">
            {{ errors.email }}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Passwort</label>
          <input class="form-input" type="password" id="password" v-model="password"/>
          <div class="form-error" v-if="errors.password.length > 0">
            {{ errors.password }}
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn--primary btn--block" v-bind:disabled=!hasLogin>
            Login
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

