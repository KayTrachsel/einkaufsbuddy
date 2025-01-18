<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="home">
    <img src="../assets/bilder/shoppingcart.png" alt="Shopping Cart" class="shopping-cart" />
    
    <div class="home-content">
      <h1>Einkaufsbuddy</h1>
      <p>Your online shopping list</p>
      
      <div class="button-container">
        <RouterLink to="/lists" class="home-button">
          List Overview
        </RouterLink>
        <RouterLink to="/search" class="home-button">
          Search for food
        </RouterLink>
      </div>
    </div>

    <!-- Login-Button -->
    <RouterLink to="/login" class="home-button login-button">
      Login
    </RouterLink>
  </div>
</template>