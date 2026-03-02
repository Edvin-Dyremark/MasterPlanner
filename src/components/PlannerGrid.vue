<!-- PlannerGrid Component
- Displays a grid structure for course planning, split by periods and blocks.
- Allows interactive course management within the grid.
-->

<template>
  <div>
    <div class="planner-grid" :style="style">
      <div class="grid-header cell">Year - Period</div>
      <div
        v-for="n in totalBlocks"
        :key="'block-' + n"
        class="grid-header cell"
      >
        Block {{ n }}
      </div>
      <!-- Dynamic generation of grid rows -->
      <template v-for="(data, periodKey) in organizedCourses" :key="periodKey">
        <div class="grid-side cell">{{ periodKey }}</div>
        <GridCell
          v-for="(blockCourses, index) in data.courses"
          :key="index"
          :courses="blockCourses"
          @remove-course="emitRemoveCourse"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import GridCell from "./GridCell.vue";
import {
  createGridStructure,
  organizeCoursesIntoGrid,
} from "../utils/gridUtils";

const props = defineProps({
  courses: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["remove-course"]);

const totalPeriods = 8;
const totalBlocks = 4;
const periodPrefixes = ["HT1", "HT2", "VT1", "VT2"];
const years = ["1", "2"];

const gridStructure = computed(() =>
  createGridStructure(totalPeriods, totalBlocks, periodPrefixes, years)
);
const organizedCourses = computed(() =>
  organizeCoursesIntoGrid(
    props.courses,
    { ...gridStructure.value },
    totalBlocks
  )
);

function emitRemoveCourse(courseId) {
  console.log("Event received to remove course with ID:", courseId);
  emit("remove-course", courseId);
}

// Computed style to manage CSS variables for grid layout
const style = computed(() => ({
  "--total-blocks": totalBlocks,
}));
</script>

<style scoped>
.planner-grid {
  display: grid;
  grid-template-columns: auto repeat(var(--total-blocks), 1fr);
}

.cell {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  text-align: left;
}

.grid-header,
.cell:nth-child(5n + 1) {
  font-weight: bold;
  background-color: #333;
  color: white;
  text-align: center;
}
</style>
