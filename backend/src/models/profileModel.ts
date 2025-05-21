import {db} from "../db";

export const getProfileData = async (userId: number) => {
  const [rows] = await db.query(`SELECT * FROM profile WHERE user_id = ?`, [
    userId,
  ]);

  if (rows.length === 0) {
    throw new Error("Profile not found");
  }

  // Safely process dates to avoid hydration issues
  const profile = rows[0] as Record<string, any>;
  return {
    name: profile.name,
    title: profile.title,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    joinedDate: profile.joined_date
      ? profile.joined_date.toISOString().split("T")[0]
      : "",
    jobTitle: profile.job_title,
    department: profile.department,
    profileImage: profile.profile_image,
    // Only include necessary fields as JSON-safe values
  };
};

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
