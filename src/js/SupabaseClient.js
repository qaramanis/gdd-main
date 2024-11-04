import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
);

//return all columns from table "projects"
export async function getAllProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  console.log(data);
  if (error) throw error;
  return data;
}

//returns all columns from table "actions", the project_id is a foreign key
export async function getAllActions() {
  const { data, error } = await supabase
    .from("actions")
    .select("*,projects (name)");

  console.log(data);
  if (error) throw error;
  return data;
}
