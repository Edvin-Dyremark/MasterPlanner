import { ref } from "vue";
import { db } from "../firebase/firebaseConfig";
import { saveUserPlan } from "../firebase/saveUserPlan";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";

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
 * Fetches course data from Firestore by course names.
 */
export async function fetchCoursesByNames(courseNames) {
  const coursesCol = collection(db, "courses");
  const q = query(coursesCol, where("name", "in", courseNames));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

/**
 * Fetches course data from Firestore by course IDs.
 */
export async function fetchCoursesByIds(courseIds) {
  if (!courseIds.length || courseIds.some((id) => !id)) {
    console.error("Invalid or empty IDs provided", courseIds);
    return [];
  }
  const coursesCol = collection(db, "courses");
  const q = query(coursesCol, where(documentId(), "in", courseIds));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch courses by IDs:", error);
    return [];
  }
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
