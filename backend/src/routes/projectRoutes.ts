import express from "express";
import {
  getProjectsHandler,
  addToCartHandler,
  getCartHandler,
} from "../controllers/projectController";
const router = express.Router();

router.get("/projects", getProjectsHandler);
router.post("/cart", addToCartHandler);
router.get("/cart", getCartHandler);

export default router;
