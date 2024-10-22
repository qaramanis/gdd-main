import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

export async function getAllProjects() {
    const {data, error} = await supabase 
    .from('projects')
    .select('*')
    console.log(data);
    if (error) throw error;
    return data;
}

export async function getAllActions() {
    const {data, error} = await supabase 
    .from('actions') 
    .select('*')
    console.log(data);
    if (error) throw error;
    return data;
}
