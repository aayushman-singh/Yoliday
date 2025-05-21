import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import path from "path";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"))
); 
app.use("/", projectRoutes);
