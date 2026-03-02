<!-- SearchList Component
- Displays a list of courses each with detailed information.
- Allows adding a selected course with a specified year.
-->

<template>
  <div>
    <ul v-if="courses.length > 0" class="results-list">
      <li
        v-for="course in courses"
        :key="course.id"
        class="course-item"
        @click="showYearOptions(course.id)"
      >
        <div class="course-main-info">
          {{ course.code }} - {{ capitalCase(course.name) }}
        </div>
        <div class="course-sub-info">
          Period: {{ course.period }}, Block: {{ course.block }}, Level:
          {{ course.level }}, Credits:
          {{ course.credits }}
        </div>
        <div v-if="selectedCourseId === course.id" class="year-selection">
          <label @click.stop>
            <input
              v-model="selectedYear"
              type="radio"
              :name="course.id"
              value="1"
            />
            Year 1
          </label>
          <label @click.stop>
            <input
              v-model="selectedYear"
              type="radio"
              :name="course.id"
              value="2"
            />
            Year 2
          </label>
          <button @click.stop="addCourse(course, selectedYear)">Add</button>
        </div>
      </li>
    </ul>
    <div v-else>No courses found.</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { capitalCase } from "../utils/capitalCase";

const props = defineProps({
  courses: Array, // Prop to recieve from parent component
});

const emit = defineEmits(["select-course"]); // Emit for communicating selection
const selectedCourseId = ref(null);
const selectedYear = ref(null);

// Toggles year selection for a specific course
function showYearOptions(courseId) {
  selectedCourseId.value =
    selectedCourseId.value === courseId ? null : courseId;
  selectedYear.value = null;
}

// Emits the selected course with its year to the parent component
function addCourse(course, year) {
  if (year) {
    emit("select-course", { ...course, year });
    selectedCourseId.value = null;
  } else {
    alert("Please select a year.");
  }
}
</script>

<style scoped>
.results-list {
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin-top: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.course-item {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.course-item:last-child {
  border-bottom: none;
}

.course-item:hover {
  background-color: var(--color-surface-hover);
}

.course-main-info {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.course-sub-info {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}

.year-selection {
  display: flex;
  align-items: center;
  margin-top: var(--space-sm);
  gap: var(--space-md);
}

.year-selection label {
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

input[type="radio"] {
  accent-color: var(--color-accent);
  margin-right: var(--space-xs);
}

button {
  padding: var(--space-xs) var(--space-md);
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
