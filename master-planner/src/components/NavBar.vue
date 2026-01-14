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
      <li>
        <router-link to="/add-course"> Add Course </router-link>
      </li>
      <li v-if="user"><router-link to="/profile">Profile</router-link></li>
      <!-- Only visible when logged in -->
      <li v-if="!user"><router-link to="/login">Login</router-link></li>
      <li v-if="!user"><router-link to="/signup">Signup</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { useAuth } from "../store/auth";

export default {
  setup() {
    const { user } = useAuth();
    return { user };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 15px 30px;
  font-size: 20px;
}

.logo {
  font-weight: bold;
  font-size: 24px;
  color: #00aaff;
}

.navbar ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  padding: 0 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar .login-button {
  padding: 10px 20px;
  background: #2277ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navbar .login-button:hover {
  background: #0055cc;
}
</style>
