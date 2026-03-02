import { ref } from "vue";

const STORAGE_KEY = "masterplanner-theme";
const isDark = ref(true);

function applyTheme() {
  document.documentElement.dataset.theme = isDark.value ? "dark" : "light";
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    isDark.value = saved === "dark";
  }
  applyTheme();
}

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem(STORAGE_KEY, isDark.value ? "dark" : "light");
  applyTheme();
}

loadTheme();

export function useTheme() {
  return { isDark, toggleTheme };
}
