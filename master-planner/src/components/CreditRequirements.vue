<!-- CreditRequirements Component
- Displays total and advanced credits for courses passed to it as props. 
-->

<template>
  <div class="credit-requirements">
    <div class="credit-cell">Total Credits: {{ totalCreditsText }}</div>
    <div class="credit-cell">
      Advanced Credits (A1X): {{ advancedCreditsA1XText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  courses: Array,
});

// Parses the credits string to extract numeric values and then sum
function parseCredits(creditString) {
  const creditParts = creditString.split(",");
  return creditParts.reduce((sum, part) => {
    const matches = part.match(/(\d+)/);
    return sum + (matches ? parseInt(matches[0], 10) : 0);
  }, 0);
}

// Computed property to calculate total credits from all courses
const totalCredits = computed(() => {
  return props.courses.reduce(
    (sum, course) => sum + parseCredits(course.credits),
    0
  );
});

const advancedCreditsA1X = computed(() => {
  return props.courses.reduce((sum, course) => {
    if (course.level === "A1X") {
      return sum + parseCredits(course.credits);
    }
    return sum;
  }, 0);
});

// Display total credits
const totalCreditsText = computed(() => {
  return totalCredits.value > 0 ? totalCredits.value : "120 required";
});

const advancedCreditsA1XText = computed(() => {
  return advancedCreditsA1X.value > 0
    ? advancedCreditsA1X.value
    : "90 required";
});
</script>

<style scoped>
.credit-requirements {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #333;
  color: white;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 16px;
}

.credit-cell {
  padding: 10px;
  border-right: 1px solid #ccc;
  background-color: #333;
}

.credit-cell:last-child {
  border-right: none;
}
</style>
