<script setup>
import { ref, computed } from 'vue' 
import { addList } from '../api/request.js';
import { RouterLink } from 'vue-router';

const name = ref('')
const email = ref('')


const errors = ref({
    email: '',
    password: '',
})

</script>
<template>
<form action="#" autocomplete="off" novalidate @submit.prevent="login">
    <div class="form-group">
      <label class="form-label" for="name">List Name</label>
      <input class="form-input" type="text" id="name" v-model="name"/>
    </div>
    <div class="form-group" v-if=false>
      <label class="form-label" for="password">Passwort</label>
      <input class="form-input" type="password" id="password" v-model="password"/>
    </div>
    <div class="form-group">
        <RouterLink to="/lists">
            <button class="btn btn--primary btn--block" @click="addList(name)">
        Create List
      </button>
        </RouterLink>
    </div>
  </form>
</template>
