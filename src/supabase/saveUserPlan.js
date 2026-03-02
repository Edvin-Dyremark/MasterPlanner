import { supabase } from "./supabaseClient";

export async function saveUserPlan(courses) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No user logged in");
    return;
  }

  try {
    const { error } = await supabase.from("user_plans").upsert({
      id: user.id,
      courses,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    console.log("User plan saved successfully");
  } catch (error) {
    console.error("Error saving user plan:", error);
  }
}
