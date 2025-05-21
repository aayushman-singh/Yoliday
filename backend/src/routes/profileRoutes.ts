import express from "express";
const profileRouter = express.Router();


export async function GET() {
  try {

    const profileData = {
      name: "Jane Doe",
      title: "Senior Manager",
      email: "jane.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      jobTitle: "Product Manager",
      department: "Product Development",
      joinedDate: "January 15, 2022",
      skills: [
        "Product Management",
        "UX Design",
        "Market Research",
        "Agile",
        "Scrum",
        "Data Analysis",
        "Strategic Planning",
      ],
      tags: ["Design", "Management", "Strategy"],
      profileImage: "/dp.jpg",
    };

    // Return the profile data as JSON
    return Response.json(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return Response.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}

export default profileRouter