<!-- Manager component:
- Search courses from local JSON data.
- Manage the state of selected courses in the planner.
- Handle search requests and pass data
-->

<template>
  <div>
    <SearchBar @search="onSearch" />
    <CustomCourseForm @add-custom-course="onAddCustomCourse" />
    <SearchList :courses="courses" @select-course="onSelectCourse" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchAllCourses, invalidateCache } from "@/supabase/courseService";
import SearchBar from "./SearchBar.vue";
import SearchList from "./SearchList.vue";
import CustomCourseForm from "./CustomCourseForm.vue";

const courses = ref([]);
const allCourses = ref([]);
const emit = defineEmits(["select-course"]);

function filterCourses(searchTerm) {
  const term = searchTerm.toLowerCase();
  if (!term) {
    courses.value = allCourses.value;
    return;
  }
  courses.value = allCourses.value.filter(
    (c) => c.name.includes(term) || c.code.toLowerCase().includes(term)
  );
}

function onSearch(searchTerm) {
  filterCourses(searchTerm);
}

function onSelectCourse(course) {
  emit("select-course", course);
}

async function onAddCustomCourse(course) {
  emit("select-course", course);
  invalidateCache();
  allCourses.value = await fetchAllCourses();
  courses.value = allCourses.value;
}

onMounted(async () => {
  allCourses.value = await fetchAllCourses();
  courses.value = allCourses.value;
});
</script>
