<!-- GridCell Component
- Displays information about each course in the cell
-->

<template>
  <div class="grid-cell cell">
    <div v-if="courses.length">
      <div
        v-for="course in courses"
        :key="course.id"
        :class="['course-entry', { 'custom-course': course.created_by }]"
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
  padding: var(--space-sm);
  min-height: 80px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  text-align: center;
  cursor: pointer;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.grid-cell:hover {
  border-color: var(--color-accent);
  box-shadow: inset 0 0 0 1px var(--color-accent);
}

.course-entry {
  width: 100%;
  padding: var(--space-xs);
  margin-bottom: var(--space-xs);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.course-entry:hover {
  background-color: rgba(239, 68, 68, 0.15);
}

.course-entry:not(:last-child) {
  border-bottom: 1px solid var(--color-border);
}

.course-entry div {
  margin-bottom: 2px;
  font-size: var(--font-size-sm);
}

.custom-course {
  border-left: 3px solid var(--color-accent);
}
</style>
