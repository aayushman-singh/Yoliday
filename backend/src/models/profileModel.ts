import { db } from "../db";
import { RowDataPacket } from "mysql2"; // Import appropriate type

// Define an interface for your profile row data
interface ProfileRow extends RowDataPacket {
  id: number;
  user_id: number;
  name: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  job_title: string | null;
  department: string | null;
  joined_date: string | null;
  profile_image_url: string | null;

   skills: string | null; 
   tags: string | null;   
}

export async function getProfileData(
  userId: number
): Promise<Record<string, any> | null> {
  // Return null if not found
  const [rows] = await db.query<ProfileRow[]>( // Type the query result
    `SELECT 
        id,
        user_id,
        name, 
        title, 
        email, 
        phone,
        location,
        job_title,
        department,
        joined_date,
        skills,  -- Make sure you are selecting skills
        tags,    -- Make sure you are selecting tags
        profile_image_url
       FROM profile
       WHERE user_id = ?
       LIMIT 1`,
    [userId]
  );

  if (!rows || rows.length === 0) {

    return null; 
  }
  const dbRecord = rows[0];

  // The JSON.parse(JSON.stringify(...)) trick is often used to deep clone or
  // ensure a plain object, but mysql2 usually returns plain objects anyway for rows.
  // If you still want it, it's safer now:
  // const record = JSON.parse(JSON.stringify(dbRecord));

  // Direct assignment is usually fine and more performant:
  const record = { ...dbRecord };

  // --- Your previous error with 'profile_image' might have been here too ---
  // const returnedProfile = {
  //   ...record,
  //   joinedDate: record.joined_date
  //     ? new Date(record.joined_date).toISOString().split("T")[0]
  //     : "",
  //   profileImage: record.profile_image_url, // Corrected from record.profile_image
  //   // If skills/tags were selected and mysql2 doesn't auto-parse (it usually does for JSON type):
  //   // skills: record.skills ? JSON.parse(record.skills) : [],
  //   // tags: record.tags ? JSON.parse(record.tags) : [],
  // };

  // Simplified return if mysql2 auto-parses JSON columns (skills, tags)
  const returnedProfile = {
    id: record.id,
    userId: record.user_id, // Consider renaming to camelCase if preferred for JS objects
    name: record.name,
    title: record.title,
    email: record.email,
    phone: record.phone,
    location: record.location,
    jobTitle: record.job_title, // Renaming to camelCase
    department: record.department,
    joinedDate: record.joined_date
      ? new Date(record.joined_date).toISOString().split("T")[0]
      : null, // Return null instead of empty string for dates if not present
    skills: record.skills, // Assuming skills is selected and mysql2 parsed it
    tags: record.tags, // Assuming tags is selected and mysql2 parsed it
    profileImage: record.profile_image_url, // Using the correct column name
  };

  return returnedProfile;
}

export const updateProfileData = async (
  userId: number,
  updates: Record<string, any>
) => {
  const fields = Object.keys(updates);
  const query = `UPDATE profile SET ${fields
    .map((f) => `${f} = ?`)
    .join(", ")} WHERE user_id = ?`;

  // Convert Date types to SQL-friendly format if needed
  const values = [
    ...fields.map((field) => {
      if (field === "joined_date" && updates[field] instanceof Date) {
        return updates[field].toISOString().slice(0, 10); // "YYYY-MM-DD"
      }
      return updates[field];
    }),
    userId,
  ];

  await db.query(query, values);
};