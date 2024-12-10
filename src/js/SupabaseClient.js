import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "../shared/cors";

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

//return all columns from table "projects", where uuid matches
export async function getProjectByUuid(uuid){
  const { data, error } = await supabase
   .from("projects")
   .select("*")
   .eq("uuid", uuid)
   .single();

   console.log(data);
  if (error) throw error;
  return data;
}

//returns all action related to a single project identified by id
export async function getActionForProjectById(id){
  const { data, error } = await supabase
   .from("actions")
   .select("*")
   .eq("project_id", id);

   console.log(data);
  if (error) throw error;
  return data;
}

//generates link to a certain image in my bucket using bucket name and image path
// export async function getUrlFromBucketFile(bucketName, imagePath){
//   try {
//     const { data, error } = await supabase.storage
//       .from(bucketName)
//       .getPublicUrl(imagePath, {
//         // Include the CORS headers
//         headers: corsHeaders
//       });

//     if (error) {
//       console.error('Error getting public URL:', error);
//       return null;
//     }

//     console.log('Public URL generated:', data.publicUrl);
//     return data.publicUrl;
//   } catch (error) {
//     console.error('Exception in getUrlFromBucketFile:', error);
//     return null;
//   }
// }


//uploads a new file to project-icons bucket and updates the url path in the database
export async function uploadProjectIcon(projectId, file){
  const fileExtension = file.name.split(".").pop();
  const filePath = `project-icons/${projectId}.${fileExtension}`;

  const {data, error} = await supabase.storage
  .from("project-icons")
  .upload(filePath, file, {
    upsert: true
  });

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  const { error: updateError } = await supabase
    .from('projects')
    .update({ icon_url: filePath })
    .eq('id', projectId);

  if (updateError) {
    throw new Error(`Error updating project: ${updateError.message}`);
  }

  return filePath;
}

//returns a projectIcon url from table projects, given the project_id
export async function getProjectIcon(projectId){
  const { data, error} = await supabase
    .from("projects")
    .select("icon_url")
    .eq("id", projectId)
    .single();

    console.log("Got icon url successfully:", data);
    if (error) throw error;

    return data;
}

//creates a new project
export async function createNewProject(projectDetails) {
  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        name: projectDetails.name,
        description: projectDetails.description,
        category: projectDetails.category,
        created_at: new Date().toISOString(),
        icon_url: null,
        document_url: null,
        subtitle: null
      }
    ])
    .select();

    console.log("Created project successfully:", data);
  if (error) throw error;

  try {
    await createInitialAction(data[0].id);
  } catch (actionError) {
    console.error("Error creating initial action:", actionError);
    // You might want to handle this error or clean up the project
    throw actionError;
  }
  return data[0];
}

export async function createInitialAction(projectId) {
  const { data, error } = await supabase
    .from('actions')
    .insert([
      {
        project_id: projectId,
        context: "Project Initialization",
        created_by: null,
      }
    ])
    .select();

    console.log("Created initial action successfully:", data);
  if (error) throw error;
  return data[0];
}
