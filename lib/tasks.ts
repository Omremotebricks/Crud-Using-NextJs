"use server";

import { createServerSupabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/* CREATE */
export async function createTask(title: string, description: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("tasks")
    .insert([{ title, description }]);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}

/* READ */
export async function getTasks() {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

/* UPDATE */
export async function updateTask(
  id: string,
  title: string,
  description?: string
) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("tasks")
    .update({ title, description })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}

/* DELETE */
export async function deleteTask(id: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}
