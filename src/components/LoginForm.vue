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
  max-width: 380px;
  margin: var(--space-2xl) auto;
  padding: var(--space-xl);
  align-items: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.login-form h2 {
  margin: 0 0 var(--space-lg);
  color: var(--color-text);
}

.login-form input {
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

.login-form input::placeholder {
  color: var(--color-text-muted);
}

.login-form input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.15);
}

.login-form button {
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

.login-form button:hover {
  background-color: var(--color-accent-hover);
}

.login-form p {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin-top: var(--space-sm);
}
</style>
