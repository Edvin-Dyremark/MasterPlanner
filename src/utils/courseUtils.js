import { ref } from "vue";
import { saveUserPlan } from "../supabase/saveUserPlan";

/**
 * Manages course selections within the application.
 */
export function courseSelection() {
  const selectedCourses = ref([]);

  const onSelectCourse = (course) => {
    if (
      !selectedCourses.value.some(
        (c) => c.id === course.id && c.year === course.year
      )
    ) {
      selectedCourses.value.push(course);
      console.log("Courses in App:", selectedCourses.value);
    }
  };

  return { selectedCourses, onSelectCourse };
}

/**
 * Saves a list of courses to the user's plan.
 */
export function savePlan(courses) {
  const coursesToSave = courses.map((course) => ({
    id: course.id,
    code: course.code,
    name: course.name,
    block: course.block,
    credits: course.credits,
    level: course.level,
    period: course.period,
    year: course.year,
  }));
  saveUserPlan(coursesToSave);
}
