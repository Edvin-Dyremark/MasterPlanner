import { ref } from "vue";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(null);

// Listen for changes in the authentication state
onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

export function useAuth() {
  return { user };
}
