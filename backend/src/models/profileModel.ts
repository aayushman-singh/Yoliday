import {db} from "../db";

export async function getProfileData(
  userId: number,
): Promise<Record<string, any>> {
  const [rows] = await db.query(
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
        profile_image_url
       FROM profile
       WHERE user_id = ?`,
    [userId]
  );

  // Must normalize ensured
  const record = JSON.parse(JSON.stringify(rows[0])); // cleanly creates plain object

  return {
    ...record,
    joinedDate: record.joined_date
      ? new Date(record.joined_date).toISOString().split("T")[0]
      : "",
    profileImage: record.profile_image, // should be full S3 or HTTP-image URLs
  };
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
