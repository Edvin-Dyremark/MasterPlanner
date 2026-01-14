<!-- SignupForm Component
- Provides a user interface for account creation.
- Uses Firebase for authentication and stores user data.
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
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const signup = async () => {
      errorMessage.value = "";
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;
        // Store the username in Firestore under the user's UID.
        await setDoc(doc(db, "users", user.uid), { username: username.value });
        this.$router.push("/profile");
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
