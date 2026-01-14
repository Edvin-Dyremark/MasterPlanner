/**
 *  Router Configuration File
 */

// Import views for routing
import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebaseConfig";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import AddCourse from "../views/AddCourse.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ProfileView from "../views/ProfileView.vue";

// Define route configurations
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/add-course", name: "AddCourse", component: AddCourse },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/signup", name: "Signup", component: SignupView },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
];

// Create a Vue Router instance with history mode and the defined routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to handle authentication-required routes
router.beforeEach((to, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
