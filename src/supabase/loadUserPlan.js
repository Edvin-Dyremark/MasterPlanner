import { supabase } from "./supabaseClient";

export async function loadUserPlan() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No user logged in");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("user_plans")
      .select("courses")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    if (!data) {
      console.log("No saved plan found.");
      return [];
    }

    const courses = data.courses || [];
    const validCourses = courses.filter((course) => course.id !== undefined);
    if (validCourses.length !== courses.length) {
      console.error("Some course IDs are undefined", courses);
    }
    return validCourses;
  } catch (error) {
    console.error("Error loading user plan:", error);
    return [];
  }
}
