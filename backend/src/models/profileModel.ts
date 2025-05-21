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


  const record = { ...dbRecord };

  const returnedProfile = {
    id: record.id,
    userId: record.user_id, 
    name: record.name,
    title: record.title,
    email: record.email,
    phone: record.phone,
    location: record.location,
    jobTitle: record.job_title, 
    department: record.department,
    joinedDate: record.joined_date
      ? new Date(record.joined_date).toISOString().split("T")[0]
      : null, 
    skills: record.skills, 
    tags: record.tags, 
    profileImage: record.profile_image_url, 
  };

  return returnedProfile;
}

export const updateProfileData = async (
  userId: number,
  updates: Record<string, any> 
) => {
  const fields = Object.keys(updates);


  const jsonDbFields = ["skills", "tags"]; 

  const setClauses = fields.map((field) => `${field} = ?`).join(", ");
  const query = `UPDATE profile SET ${setClauses} WHERE user_id = ?`;

  const values = [
    ...fields.map((field) => {
      const value = updates[field];
      if (field === "joined_date" && value instanceof Date) {
        return value.toISOString().slice(0, 10);
      }
      if (
        jsonDbFields.includes(field) &&
        (Array.isArray(value) || (typeof value === "object" && value !== null))
      ) {
        return JSON.stringify(value); 
      }
      return value; 
    }),
    userId,
  ];

  console.log("Update Query:", query);
  console.log("Update Values:", JSON.stringify(values, null, 2));

  try {
    const [result] = await db.query(query, values);

    console.log("Update result:", result);
    return result;
  } catch (error) {
    console.error("Error updating profile in DB:", error);
    throw error; 
  }
};