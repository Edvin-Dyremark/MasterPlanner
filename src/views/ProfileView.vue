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
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
</style>
