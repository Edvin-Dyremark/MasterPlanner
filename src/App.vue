<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import { useTheme } from "./store/theme";

export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    useTheme();
  },
};
</script>

<style>
:root {
  /* Colors */
  --color-bg: #0f1117;
  --color-surface: #1a1d27;
  --color-surface-hover: #22252f;
  --color-border: #2a2d37;
  --color-text: #e4e4e7;
  --color-text-muted: #9ca3af;
  --color-accent: #00aaff;
  --color-accent-hover: #0090dd;
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
  --color-header: #1e2028;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;

  /* Typography */
  --font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}

[data-theme="light"] {
  --color-bg: #f5f5f7;
  --color-surface: #ffffff;
  --color-surface-hover: #f0f0f2;
  --color-border: #d4d4d8;
  --color-text: #18181b;
  --color-text-muted: #71717a;
  --color-header: #e8e8ec;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}
</style>
