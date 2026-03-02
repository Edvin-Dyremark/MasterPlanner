import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import { supabase } from "./supabase/supabaseClient";

supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN") {
    router.push("/");
  } else if (event === "SIGNED_OUT") {
    router.push("/login");
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
