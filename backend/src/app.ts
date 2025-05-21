import express from "express";
import cors from "cors";
import projectRoutes from "./routes/routes";
import profileRouter from "./routes/routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/", projectRoutes);
app.use("/profile", profileRouter)
