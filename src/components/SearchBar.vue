<!-- SearchBar Component
- Captures user input for search terms.
- Emits search terms to the parent component.
-->

<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      placeholder="Search for courses..."
      class="search-input"
      @keyup.enter="performSearch"
    />
    <button @click="performSearch">Search</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);
const searchQuery = ref("");

// Triggers a search event with the current value of searchQuery
function performSearch() {
  emit("search", searchQuery.value);
}
</script>

<style scoped>
.search-bar {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.search-input {
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #929191;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #636363;
}
</style>
