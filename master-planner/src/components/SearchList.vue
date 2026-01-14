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
  width: 95%;
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  margin-top: 5px;
}
.course-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.course-item:last-child {
  border-bottom: none;
}

.course-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.course-main-info {
  font-size: 16px;
  font-weight: bold;
}
.course-sub-info {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}
.course-item:hover {
  background-color: #f9f9f9;
}

.year-selection {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.year-selection label {
  margin: 0 10px;
  cursor: pointer;
}
input[type="radio"] {
  margin: 0;
}
button {
  padding: 8px 15px;
  margin-left: 10px;
  background-color: #7e7e7e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #686868;
}
</style>
