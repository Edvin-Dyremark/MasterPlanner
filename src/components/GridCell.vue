<!-- GridCell Component
- Displays information about each course in the cell
-->

<template>
  <div class="grid-cell cell">
    <div v-if="courses.length">
      <div
        v-for="course in courses"
        :key="course.id"
        class="course-entry"
        @click="removeCourse(course)"
      >
        <div>{{ course.code }}</div>
        <div>{{ capitalCase(course.name) }}</div>
        <div>{{ course.credits }}</div>
        <div>{{ course.examination }}</div>
      </div>
    </div>
    <div v-else>Empty</div>
  </div>
</template>

<script setup>
import { capitalCase } from "../utils/capitalCase";

const props = defineProps({
  courses: Array,
});
const emit = defineEmits(["remove-course"]);

function removeCourse(course) {
  console.log("Removing course:", course.id);
  emit("remove-course", course.id);
}
</script>

<style scoped>
.grid-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  margin: 2px;
  background-color: #f0f0f0;
  text-align: center;
  cursor: pointer;
}

.grid-cell:hover {
  background-color: #8d8d8d;
}

.course-entry {
  width: 100%;
  padding: 4px;
  margin-bottom: 4px;
}

.course-entry:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.course-entry div {
  margin-bottom: 4px;
}
</style>
