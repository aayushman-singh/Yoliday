import { Request, Response } from "express";
import {
  getProfileData,
  updateProfileData, 
} from "../models/profileModel";

export async function getProfileHandler(req: Request, res: Response) {
  const userId = 123;

  try {
    const profile = await getProfileData(userId);
    console.log("ESSAY: FRONTEND WILL RECEIVE THIS PROFILE DATA:");
    console.log(JSON.stringify(profile)); // Shows structure in terminal
    res.status(200).json({ profile });
  } catch (error) {
    if (error instanceof Error) {
      console.error("ESSAY: Backend Error:", error.message); // Log meaningful error
      res.status(500).json({ error: "Failed to fetch profile data" });
    } else {
      console.error("ESSAY: Backend Unknown Error:", error);
      res.status(500).json({ error: "Unexpected server error" });
    }
  }
}


export async function updateUserHandler(req: Request, res: Response) {
  const userId = 123; 
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
