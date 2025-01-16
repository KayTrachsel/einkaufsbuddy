<script setup>
    defineProps({
    id: Number,
    name: String,
    createdAt: String,
    accounts: Array,
    items: Array
    })

</script>
<template>
    <!-- Tweet -->
<div class="tweet">
    <div class="tweet__avatar">
      <img :src="`https://i.pravatar.cc/100?u=${user.id}`" alt=""/>
    </div>
    <div class="tweet__content">
      <div class="tweet__header">
        <span class="tweet__author">{{ user.name }}</span>
        <span class="tweet__timestamp">{{ formatDistanceToNow(createdAt, {addSuffix: true}) }}</span>
      </div>
      <div class="tweet__text">
        {{ text }} 
      </div>
    </div>
    <div>
        {{ likes }} likes
        <a href="#" @click="likeTweet(id.value)">&#9825;</a>
      </div>
  </div>
</template>