<script setup>
import { ref,onMounted } from 'vue' 
import { addItemToList, fetchItem, fetchItems } from '../api/request.js';
import { RouterLink, useRoute } from 'vue-router';

const items=ref([])
const item = ref('')
const amount = ref('')


const errors = ref({
    item: '',
    amount: '',
})

const route = useRoute();
const id = ref([route.params.id]);

onMounted(async () => {
    items.value = await fetchItems()
    console.log("pain",items.value.records)
})

async function itemToList(listId, itemName, amountOfItem)
{
  try {
        items.value = await fetchItems()
        for await (const element of items.value.records) {
            if (element.fields.Name == itemName) {
                item.value = await fetchItem(element.id)
            }
        }
        console.log("bigpp", listId, item.value.id, amountOfItem )
        await addItemToList(listId[0], item.value.id, amountOfItem )
  } catch (error) {
    console.error(error)
  }
  
}

</script>
<template>
<form action="#" autocomplete="off" novalidate @submit.prevent="login">
    <div class="form-group">
      <label class="form-label" for="name">Item</label>
      <select v-model="item">
        <option disabled selected>Please select an item</option>
        <option v-for="item in items.records"  >{{ item.fields.Name }}</option>
      </select>
      <input v-if=false class="form-input" type="text" id="name" v-model="item" />
    </div>
    <div class="form-group">
      <label class="form-label" for="password">Amount</label>
      <input class="form-input" type="text" id="password" v-model="amount"/>
    </div>
    <div class="form-group">
        <RouterLink :to="`/ShoppingList/${id}`">
            <button class="btn btn--primary btn--block" @click="itemToList(id,item, amount )">
                Add Item
            </button>
        </RouterLink>
    </div>
  </form>
</template>
