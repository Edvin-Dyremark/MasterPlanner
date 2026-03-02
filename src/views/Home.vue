<!-- Home Component
- Holds components for managing and displaying selected courses.
- Handles course selection, removal, and user plans
-->

<template>
  <div class="home-container">
    <CreditRequirements :courses="selectedCourses" />
    <PlannerGrid
      :courses="selectedCourses"
      @remove-course="handleRemoveCourse"
    />
    <button
      v-if="user"
      class="save-plan-btn"
      @click="handleSavePlan"
    >
      Save Plan
    </button>
    <CourseManager @select-course="onSelectCourse" />
  </div>
</template>

<script>
import PlannerGrid from "../components/PlannerGrid.vue";
import CreditRequirements from "../components/CreditRequirements.vue";
import CourseManager from "../components/CourseManager.vue";
import { courseSelection, savePlan } from "../utils/courseUtils";
import { onMounted, watch } from "vue";
import { loadUserPlan } from "../supabase/loadUserPlan";
import { useAuth } from "../store/auth";

export default {
  name: "Home",
  components: {
    CreditRequirements,
    PlannerGrid,
    CourseManager,
  },
  setup() {
    const { selectedCourses } = courseSelection();
    const { user } = useAuth();

    const onSelectCourse = (course) => {
      if (
        !selectedCourses.value.some(
          (c) => c.id === course.id && c.year === course.year
        )
      ) {
        selectedCourses.value.push(course);
        savePlan(selectedCourses.value);
      }
    };

    function handleRemoveCourse(courseId) {
      const index = selectedCourses.value.findIndex(
        (course) => course.id === courseId
      );
      if (index !== -1) {
        selectedCourses.value.splice(index, 1);
        savePlan(selectedCourses.value);
      }
    }

    async function loadPlan() {
      const courses = await loadUserPlan();
      if (courses.length > 0) {
        courses.forEach((course) => onSelectCourse(course));
      }
    }

    onMounted(() => {
      loadPlan();
    });

    watch(user, (newUser, oldUser) => {
      if (newUser && !oldUser) {
        loadPlan();
      } else if (!newUser) {
        selectedCourses.value = [];
      }
    });

    function handleSavePlan() {
      savePlan(selectedCourses.value);
    }

    return { selectedCourses, onSelectCourse, handleRemoveCourse, handleSavePlan, user };
  },
};
</script>

<style scoped>
.home-container {
  margin: var(--space-lg) auto;
  padding: 0 var(--space-sm);
}

.save-plan-btn {
  display: block;
  margin: var(--space-md) auto;
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-weight: 600;
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.save-plan-btn:hover {
  background-color: var(--color-accent-hover);
}
</style>
