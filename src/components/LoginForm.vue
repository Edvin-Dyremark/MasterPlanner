<!-- LoginForm Component
- Provides a user interface for logging in.
- Uses Supabase for authentication
-->

<template>
  <div class="login-form">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="loginUser">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/supabaseClient";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");

    const loginUser = async () => {
      error.value = "";
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if (authError) throw authError;
        router.push("/profile");
      } catch (err) {
        error.value = err.message;
      }
    };

    return { email, password, error, loginUser };
  },
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  padding: 20px;
  align-items: center;
}

.login-form input,
.login-form button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
}
</style>
