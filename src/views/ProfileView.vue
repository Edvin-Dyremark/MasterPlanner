<!-- Profile View
- Displays user-specific profile information
- Provides a logout functionality
-->

<template>
  <div class="profile-view">
    <h1>{{ username ? `${username}'s Profile` : "User Profile" }}</h1>
    <!-- Only display profile details if user exists -->
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/supabaseClient";

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);
    const username = ref("");

    onMounted(async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (currentUser) {
        user.value = currentUser;
        await fetchUserData();
      }
    });

    async function fetchUserData() {
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.value.id)
        .single();
      if (data) {
        username.value = data.username;
      }
    }

    const logout = async () => {
      try {
        await supabase.auth.signOut();
        router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    return { user, username, logout };
  },
};
</script>

<style scoped>
.profile-view {
  max-width: 480px;
  margin: var(--space-2xl) auto;
  padding: var(--space-xl);
  text-align: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.profile-view h1 {
  margin: 0 0 var(--space-lg);
  font-size: var(--font-size-xl);
  color: var(--color-text);
}

.profile-view p {
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.profile-view button {
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-danger);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.profile-view button:hover {
  background-color: var(--color-danger-hover);
}
</style>
