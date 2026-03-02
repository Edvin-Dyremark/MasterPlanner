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

export function invalidateCache() {
  cachedCourses = null;
}

export async function insertCourse(course) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: { message: "You must be logged in to add a course." } };
  }

  const { data, error } = await supabase
    .from("courses")
    .insert({
      code: course.code,
      name: course.name,
      period: course.period,
      block: course.block,
      level: course.level,
      credits: course.credits,
      subject: course.subject || "",
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error };
  }

  cachedCourses = null;
  return { data, error: null };
}
