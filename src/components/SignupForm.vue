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
  max-width: 380px;
  margin: var(--space-2xl) auto;
  padding: var(--space-xl);
  align-items: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.signup-form h2 {
  margin: 0 0 var(--space-lg);
  color: var(--color-text);
}

.signup-form input {
  margin-top: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.signup-form input::placeholder {
  color: var(--color-text-muted);
}

.signup-form input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.15);
}

.signup-form button {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  width: 100%;
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-weight: 600;
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.signup-form button:hover {
  background-color: var(--color-accent-hover);
}

.signup-form p {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin-top: var(--space-sm);
}
</style>
