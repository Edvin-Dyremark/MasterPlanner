<!-- SignupForm Component
- Provides a user interface for account creation.
- Uses Supabase for authentication and stores user data.
-->

<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signup">Sign Up</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/supabaseClient";

export default {
  setup() {
    const router = useRouter();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const signup = async () => {
      errorMessage.value = "";
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;

        await supabase
          .from("profiles")
          .insert({ id: data.user.id, username: username.value });

        router.push("/profile");
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return { email, password, username, errorMessage, signup };
  },
};
</script>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  padding: 20px;
  align-items: center;
}

.signup-form input,
.signup-form button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
}
</style>
