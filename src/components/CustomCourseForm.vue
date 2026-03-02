<template>
  <div v-if="user" class="custom-course-wrapper">
    <button class="toggle-btn" @click="isOpen = !isOpen">
      {{ isOpen ? "− Cancel" : "+ Add Custom Course" }}
    </button>

    <form v-if="isOpen" class="custom-course-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="cc-code">Course Code</label>
          <input
            id="cc-code"
            v-model="form.code"
            type="text"
            placeholder="e.g. TDDD27"
            required
          />
        </div>
        <div class="form-group">
          <label for="cc-name">Course Name</label>
          <input
            id="cc-name"
            v-model="form.name"
            type="text"
            placeholder="e.g. Advanced Web Programming"
            required
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="cc-period">Period</label>
          <select id="cc-period" v-model="form.period" required>
            <option value="" disabled>Select</option>
            <option v-for="p in periods" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cc-block">Block</label>
          <select id="cc-block" v-model="form.block" required>
            <option value="" disabled>Select</option>
            <option v-for="b in blocks" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cc-level">Level</label>
          <select id="cc-level" v-model="form.level" required>
            <option value="" disabled>Select</option>
            <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cc-credits">Credits</label>
          <input
            id="cc-credits"
            v-model="form.credits"
            type="text"
            placeholder="e.g. 6"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label>Year</label>
        <div class="radio-group">
          <label>
            <input v-model="form.year" type="radio" value="1" required />
            Year 1
          </label>
          <label>
            <input v-model="form.year" type="radio" value="2" />
            Year 2
          </label>
        </div>
      </div>

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? "Adding..." : "Add Course" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuth } from "../store/auth";
import { insertCourse } from "../supabase/courseService";

const { user } = useAuth();
const emit = defineEmits(["add-custom-course"]);

const isOpen = ref(false);
const submitting = ref(false);
const errorMsg = ref("");

const periods = ["HT1", "HT2", "VT1", "VT2"];
const blocks = ["1", "2", "3", "4"];
const levels = ["G1X", "G2X", "A1X", "A2X"];

const form = reactive({
  code: "",
  name: "",
  period: "",
  block: "",
  level: "",
  credits: "",
  year: "",
});

function resetForm() {
  form.code = "";
  form.name = "";
  form.period = "";
  form.block = "";
  form.level = "";
  form.credits = "";
  form.year = "";
  errorMsg.value = "";
}

async function handleSubmit() {
  submitting.value = true;
  errorMsg.value = "";

  const { data, error } = await insertCourse({
    code: form.code.toUpperCase(),
    name: form.name.toLowerCase(),
    period: form.period,
    block: form.block,
    level: form.level,
    credits: form.credits,
  });

  submitting.value = false;

  if (error) {
    if (error.code === "42501" || error.message?.includes("policy")) {
      errorMsg.value =
        "You've added too many courses recently. Please wait before adding more.";
    } else {
      errorMsg.value = error.message || "Failed to add course.";
    }
    return;
  }

  emit("add-custom-course", { ...data, year: form.year });
  resetForm();
  isOpen.value = false;
}
</script>

<style scoped>
.custom-course-wrapper {
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.toggle-btn {
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  color: var(--color-accent);
  border: 2px dashed var(--color-accent);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.toggle-btn:hover {
  background-color: rgba(0, 170, 255, 0.1);
}

.custom-course-form {
  width: 90%;
  margin-top: var(--space-md);
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.form-row {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-md);
}

.form-group label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.form-group input,
.form-group select {
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-group input::placeholder {
  color: var(--color-text-muted);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.15);
}

.radio-group {
  display: flex;
  gap: var(--space-lg);
}

.radio-group label {
  color: var(--color-text);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.radio-group input[type="radio"] {
  accent-color: var(--color-accent);
  margin-right: var(--space-xs);
}

.error-msg {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin: 0 0 var(--space-md);
}

.submit-btn {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
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

.submit-btn:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
