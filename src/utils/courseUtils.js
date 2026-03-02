import { ref } from "vue";
import { saveUserPlan } from "../firebase/saveUserPlan";
import allCourses from "@/data/courses.json";

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
 * Fetches course data from local JSON by course names.
 */
export async function fetchCoursesByNames(courseNames) {
  return allCourses.filter((c) => courseNames.includes(c.name));
}

/**
 * Fetches course data from local JSON by course IDs.
 */
export async function fetchCoursesByIds(courseIds) {
  if (!courseIds.length || courseIds.some((id) => !id)) {
    console.error("Invalid or empty IDs provided", courseIds);
    return [];
  }
  return allCourses.filter((c) => courseIds.includes(c.id));
}

/**
 * Saves a list of courses to the user's plan in Firestore.
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
