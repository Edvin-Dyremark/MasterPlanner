/**
 *  Router Configuration File
 */

import { createRouter, createWebHashHistory } from "vue-router";
import { auth } from "../firebase/firebaseConfig";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/signup", name: "Signup", component: SignupView },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Global navigation guard to handle authentication-required routes
router.beforeEach((to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    return { name: "Login" };
  }
});

export default router;
