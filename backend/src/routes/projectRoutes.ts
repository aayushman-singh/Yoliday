import express from "express";
import {
  getProjectsHandler,
  addToCartHandler,
  getCartHandler,
  addToSavedHandler,
  getSavedHandler,
} from "../controllers/projectController";
const router = express.Router();

router.get("/projects", getProjectsHandler);
router.post("/cart", addToCartHandler);
router.get("/cart", getCartHandler);
router.get("/saved", getSavedHandler);
router.post("/saved", addToSavedHandler);

export default router;
