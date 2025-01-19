<script setup>
import { ref, onMounted } from 'vue' 
import { addItemToList, fetchItem, fetchItems } from '../api/request.js';
import { RouterLink, useRoute } from 'vue-router';

const items = ref([]);
const item = ref('');
const amount = ref('');

const errors = ref({
    item: '',
    amount: '',
});

const route = useRoute();
const id = ref([route.params.id]);

onMounted(async () => {
    items.value = await fetchItems();
    console.log("Fetched Items:", items.value.records);
});

async function itemToList(listId, itemName, amountOfItem) {
    try {
        items.value = await fetchItems();
        for await (const element of items.value.records) {
            if (element.fields.Name == itemName) {
                item.value = await fetchItem(element.id);
            }
        }
        console.log("Adding item to list:", listId, item.value.id, amountOfItem);
        await addItemToList(listId[0], item.value.id, amountOfItem);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
  <div class="new-item-container">

    <h1 class="new-item-title">Add Item</h1>

    <form action="#" autocomplete="off" novalidate @submit.prevent="login" class="new-item-form">
      
      <div class="form-group">
        <label class="form-label" for="name">Item</label>
        <select v-model="item" class="form-input">
          <option disabled selected>Please select an item</option>
          <option v-for="item in items.records" :key="item.id">{{ item.fields.Name }}</option>
        </select>
      </div>

      <div class="spacer"></div>

      <div class="form-group">
        <label class="form-label" for="amount">Amount</label>
        <input class="form-input" type="text" id="amount" v-model="amount"/>
      </div>

      <div class="form-group">
        <RouterLink :to="`/ShoppingList/${id}`">
          <button class="btn add-item-button" @click="itemToList(id, item, amount)">
            Add Item
          </button>
        </RouterLink>
      </div>

    </form>
  </div>
</template>
