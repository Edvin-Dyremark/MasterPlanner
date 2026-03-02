<!-- Home Component
- Holds components for managing and displaying selected courses.
- Handles course selection, removal, and user plans
-->

<template>
  <div>
    <CreditRequirements :courses="selectedCourses" />
    <PlannerGrid
      :courses="selectedCourses"
      @remove-course="handleRemoveCourse"
    />
    <CourseManager @select-course="onSelectCourse" />
  </div>
</template>

<script>
import PlannerGrid from "../components/PlannerGrid.vue";
import CreditRequirements from "../components/CreditRequirements.vue";
import CourseManager from "../components/CourseManager.vue";
import { courseSelection, savePlan } from "../utils/courseUtils";
import { onMounted } from "vue";
import { loadUserPlan } from "../firebase/loadUserPlan";

export default {
  name: "Home",
  components: {
    CreditRequirements,
    PlannerGrid,
    CourseManager,
  },
  setup() {
    const { selectedCourses } = courseSelection();

    const onSelectCourse = (course) => {
      // Adds a course to the selected courses
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
      // Removes a course from the selected courses based on ID
      const index = selectedCourses.value.findIndex(
        (course) => course.id === courseId
      );
      if (index !== -1) {
        selectedCourses.value.splice(index, 1);
        savePlan(selectedCourses.value);
      }
    }

    onMounted(async () => {
      // Load and set the user plan on component mount
      const courses = await loadUserPlan();
      if (courses.length > 0) {
        courses.forEach((course) => onSelectCourse(course));
        console.log("Courses set in selectedCourses:", selectedCourses.value);
      }
    });

    return { selectedCourses, onSelectCourse, handleRemoveCourse };
  },
};
</script>
