import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import path from "path";
import profileRouter from "./routes/profileRoutes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"))
); 
app.use("/", projectRoutes);
app.use("/profile", profileRouter)
