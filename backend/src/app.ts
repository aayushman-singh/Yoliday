import express from "express";
import cors from "cors";
import projectRoutes from "./routes/routes";
import profileRouter from "./routes/routes";
import { logResponse } from "./middleware/middleware";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(logResponse);
app.use("/", projectRoutes);
app.use("/profile", profileRouter)
