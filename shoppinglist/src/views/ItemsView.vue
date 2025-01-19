<script setup>
import { ref, onMounted } from 'vue';
import { fetchItems, fetchStores } from '../api/request.js';



const items = ref([]);
const loading = ref(true);
const stores = ref([])

onMounted(async () => {
    load();
})

async function load()
{
    loading.value = true
    try {
        const data = await fetchItems()
        items.value = data.records 
        console.log('Stream geladen', items.value)
        const storeData = await fetchStores()
        stores.value = storeData.records 
        console.log('Stores geladen', stores.value)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

async function getStoreName(storeId) {
  for (const element of stores.value) {
    if( element.id == storeId){
      return element.fields.Name
    }
  }
}
</script>

<template>
  <div>
      <h1>Items</h1>
      <div v-if="loading">Loading...</div>
      <table v-else class="styled-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Stores</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.fields.Name }}</td>
          <td>{{ item.fields.Price }}</td>
          <td>{{item.fields.StoreName[0] }}</td>
        </tr>
      </tbody>
    </table>
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
</style>