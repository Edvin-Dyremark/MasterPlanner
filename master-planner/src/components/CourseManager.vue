<!-- Manager component:
- Fetch courses from Firestore based on search terms. 
- Manage the state of selected courses in the planner. 
- Handle search requests and pass data
-->

<template>
  <div>
    <SearchBar @search="onSearch" />
    <SearchList :courses="courses" @select-course="onSelectCourse" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import SearchBar from "./SearchBar.vue";
import SearchList from "./SearchList.vue";

const courses = ref([]);
const emit = defineEmits(["select-course"]);

async function fetchCourses(searchTerm) {
  const coursesCol = collection(db, "courses");
  const q = query(
    coursesCol,
    where("name", ">=", searchTerm.toLowerCase()),
    where("name", "<=", searchTerm.toLowerCase() + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);
  courses.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    code: doc.data().code,
    period: doc.data().period,
    level: doc.data().level,
    credits: doc.data().credits,
    block: doc.data().block,
  }));
}

function onSearch(searchTerm) {
  fetchCourses(searchTerm);
}

function onSelectCourse(course) {
  console.log("Selected course:", course);
  emit("select-course", course);
}

// Fetch all courses on mount
onMounted(() => {
  fetchCourses("");
});
</script>
