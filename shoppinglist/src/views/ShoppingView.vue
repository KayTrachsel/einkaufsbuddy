<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchList, deleteItem, fetchItem } from '../api/request.js';
import { RouterLink } from 'vue-router';

const list = ref({});
const record = ref({});
const items = ref([]);
const loading = ref(true);

const route = useRoute();
const id = ref(route.params.id);

onMounted(async () => {
    load();
});

async function load() {
    loading.value = true;
    try {
        const listData = await fetchList(id.value);
        list.value = listData.fields;
        console.log('List geladen', list.value.fields);

        items.value = list.value.ItemsInList;

        for await (const element of items.value) {
            const recordData = await fetchList(element);
            record.value = recordData.fields;
            console.log('Record geladen', record.value.Items);

            items.value[items.value.indexOf(element)] = record.value.Items;
        }

        for await (const element of items.value) {
            const itemData = await fetchItem(element);
            record.value = itemData.fields;
            console.log('Record geladen', record.value.Name);

            items.value[items.value.indexOf(element)] = record.value;
        }
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

async function itemDelete(itemToDel) {
    try {
        await deleteItem(itemToDel[0]);
        load();
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
  <div class="shopping-view">
    <RouterLink to="/" class="home-button">
      Home
    </RouterLink>

    <h1>{{ list.Name }}</h1>

    <div v-if="loading">Loading...</div>

    <table v-else class="styled-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Store</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.Name }}</td>
          <td>{{ item.Price }} CHF</td>
          <td>{{ item.StoreName[0] }}</td>
          <td>
            <button @click="itemDelete(item.ItemsInList)" class="action-button delete-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <RouterLink :to="`/NewItemToList/${id}`">
      <button class="add-item-button">Add item</button>
    </RouterLink>
  </div>
</template>
