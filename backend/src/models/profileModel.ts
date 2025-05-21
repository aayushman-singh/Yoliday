import { db } from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

interface ProfileDbRow extends RowDataPacket {
  id: number;
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

interface ProfileApiObject {
  id: number;
  name: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  jobTitle: string | null;
  department: string | null;
  joinedDate: string | null;
  skills: any[] | null;
  tags: any[] | null;
  profileImage: string | null;
}

const SINGLE_PROFILE_ID = 1;

export async function getProfileData(): Promise<ProfileApiObject | null> {
  const [rows] = await db.query<ProfileDbRow[]>(
    `SELECT 
        id, name, title, email, phone, location, job_title,
        department, joined_date, skills, tags, profile_image_url
       FROM profile
       WHERE id = ? 
       LIMIT 1`,
    [SINGLE_PROFILE_ID]
  );

  if (!rows?.length) return null;

  const dbRecord = rows[0];

  return {
    id: dbRecord.id,
    name: dbRecord.name,
    title: dbRecord.title,
    email: dbRecord.email,
    phone: dbRecord.phone,
    location: dbRecord.location,
    jobTitle: dbRecord.job_title,
    department: dbRecord.department,
    joinedDate: dbRecord.joined_date
      ? new Date(dbRecord.joined_date).toISOString().split("T")[0]
      : null,
    skills: dbRecord.skills ? JSON.parse(dbRecord.skills) : null,
    tags: dbRecord.tags ? JSON.parse(dbRecord.tags) : null,
    profileImage: dbRecord.profile_image_url,
  };
}

export const updateProfileData = async (
  updates: Record<string, any>
): Promise<OkPacket> => {
  const columnMapping: Record<string, string> = {
    name: "name",
    title: "title",
    email: "email",
    phone: "phone",
    location: "location",
    jobTitle: "job_title",
    department: "department",
    joinedDate: "joined_date",
    skills: "skills",
    tags: "tags",
    profileImage: "profile_image_url",
  };

  const jsonDbFields = ["skills", "tags"];
  const setClauses: string[] = [];
  const values: any[] = [];

  for (const apiKey in updates) {
    if (
      Object.prototype.hasOwnProperty.call(updates, apiKey) &&
      columnMapping[apiKey]
    ) {
      const dbColumn = columnMapping[apiKey];
      let value = updates[apiKey];

      if (dbColumn === "joined_date") {
        if (value instanceof Date) {
          value = value.toISOString().slice(0, 10);
        } else if (
          typeof value === "string" &&
          value.match(/^\d{4}-\d{2}-\d{2}/)
        ) {
          value = value.slice(0, 10);
        } else if (value === null || value === "") {
          value = null;
        } else {
          continue;
        }
      } else if (jsonDbFields.includes(dbColumn)) {
        if (
          Array.isArray(value) ||
          (typeof value === "object" && value !== null)
        ) {
          value = JSON.stringify(value);
        } else if (value === null) {
          value = null;
        } else {
          continue;
        }
      }

      setClauses.push(`${dbColumn} = ?`);
      values.push(value);
    }
  }

  if (!setClauses.length) {
    return {
      affectedRows: 0,
      insertId: 0,
      warningStatus: 0,
      serverStatus: 0,
      changedRows: 0,
    } as unknown as OkPacket;
  }

  values.push(SINGLE_PROFILE_ID);
  const query = `UPDATE profile SET ${setClauses.join(", ")} WHERE id = ?`;

  try {
    const [result] = await db.query<OkPacket>(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};
