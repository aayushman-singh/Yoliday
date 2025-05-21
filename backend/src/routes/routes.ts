import express from "express";
import {
  getProjectsHandler,
  addToCartHandler,
  getCartHandler,
  addToSavedHandler,
  getSavedHandler,
} from "../controllers/projectController";
import {
  getProfileHandler,
  updateUserHandler,
} from "../controllers/profileController";
const router = express.Router();

router.get("/projects", getProjectsHandler);
router.post("/cart", addToCartHandler);
router.get("/cart", getCartHandler);
router.get("/saved", getSavedHandler);
router.post("/saved", addToSavedHandler);

router.get("/profile", getProfileHandler);
router.put("/profile/update", updateUserHandler);

export default router;
