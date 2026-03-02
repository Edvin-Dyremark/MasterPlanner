<!-- NavBar Component
- Allows navigating the website using views and router links
-->

<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/"> Master Planner </router-link>
    </div>
    <ul>
      <li>
        <router-link to="/"> Home </router-link>
      </li>
      <li>
        <router-link to="/about"> About </router-link>
      </li>
      <li v-if="user"><router-link to="/profile">Profile</router-link></li>
      <li v-if="!user"><router-link to="/login">Login</router-link></li>
      <li v-if="!user"><router-link to="/signup">Signup</router-link></li>
      <li>
        <button class="theme-toggle" @click="toggleTheme">
          {{ isDark ? '\u2600' : '\u263E' }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuth } from "../store/auth";
import { useTheme } from "../store/theme";

export default {
  setup() {
    const { user } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    return { user, isDark, toggleTheme };
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-size-base);
}

.logo {
  font-weight: 700;
  font-size: var(--font-size-xl);
}

.logo a {
  color: var(--color-accent);
  text-decoration: none;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: var(--space-lg);
  margin: 0;
  padding: 0;
}

.navbar a {
  color: var(--color-text-muted);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.navbar a:hover,
.navbar a.router-link-active {
  color: var(--color-text);
  border-bottom-color: var(--color-accent);
}

.theme-toggle {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: 2px 8px;
  line-height: 1;
  transition: border-color var(--transition-fast);
}

.theme-toggle:hover {
  border-color: var(--color-accent);
}
</style>
