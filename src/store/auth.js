import { ref } from "vue";
import { supabase } from "../supabase/supabaseClient";

const user = ref(null);

supabase.auth.getSession().then(({ data: { session } }) => {
  user.value = session?.user ?? null;
});

supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user ?? null;
});

export function useAuth() {
  return { user };
}
