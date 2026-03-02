<!-- Manager component:
- Search courses from local JSON data.
- Manage the state of selected courses in the planner.
- Handle search requests and pass data
-->

<template>
  <div>
    <SearchBar @search="onSearch" @filter-change="onFilterChange" />
    <CustomCourseForm @add-custom-course="onAddCustomCourse" />
    <SearchList :courses="filteredCourses" @select-course="onSelectCourse" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { fetchAllCourses, invalidateCache } from "@/supabase/courseService";
import SearchBar from "./SearchBar.vue";
import SearchList from "./SearchList.vue";
import CustomCourseForm from "./CustomCourseForm.vue";

const allCourses = ref([]);
const emit = defineEmits(["select-course"]);

const filters = reactive({
  text: "",
  period: "",
  level: "",
  block: "",
});

const filteredCourses = computed(() => {
  let result = allCourses.value;

  if (filters.text) {
    const term = filters.text.toLowerCase();
    result = result.filter(
      (c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
    );
  }

  if (filters.period) {
    result = result.filter((c) => c.period === filters.period);
  }

  if (filters.level) {
    result = result.filter((c) => c.level === filters.level);
  }

  if (filters.block) {
    result = result.filter((c) => String(c.block) === filters.block);
  }

  return result;
});

function onSearch(searchTerm) {
  filters.text = searchTerm;
}

function onFilterChange({ period, level, block }) {
  filters.period = period;
  filters.level = level;
  filters.block = block;
}

function onSelectCourse(course) {
  emit("select-course", course);
}

async function onAddCustomCourse(course) {
  emit("select-course", course);
  invalidateCache();
  allCourses.value = await fetchAllCourses();
}

onMounted(async () => {
  allCourses.value = await fetchAllCourses();
});
</script>
