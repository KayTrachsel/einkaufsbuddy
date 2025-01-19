<script setup>
import { ref } from 'vue' 
import { addList } from '../api/request.js';
import { RouterLink } from 'vue-router';

const name = ref('')
</script>

<template>
  <div class="form-container">
    <!-- 🏠 Home-Button -->
    <RouterLink to="/" class="form-home-button">Home</RouterLink>

    <!-- Formular-Box -->
    <div class="form-box">
      <form action="#" autocomplete="off" novalidate>
        <div class="form-group">
          <label class="form-label" for="name">List Name</label>
          <input class="form-input" type="text" id="name" v-model="name"/>
        </div>
        
        <div class="form-group">
          <RouterLink to="/lists">
            <button class="create-list-button" @click="addList(name)">
              Create List
            </button>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
