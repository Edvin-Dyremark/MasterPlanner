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
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default {
  setup() {
    // Fetch user data on mount if user is authenticated
    const user = ref(auth.currentUser);
    const username = ref("");

    onMounted(() => {
      if (auth.currentUser) {
        user.value = auth.currentUser;
        fetchUserData();
      }
    });

    async function fetchUserData() {
      // Retrieve specific user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.value.uid));
      if (userDoc.exists()) {
        username.value = userDoc.data().username;
      }
    }

    const logout = async () => {
      try {
        await signOut(auth);
        this.$router.push("/login");
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
