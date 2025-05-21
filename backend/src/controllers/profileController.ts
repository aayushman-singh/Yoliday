import { Request, Response } from "express";
import {
  getProfileData,
  updateProfileData, 
} from "../models/profileModel";

// GET /api/profile
export async function getProfileHandler(req: Request, res: Response) {
  const userId = 123; // Replace this with real user ID from auth later

  try {
    const profile = await getProfileData(userId);
    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
}

// PUT /api/profile/update
export async function updateUserHandler(req: Request, res: Response) {
  const userId = 123; // Replace with real user ID
  const updates = req.body;

  try {
    await updateProfileData(userId, updates);
    const updatedProfile = await getProfileData(userId);
    res.status(200).json({ profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
}
