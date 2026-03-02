import { supabase } from "./supabaseClient";

let cachedCourses = null;

export async function fetchAllCourses() {
  if (cachedCourses) return cachedCourses;

  const { data, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }

  cachedCourses = data;
  return cachedCourses;
}
