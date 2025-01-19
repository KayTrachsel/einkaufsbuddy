<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchList, deleteItem, fetchItem, fetchStores } from '../api/request.js';


const list = ref({});
const record = ref({});
const items = ref([]);
const shops = ref([]);
const loading = ref(true);

const route = useRoute();
const id = ref(route.params.id);

onMounted(async () => {
    load();
})

async function load()
{
    loading.value = true
    try {
        const listData = await fetchList(id.value)
        list.value = listData.fields 
        console.log('List geladen', list.value.fields)

        items.value = list.value.ItemsInList

        for await (const element of items.value) {
          const recordData = await fetchList(element)
          record.value = recordData.fields 
          console.log('Record geladen', record.value.Items)

          items.value[items.value.indexOf(element)] = record.value.Items
        }

        for await (const element of items.value) {
          const itemData = await fetchItem(element)
          record.value = itemData.fields 
          console.log('Record geladen', record.value.Name)

          items.value[items.value.indexOf(element)] = record.value
        }
        

    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

async function itemDelete(itemToDel)
{
  try {
        await deleteItem(itemToDel[0]) 
  } catch (error) {
    console.error(error)
  }
  
}
</script>

<template>
  <div>
      <h1>{{ list.Name }}</h1>
      <div v-if="loading">Loading...</div>
      <table v-else class="styled-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Store</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.Name }}</td>
          <td>{{ item.Price }} CHF </td>
          <td>{{ item.StoreName[0] }}</td>
          <td>
            <button @click="itemDelete(item.ItemsInList); load()">Remove</button></td>
        </tr>
      </tbody>
    </table>
    <RouterLink :to="`/NewItemToList/${id}`">
      <button>Add item</button>
    </RouterLink>
  </div>
</template>

<style>
/* Tabelle */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  text-align: left;
  color: #ffffff; /* Textfarbe weiß */
}
.styled-table thead tr {
  background-color: #1e88e5; /* Blau für Header */
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid #333333; /* Dunkler Rand */
}
.styled-table tbody tr {
  background-color: #212121; /* Dunkles Grau für Zeilen */
}
.styled-table tbody tr:nth-of-type(even) {
  background-color: #2c2c2c; /* Etwas helleres Grau für Alternierung */
}
.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #1e88e5; /* Blau für Abschluss */
}
.styled-table tbody tr:hover {
  background-color: #37474f; /* Hellgraues Highlight bei Hover */
}

/* Überschrift */
h1 {
  color: #1e88e5; /* Blau passend zum Header */
}
</style>