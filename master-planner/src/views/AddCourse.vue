<!-- Add Course Component
- Provides a form for adding a new course to the database.
-->

<template>
  <div class="add-course">
    <h1>Add a New Course</h1>
    <form @submit.prevent="addCourse">
      <input v-model="course.name" placeholder="Course Name" />
      <input v-model="course.code" placeholder="Course Code" />
      <input v-model="course.period" placeholder="Period: (HT1/2 VT1/2)" />
      <input v-model="course.level" placeholder="Level: (A1X/G2X)" />
      <input v-model="course.credits" placeholder="Credits: (LAB: X, TEN: X)" />
      <input v-model="course.block" placeholder="Block (1,2,3,4)" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default {
  name: "AddCourse",
  setup() {
    const course = ref({
      name: "",
      code: "",
      period: "",
      level: "",
      credits: "",
      block: "",
    });

    async function addCourse() {
      // Normalize input to fit database requirements (case sensitivity)
      const courseToAdd = {
        ...course.value,
        name: course.value.name.toLowerCase(),
        code: course.value.code.toUpperCase(),
        level: course.value.level.toUpperCase(),
      };

      try {
        await addDoc(collection(db, "courses"), courseToAdd);
        // Add Course to database
        alert("Course added successfully!");
        // Reset form after successful submission
        course.value = {
          name: "",
          code: "",
          period: "",
          level: "",
          credits: "",
          block: "",
        };
      } catch (error) {
        console.error("Error adding course:", error);
        alert("Failed to add course!");
      }
    }

    return { course, addCourse };
  },
};
</script>

<style scoped>
.add-course {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.add-course form input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.add-course form button {
  padding: 10px 20px;
  background-color: #767676;
  color: white;
  border: none;
  cursor: pointer;
}

.add-course form button:hover {
  background-color: #6a6a6a;
}
</style>
