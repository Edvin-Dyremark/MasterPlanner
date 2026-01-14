import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push("/"); // Redirect to home if logged in
  } else {
    router.push("/login"); // Redirect to login if not logged in
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
