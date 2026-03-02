<!-- GridCell Component
- Displays information about each course in the cell
-->

<template>
  <div class="grid-cell cell">
    <div v-if="courses.length" class="course-list">
      <div
        v-for="course in courses"
        :key="course.id"
        :class="['course-entry', { 'custom-course': course.created_by }]"
        @click="removeCourse(course)"
      >
        <div class="course-top">
          <span class="course-code">{{ course.code }}</span>
          <span class="course-credits">{{ course.credits }}</span>
        </div>
        <div class="course-name">{{ capitalCase(course.name) }}</div>
      </div>
    </div>
    <div v-else class="empty-cell">Empty</div>
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
  padding: var(--space-xs) var(--space-sm);
  min-height: 80px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  cursor: pointer;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.grid-cell:hover {
  border-color: var(--color-accent);
  box-shadow: inset 0 0 0 1px var(--color-accent);
}

.course-list {
  width: 100%;
}

.course-entry {
  width: 100%;
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.course-entry:hover {
  background-color: rgba(239, 68, 68, 0.15);
}

.course-entry:not(:last-child) {
  margin-bottom: var(--space-xs);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-xs);
}

.course-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-code {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-accent);
}

.course-credits {
  font-size: 0.75rem;
  background-color: var(--color-surface-hover);
  color: var(--color-text-muted);
  padding: 1px 6px;
  border-radius: 9999px;
  white-space: nowrap;
}

.course-name {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.3;
}

.empty-cell {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.custom-course {
  border-left: 3px solid var(--color-accent);
}
</style>
