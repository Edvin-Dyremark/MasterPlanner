<!-- SearchBar Component
- Captures user input for search terms (live search on input).
- Provides filter dropdowns for period, level, and block.
- Emits search terms and filter changes to the parent component.
-->

<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      placeholder="Search for courses..."
      class="search-input"
      @input="performSearch"
      @keyup.enter="performSearch"
    />
    <div class="filter-row">
      <select v-model="filters.period" class="filter-select" @change="emitFilters">
        <option value="">All Periods</option>
        <option v-for="p in periods" :key="p" :value="p">{{ p }}</option>
      </select>
      <select v-model="filters.level" class="filter-select" @change="emitFilters">
        <option value="">All Levels</option>
        <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
      </select>
      <select v-model="filters.block" class="filter-select" @change="emitFilters">
        <option value="">All Blocks</option>
        <option v-for="b in blocks" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["search", "filter-change"]);
const searchQuery = ref("");

const periods = ["HT1", "HT2", "VT1", "VT2"];
const levels = ["G1X", "G2X", "A1X", "A2X"];
const blocks = ["1", "2", "3", "4"];

const filters = reactive({
  period: "",
  level: "",
  block: "",
});

function performSearch() {
  emit("search", searchQuery.value);
}

function emitFilters() {
  emit("filter-change", { ...filters });
}
</script>

<style scoped>
.search-bar {
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  width: 100%;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
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

.filter-row {
  display: flex;
  gap: var(--space-sm);
  width: 100%;
  margin-bottom: var(--space-sm);
}

.filter-select {
  flex: 1;
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.15);
}
</style>
