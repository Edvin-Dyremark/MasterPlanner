<!-- Manager component:
- Search courses from local JSON data.
- Manage the state of selected courses in the planner.
- Handle search requests and pass data
-->

<template>
  <div>
    <SearchBar @search="onSearch" />
    <SearchList :courses="courses" @select-course="onSelectCourse" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import allCourses from "@/data/courses.json";
import SearchBar from "./SearchBar.vue";
import SearchList from "./SearchList.vue";

const courses = ref([]);
const emit = defineEmits(["select-course"]);

function fetchCourses(searchTerm) {
  const term = searchTerm.toLowerCase();
  if (!term) {
    courses.value = allCourses;
    return;
  }
  courses.value = allCourses.filter(
    (c) => c.name.includes(term) || c.code.toLowerCase().includes(term)
  );
}

function onSearch(searchTerm) {
  fetchCourses(searchTerm);
}

function onSelectCourse(course) {
  emit("select-course", course);
}

// Load all courses on mount
onMounted(() => {
  fetchCourses("");
});
</script>
