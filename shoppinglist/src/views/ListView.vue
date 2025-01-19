<script setup>
import { ref, onMounted } from 'vue';
import { fetchLists, deleteList } from '../api/request.js';
import { useAuth } from '../api/auth'

const { token } = useAuth()

const lists = ref([]);
const loading = ref(true);
const currentAccount = token.value;

onMounted(async () => {
    load();
});

async function load() {
    loading.value = true;
    try {
        const data = await fetchLists();
        lists.value = data.records;
        console.log('Stream geladen', lists.value);
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
  <div class="list-view">
    <RouterLink to="/createlist" class="add-list-button">
      Add
    </RouterLink>

    <RouterLink to="/" class="home-button">
      Home
    </RouterLink>

    <h1>Shopping Lists</h1>

    <div v-if="loading">Loading...</div>

    <div v-else v-for="list in lists" class="lists-container">
      <div v-if="currentAccount ==  list.fields.Account[0]" :key="list.id" class="list-item">
        <div class="list-title" >{{ list.fields.Name }}</div>
        <div class="button-group" v-if="currentAccount ==  list.fields.Account[0]">
          <RouterLink :to="`/ShoppingList/${list.id}`" class="action-button open">
            Edit
          </RouterLink>
          <button @click="deleteList(list.id); load()" class="action-button edit">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>