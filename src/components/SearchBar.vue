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
  margin-top: var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 90%;
  padding: var(--space-sm) var(--space-md);
  margin-bottom: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.15);
}

button {
  padding: var(--space-sm) var(--space-lg);
  margin-bottom: var(--space-sm);
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: var(--font-size-sm);
  transition: background-color var(--transition-fast);
}

button:hover {
  background-color: var(--color-accent-hover);
}
</style>
