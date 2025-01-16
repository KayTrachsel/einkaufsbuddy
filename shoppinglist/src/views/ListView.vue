<script setup>
import { ref, onMounted } from 'vue';
import { fetchLists,deleteList } from '../api/request.js';


const lists = ref([]);
const loading = ref(true);

onMounted(async () => {
    load();
})

async function load()
{
    loading.value = true
    try {
        const data = await fetchLists()
        lists.value = data.records 
        console.log('Stream geladen', lists.value)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}
</script>

<template>
  <div>
      <h1>Lists for this account</h1>
      <div v-if="loading">Loading...</div>
      <table v-else class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in lists" :key="list.id">
          <td>{{ list.fields.Name }}</td>
          <td>{{ list.fields.Created }}</td>
          <td>
            <RouterLink :to="`ShoppingList/${list.id}`">
              <button>Edit</button>
            </RouterLink>
            <button @click="deleteList(list.id); load()">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <RouterLink to="/createlist">
      <button>Add list</button>
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